import React, { useEffect, useRef, useState, useCallback } from "react";
import ChatPanel from "./components/ChatPanel";
import MapPanel from "./components/MapPanel";
import { useLeaflet } from "./hooks/useLeaflet";
import { useGeoData } from "./hooks/useGeoData";
import { useMapActions } from "./hooks/useMapActions";
import { useChat } from "./hooks/useChat";

export default function EnhancedGeoChatBotApp() {
  const mapDiv = useRef(null);
  const mapRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const highlightLayerRef = useRef(null);
  const legendRef = useRef(null);
  const processedActionsRef = useRef(new Set());
  const isClickProcessingRef = useRef(false);
  const resourceIntentRef = useRef(null);
  const routingIntentRef = useRef(null);
  const pendingIncidentQueryRef = useRef(null); // holds { lat, lon } awaiting count
  const pendingLocationChoiceRef = useRef(null); // holds { lat, lon } awaiting what to search
  const pendingResourceQueryRef = useRef(null); // holds { lat, lon } awaiting resource type/radius

  const [mapStats, setMapStats] = useState({ zoom: 8, features: 0 });
  const [history, setHistory] = useState(() => [{
    "role": "system",
    "content": `
You are **GeoAI**, a highly capable AI assistant specialized in geospatial data analysis and visualization.  
Your primary role is to interact with and control a map using the tools available to you.  
You can generate, update, and analyze visualizations such as heatmaps, choropleth maps, scatter plots, or overlays.  

### Interaction Guidelines:
- Always clarify the user's intent before executing complex map operations.  
- If data or coordinates are missing, ask the user to provide them.  
- Prefer visual map-based outputs (heatmaps, overlays, plots) when possible.  
- If a tool is required (e.g., to generate a heatmap), output a **structured tool call** with the necessary parameters.  
- Respond in a clear and professional way, suitable for analysts, researchers, or decision-makers.  

You must always act as an intelligent **geospatial analyst and visualization assistant**, helping users explore data and gain insights from maps.
`
  }]);


  const {
    availableFiles,
    allFeaturesData,
    connectionStatus,
    setConnectionStatus,
    dataProcessingStatus,
    loadGeoJSONFiles,
    activeFeatures,
    setActiveFeatures,
  } = useGeoData();

  const { leafletLoaded } = useLeaflet(setConnectionStatus);

  const {
    messages,
    addMessage,
    isTyping,
    setIsTyping,
    input,
    setInput,
    loading,
    setLoading,
    setMessages,
  } = useChat();

  const {
    findClosestIncidents,
    displayOnlyFeatures,
    handleMapAction,
    parseDate,
    calculateDistance,
    createHeatmap,
    analyzeHighSeverityIncidents,
    showPopulationDistribution,
  } = useMapActions({
    allFeaturesData,
    mapRef,
    geoJsonLayerRef,
    highlightLayerRef,
    legendRef,
    processedActionsRef,
    addMessage,
    setActiveFeatures,
  });

  // Clear chat function
  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "مرحباً بك في StrategizeIT! 🗺️ أنا مساعدك الذكي للخرائط. جاري تحميل البيانات من الخادم...",
        timestamp: new Date(),
      },
    ]);

    if (highlightLayerRef.current) {
      mapRef.current?.removeLayer(highlightLayerRef.current);
      highlightLayerRef.current = null;
    }
    if (geoJsonLayerRef.current) {
      mapRef.current?.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }
    if (legendRef.current) {
      mapRef.current?.removeControl(legendRef.current);
      legendRef.current = null;
    }
    setActiveFeatures(0);
    processedActionsRef.current.clear();

    // Reload data
    if (leafletLoaded && mapRef.current) {
      loadGeoJSONFiles();
    }
  }, [setMessages, setActiveFeatures, leafletLoaded, loadGeoJSONFiles]);

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapDiv.current || mapRef.current) return;

    try {
      const map = window.L.map(mapDiv.current, {
        center: [25.267078, 55.293646], // Dubai coordinates
        zoom: 14,
        zoomControl: true,
        layers: [],
      });

      window.L.tileLayer(
        "./esri-imagery/{z}/{x}/{y}.jpg",
        {
          attribution: "Tiles © Esri",
          maxZoom: 18,
        }
      ).addTo(map);

      mapRef.current = map;

      // Add scale control
      window.L.control.scale({ metric: true, imperial: false }).addTo(map);

      // Enhanced map click handler for proximity search
      map.on("zoomend", function () {
        setMapStats((prev) => ({ ...prev, zoom: map.getZoom() }));
      });

      console.log("✅ Map initialized successfully");
    } catch (error) {
      console.error("Map initialization failed:", error);
      setConnectionStatus("error");
      addMessage("bot", "⚠️ فشل في تهيئة الخريطة. يرجى إعادة تحميل الصفحة.");
    }
  }, [leafletLoaded, setConnectionStatus, addMessage]);

  // Add map click handler after data is loaded
  useEffect(() => {
    if (mapRef.current && allFeaturesData.length > 0) {
      const map = mapRef.current;

      // Remove any existing click handlers
      map.off("click");

      // Add new click handler
      map.on("click", async function (e) {
        if (isClickProcessingRef.current) {
          return;
        }
        isClickProcessingRef.current = true;
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        // فحص إذا كان المستخدم سأل مؤخراً عن موارد
        const recentMessages = messages.slice(-3);
        const hasRecentResourceQuery =
          resourceIntentRef.current !== null ||
          recentMessages.some(
            (msg) =>
              msg.sender === "user" &&
              (msg.text.includes("مستشفى") ||
                msg.text.includes("مدرسة") ||
                msg.text.includes("ملجأ") ||
                msg.text.includes("إخلاء") ||
                msg.text.includes("تجمع") ||
                msg.text.includes("موارد"))
          );
        const hasRoutingIntent = routingIntentRef.current !== null;

        try {
          if (hasRoutingIntent) {
            // If we have a routing intent: first click is origin, destination comes from intent
            const { endLat, endLon } = routingIntentRef.current;
            routingIntentRef.current = null;
            addMessage(
              "user",
              `أسرع طريق من (${lat.toFixed(6)}, ${lng.toFixed(6)}) إلى (${endLat.toFixed(6)}, ${endLon.toFixed(6)})`
            );
            await handleMapAction(
              {
                action: "route-to",
                startLat: lat,
                startLon: lng,
                endLat,
                endLon,
              },
              `route_${Date.now()}`
            );
          } else if (hasRecentResourceQuery) {
            const intent = resourceIntentRef.current;
            const resourceType = intent?.type || "all";
            const radius = intent?.radius || 5;
            addMessage(
              "user",
              intent
                ? `بحث عن ${resourceType} بالقرب من: ${lat.toFixed(6)}, ${lng.toFixed(6)} (نطاق ${radius} كم)`
                : `بحث عن الموارد بالقرب من: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            );
            // بحث عن موارد
            await handleMapAction(
              {
                action: "find-nearby-resources",
                lat: lat,
                lon: lng,
                resourceType: resourceType,
                radius: radius,
              },
              `click_resources_${Date.now()}`
            );
            resourceIntentRef.current = null;
          } else {
            // لا تعرض نتائج مباشرة. احفظ الموقع واطلب اختيار نوع البحث
            pendingLocationChoiceRef.current = { lat, lon: lng };
            addMessage(
              "bot",
              `📍 تم تحديد الموقع (${lat.toFixed(6)}, ${lng.toFixed(6)}).\nماذا تريد البحث في هذا المكان؟ اكتب: "موارد" أو "حوادث" أو "كوارث".`
            );
          }
        } catch (error) {
          console.error("Error in map click handler:", error);
          addMessage("bot", "❌ حدث خطأ أثناء البحث");
        } finally {
          isClickProcessingRef.current = false;
        }

        console.log(`🖱️ Map clicked at coordinates: ${lat}, ${lng}`);
        console.log(
          `📊 Available features for search: ${allFeaturesData.length}`
        );
      });

      console.log("✅ Map click handler added with data available");
    }
  }, [allFeaturesData, handleMapAction, addMessage]);

  // Load data when map is ready
  useEffect(() => {
    if (leafletLoaded && mapRef.current) {
      loadGeoJSONFiles();
    }
  }, [leafletLoaded, loadGeoJSONFiles]);


  const makeLLMCall = useCallback(async (messages, tools = null, callDepth = 0) => {
    const MAX_CALLS = 3;
    if (callDepth >= MAX_CALLS) {
      console.warn(`Maximum call depth (${MAX_CALLS}) reached, stopping recursion`);
      addMessage("bot", "✅ Tool execution completed successfully.");
      return;
    }

    const requestBody = {
      model: "qwen3:4b",
      messages: messages,
      stream: true,
      options: {
        temperature: 0
      },
      tools: tools
    };

    let res;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 30 second timeout
      
      res = await fetch(process.env.REACT_APP_OLLAMACHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      console.log("API Response status:", res.status);
      console.log("API Response headers:", Object.fromEntries(res.headers.entries()));
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      if (fetchError.name === 'AbortError') {
        addMessage("bot", "⏰ انتهت مهلة الاتصال بالخدمة. يرجى المحاولة مرة أخرى.");
      } else {
        addMessage("bot", `❌ فشل في الاتصال بالخدمة: ${fetchError.message}`);
      }
      setLoading(false);
      setIsTyping(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let thinkText = "";
    let buffer = "";
    var botMessageId = null;
    let modelThinking = false;
    const conversationMessages = [...messages];

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.trim().split("\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          let json;
          try {
            json = JSON.parse(line);
          } catch (parseError) {
            console.warn("Failed to parse line as JSON:", line, parseError);
            console.warn("Line length:", line.length, "Line content:", JSON.stringify(line));
            continue;
          }
        if (!json) continue;

          if (modelThinking){
            thinkText += json.message?.content || "";
            if (json.message.content === "\u003c/think\u003e"){
              modelThinking = false;
            }
            continue;
          }
          // Handle regular message content
          if (json.message?.content) {
            if (json.message.content === "\u003cthink\u003e"){
              modelThinking = true;
              continue
            }
            fullText += json.message.content;
            buffer += json.message.content;

          // Update message in chunks
          if (buffer.length > 20 || json.message.content.includes(' ') || json.message.content.includes('.') || json.message.content.includes(',') || json.message.content.includes('\n')) {
            if (!fullText.trim()) {
              fullText = buffer = "";
              continue;
            }
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage.sender === "bot" && (loading || lastMessage.id === botMessageId)) {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, text: fullText.trim() }
                ];
              } else {
                const newMessage = {
                  id: Date.now() + Math.random(),
                  sender: "bot",
                  text: fullText.trim(),
                  timestamp: new Date()
                };
                botMessageId = newMessage.id;
                return [...prev, newMessage];
              }
            });
            buffer = "";
          }
        }

          // Handle tool calls (only process if we haven't reached max depth)
          if (json.message?.tool_calls && callDepth < MAX_CALLS - 1) {
            for (const toolCall of json.message.tool_calls) {
              console.log("Executing tool call:", toolCall);
              const { name: action, arguments: args } = toolCall.function;
              console.log("Tool call name:", action, "Arguments:", args);
              const lat = parseFloat(args?.lat);
              const lon = parseFloat(args?.lon);
              const resourceType = args?.resourceType || 'all';
              const radius = args?.radius ?? 5.0;
              const limit = args?.limit ?? 5;
              const startDate = args?.startDate;
              const endDate = args?.endDate;
              const date = args?.date;
              const dataset = "crisis";
              const result = await handleMapAction({ action, lat, lon, resourceType, radius, limit, startDate, endDate, date, dataset }, `ID_${Date.now()}`);

            // Add tool call result to conversation context
            conversationMessages.push({
              role: "assistant",
              content: `I have to call ${action} with arguments: ${JSON.stringify(args)}`,
              tool_calls: [toolCall]
            });
            setHistory(prev => [...prev, {
              role: "assistant",
              content: `I have to call ${action} with arguments: ${JSON.stringify(args)}`,
              tool_calls: [toolCall]
            }]);
            console.log("Tool call result:", result);
            conversationMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: result
            });
            setHistory(prev => [...prev, {
              role: "tool",
              tool_call_id: toolCall.id,
              content: result
            }]);
          }

            console.log("Thinking text:", thinkText);
            // Recursively call with updated conversation and incremented depth
            console.log(`Making recursive LLM call (depth: ${callDepth + 1})`);
            await makeLLMCall(conversationMessages, tools, callDepth + 1);
            return; // Exit early since we'll handle the response in the recursive call
          }
        }
      }
    } catch (streamError) {
      console.error("Streaming error:", streamError);
      addMessage("bot", `❌ فشل في معالجة الاستجابة: ${streamError.message}`);
      setLoading(false);
      setIsTyping(false);
      return;
    }
    console.log("Thinking text:", thinkText);
    // Final update to ensure all text is displayed
    if (fullText) {
      setHistory(prev => [...prev, {
        role: "assistant",
        content: fullText.trim()
      }])
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.sender === "bot" && lastMessage.id === botMessageId) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, text: fullText.trim() }
          ];
        }
        return prev;
      });
    }
  }, [addMessage, handleMapAction, loading, setMessages]);


  // Enhanced handle user query function with high-severity analysis
  const handleUserQuery = useCallback(
    async (prompt) => {
      if (!prompt.trim()) return;

      processedActionsRef.current.clear();

      addMessage("user", prompt);
      setInput("");
      setLoading(true);
      setIsTyping(true);

      // Check for specific requests first (routing, incidents, resources)
      const routingPatterns = [
        // Arabic patterns
        /(?:أسرع|اسرع|أفضل|افضل)\s+(?:طريق|مسار|route)\s+(?:إلى|الى|to)\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        /(?:طريق|مسار)\s+(?:أسرع|اسرع|أفضل|افضل)\s+(?:إلى|الى|to)\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        // English patterns
        /(?:fastest|best|quickest)\s+(?:route|way|path)\s+(?:to|towards)\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        /(?:route|way|path)\s+(?:to|towards)\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        // Simple coordinate pattern
        /\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/
      ];

      // Check for incident search requests
      const incidentPatterns = [
        // Arabic patterns
        /(?:أقرب|اقرب|حوادث|حوادث قريبة|حوادث قريبة من|حوادث في نطاق|حوادث بالقرب من)\s*(?:من|في|إلى|الى)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        /(?:حوادث|حوادث قريبة|حوادث قريبة من|حوادث في نطاق|حوادث بالقرب من)\s*(?:من|في|إلى|الى)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        // English patterns
        /(?:closest|nearest|incidents|incidents near|incidents within|incidents around)\s*(?:to|from|at|in)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
        // Number + incidents pattern
        /(?:أقرب|اقرب|closest|nearest)\s*(\d+)\s*(?:حوادث|incidents?)\s*(?:من|from|to|at)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i
      ];

             // Check for resource search requests
       const resourcePatterns = [
         // Arabic patterns
         /(?:موارد|موارد قريبة|موارد قريبة من|موارد في نطاق|موارد بالقرب من)\s*(?:من|في|إلى|الى)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
         // English patterns
         /(?:resources|resources near|resources within|resources around)\s*(?:to|from|at|in)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i
       ];

       // Check for crisis search requests
       const crisisPatterns = [
         // Arabic patterns
         /(?:كوارث|كوارث قريبة|كوارث قريبة من|كوارث في نطاق|كوارث بالقرب من)\s*(?:من|في|إلى|الى)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
         /(?:أقرب|اقرب|closest|nearest)\s*(\d+)\s*(?:كوارث|crisis|disasters?)\s*(?:من|from|to|at)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i,
         // English patterns
         /(?:crisis|crises|disasters?|disaster events?)\s*(?:near|within|around|close to)\s*(?:to|from|at|in)?\s*\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/i
       ];

       // Check for heatmap requests
       const heatmapPatterns = [
         // Arabic patterns
         /(?:أعرض|اعرض|أنشئ|انشئ|اصنع|اصنع)\s*(?:خريطة|خريطه)\s*(?:حرارية|حراريه)\s*(?:للحوادث|لحوادث|للأحداث|لأحداث|للكوارث|لكوارث|للموارد|لموارد)?/i,
         /(?:خريطة|خريطه)\s*(?:حرارية|حراريه)\s*(?:للحوادث|لحوادث|للأحداث|لأحداث|للكوارث|لكوارث|للموارد|لموارد)?/i,
         // English patterns
         /(?:show|display|create|generate)\s*(?:heatmap|heat map)\s*(?:of|for)?\s*(?:incidents|events|crisis|disasters|resources)?/i,
         /(?:heatmap|heat map)\s*(?:of|for)?\s*(?:incidents|events|crisis|disasters|resources)?/i
       ];

      // Check for routing requests
      let routingMatch = null;
      for (const pattern of routingPatterns) {
        routingMatch = prompt.match(pattern);
        if (routingMatch) break;
      }

      // Check for incident search requests
      let incidentMatch = null;
      for (const pattern of incidentPatterns) {
        incidentMatch = prompt.match(pattern);
        if (incidentMatch) break;
      }

             // Check for resource search requests
       let resourceMatch = null;
       for (const pattern of resourcePatterns) {
         resourceMatch = prompt.match(pattern);
         if (resourceMatch) break;
       }

       // Check for crisis search requests
       let crisisMatch = null;
       for (const pattern of crisisPatterns) {
         crisisMatch = prompt.match(pattern);
         if (crisisMatch) break;
       }

       // Check for heatmap requests
       let heatmapMatch = null;
       for (const pattern of heatmapPatterns) {
         heatmapMatch = prompt.match(pattern);
         if (heatmapMatch) break;
       }

      // Handle routing requests
      if (routingMatch) {
        const endLat = parseFloat(routingMatch[1]);
        const endLon = parseFloat(routingMatch[2]);

        if (!isNaN(endLat) && !isNaN(endLon)) {
          const isExplicitRouteRequest = /(?:أسرع|اسرع|أفضل|افضل|طريق|مسار|route|fastest|best|quickest|way|path)/i.test(prompt);

          if (isExplicitRouteRequest) {
            // حفظ نقطة النهاية والطلب من المستخدم تحديد نقطة البداية
            routingIntentRef.current = { endLat, endLon };
            addMessage("bot", `🧭 أرى أنك تريد أسرع طريق إلى الإحداثيات (${endLat}, ${endLon}).\n\nيرجى النقر على الخريطة لتحديد نقطة البداية للمسار.`);
            setLoading(false);
            setIsTyping(false);
            return;
          }
        }
      }

      // Handle incident search requests
      if (incidentMatch) {
        let lat, lon, limit = 5;
        
        // Check if it's the number + incidents pattern
        if (incidentMatch[1] && !isNaN(parseInt(incidentMatch[1]))) {
          // Pattern: "أقرب 5 حوادث من 25.267699, 55.294676"
          limit = parseInt(incidentMatch[1]);
          lat = parseFloat(incidentMatch[2]);
          lon = parseFloat(incidentMatch[3]);
        } else {
          // Regular pattern: "حوادث قريبة من 25.267699, 55.294676"
          lat = parseFloat(incidentMatch[1]);
          lon = parseFloat(incidentMatch[2]);
        }

        if (!isNaN(lat) && !isNaN(lon)) {
          addMessage("bot", `🚨 أرى أنك تريد البحث عن ${limit} حوادث قريبة من الإحداثيات (${lat}, ${lon}). سأقوم بالبحث...`);
          setLoading(false);
          setIsTyping(false);

          const result = await handleMapAction({
            action: "find-incidents-within-radius",
            lat: lat,
            lon: lon,
            radius: 5,
            limit: limit
          }, `incidents_${Date.now()}`);

          return;
        }
      }

             // Handle resource search requests
       if (resourceMatch) {
         const lat = parseFloat(resourceMatch[1]);
         const lon = parseFloat(resourceMatch[2]);

         if (!isNaN(lat) && !isNaN(lon)) {
           addMessage("bot", `🏥 أرى أنك تريد البحث عن موارد قريبة من الإحداثيات (${lat}, ${lon}). سأقوم بالبحث...`);
           setLoading(false);
           setIsTyping(false);

           const result = await handleMapAction({
             action: "find-nearby-resources",
             lat: lat,
             lon: lon,
             resourceType: "all",
             radius: 5
           }, `resources_${Date.now()}`);

           return;
         }
       }

       // Handle crisis search requests
       if (crisisMatch) {
         let lat, lon, limit = 5;
         
         // Check if it's the number + crisis pattern
         if (crisisMatch[1] && !isNaN(parseInt(crisisMatch[1]))) {
           // Pattern: "أقرب 5 كوارث من 25.267699, 55.294676"
           limit = parseInt(crisisMatch[1]);
           lat = parseFloat(crisisMatch[2]);
           lon = parseFloat(crisisMatch[3]);
         } else {
           // Regular pattern: "كوارث قريبة من 25.267699, 55.294676"
           lat = parseFloat(crisisMatch[1]);
           lon = parseFloat(crisisMatch[2]);
         }

         if (!isNaN(lat) && !isNaN(lon)) {
           addMessage("bot", `🌊 أرى أنك تريد البحث عن ${limit} كوارث قريبة من الإحداثيات (${lat}, ${lon}). سأقوم بالبحث...`);
           setLoading(false);
           setIsTyping(false);

           const result = await handleMapAction({
             action: "find-crisis-within-radius",
             lat: lat,
             lon: lon,
             radius: 5,
             limit: limit
           }, `crisis_${Date.now()}`);

           return;
         }
       }

       // Handle heatmap requests
      //  if (heatmapMatch) {
      //    addMessage("bot", "🔥 أرى أنك تريد إنشاء خريطة حرارية للحوادث. سأقوم بإنشائها الآن...");
      //    setLoading(false);
      //    setIsTyping(false);

      //    const result = await handleMapAction({
      //      action: "create-heatmap",
      //      intensity: 0.5,
      //      radius: 25
      //    }, `heatmap_${Date.now()}`);

      //    return;
      //  }

      // Check for simple keywords when location is already selected
      if (!routingMatch && !incidentMatch && !resourceMatch && !crisisMatch && !heatmapMatch) {
        const simpleKeywords = {
          "حوادث": "incidents",
          "incidents": "incidents", 
          "موارد": "resources",
          "resources": "resources",
          "كوارث": "crisis",
          "crisis": "crisis",
          "disasters": "crisis"
        };
        
        const lowerPrompt = prompt.trim().toLowerCase();
        let foundKeyword = null;
        
        for (const [keyword, type] of Object.entries(simpleKeywords)) {
          if (lowerPrompt.includes(keyword.toLowerCase())) {
            foundKeyword = type;
            break;
          }
        }
        
        if (foundKeyword && pendingLocationChoiceRef.current) {
          const { lat, lon } = pendingLocationChoiceRef.current;
          
          // Ask for radius first
          if (foundKeyword === "incidents") {
            addMessage("bot", `🚨 تريد البحث عن حوادث قريبة من (${lat.toFixed(6)}, ${lon.toFixed(6)}).\n\nفي أي نطاق تريد البحث؟ اكتب عدد الكيلومترات (مثال: 3 أو 5 أو 10)`);
            pendingLocationChoiceRef.current.searchType = "incidents";
            pendingLocationChoiceRef.current.pendingRadius = true;
          } else if (foundKeyword === "resources") {
            addMessage("bot", `🏥 تريد البحث عن موارد قريبة من (${lat.toFixed(6)}, ${lon.toFixed(6)}).\n\nفي أي نطاق تريد البحث؟ اكتب عدد الكيلومترات (مثال: 3 أو 5 أو 10)`);
            pendingLocationChoiceRef.current.searchType = "resources";
            pendingLocationChoiceRef.current.pendingRadius = true;
          } else if (foundKeyword === "crisis") {
            addMessage("bot", `🌊 تريد البحث عن كوارث قريبة من (${lat.toFixed(6)}, ${lon.toFixed(6)}).\n\nفي أي نطاق تريد البحث؟ اكتب عدد الكيلومترات (مثال: 3 أو 5 أو 10)`);
            pendingLocationChoiceRef.current.searchType = "crisis";
            pendingLocationChoiceRef.current.pendingRadius = true;
          }
          
          setLoading(false);
          setIsTyping(false);
          return;
        }
        
        // If only coordinates are provided without specific intent
        const coordinatePattern = /\(?(\d+\.?\d*)\s*,\s*(\d+\.?\d*)\)?/;
        const coordMatch = prompt.match(coordinatePattern);
        
        if (coordMatch) {
          const lat = parseFloat(coordMatch[1]);
          const lon = parseFloat(coordMatch[2]);
          
          if (!isNaN(lat) && !isNaN(lon)) {
            addMessage("bot", `📍 أرى أنك قدمت إحداثيات (${lat}, ${lon}). ماذا تريد أن تفعل بهذه الإحداثيات؟\n\nيمكنك:\n• طلب أسرع طريق: "أسرع طريق إلى (${lat}, ${lon})"\n• البحث عن موارد قريبة: "موارد قريبة من (${lat}, ${lon})"\n• البحث عن حوادث قريبة: "حوادث قريبة من (${lat}, ${lon})"`);
            setLoading(false);
            setIsTyping(false);
            return;
          }
        }
      }
      
      // Check if user is providing radius for pending search
      if (pendingLocationChoiceRef.current && pendingLocationChoiceRef.current.pendingRadius) {
        const radiusPattern = /(\d+)/;
        const radiusMatch = prompt.match(radiusPattern);
        
        if (radiusMatch) {
          const radius = parseFloat(radiusMatch[1]);
          if (!isNaN(radius) && radius > 0) {
            const { lat, lon, searchType } = pendingLocationChoiceRef.current;
            
            addMessage("bot", `🔍 جاري البحث عن ${searchType === "incidents" ? "حوادث" : searchType === "resources" ? "موارد" : "كوارث"} في نطاق ${radius} كم من (${lat.toFixed(6)}, ${lon.toFixed(6)})...`);
            
            // Execute the search
            if (searchType === "incidents") {
              await handleMapAction({
                action: "find-incidents-within-radius",
                lat: lat,
                lon: lon,
                radius: radius,
                limit: 10
              }, `incidents_${Date.now()}`);
            } else if (searchType === "resources") {
              await handleMapAction({
                action: "find-nearby-resources",
                lat: lat,
                lon: lon,
                resourceType: "all",
                radius: radius
              }, `resources_${Date.now()}`);
            } else if (searchType === "crisis") {
              await handleMapAction({
                action: "find-crisis-within-radius",
                lat: lat,
                lon: lon,
                radius: radius,
                limit: 10
              }, `crisis_${Date.now()}`);
            }
            
            // Clear pending state
            pendingLocationChoiceRef.current = null;
            setLoading(false);
            setIsTyping(false);
            return;
          }
        }
        
        // If radius input is invalid, ask again
        addMessage("bot", "⚠️ يرجى إدخال رقم صحيح للنطاق (مثال: 3 أو 5 أو 10)");
        setLoading(false);
        setIsTyping(false);
        return;
      }

      const tools = [
        {
          type: "function",
          function: {
            name: "route-to",
            description: "Find the fastest driving route between two coordinates",
            parameters: {
              type: "object",
              properties: {
                startLat: { type: "float", description: "The latitude of the starting point" },
                startLon: { type: "float", description: "The longitude of the starting point" },
                endLat: { type: "float", description: "The latitude of the destination point" },
                endLon: { type: "float", description: "The longitude of the destination point" }
              },
              required: ["startLat", "startLon", "endLat", "endLon"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "route-to-destination",
            description: "Find the fastest driving route from Dubai center to a specific destination",
            parameters: {
              type: "object",
              properties: {
                endLat: { type: "float", description: "The latitude of the destination point" },
                endLon: { type: "float", description: "The longitude of the destination point" }
              },
              required: ["endLat", "endLon"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "population-distribution",
            description: "View the Population Distribution on the map",
          }
        },
        {
          type: "function",
          function: {
            name: "create-heatmap",
            description: "Create a heatmap of the current layer",
          }
        },
        {
          type: "function",
          function: {
            name: "analyze-high-severity",
            description: "Analyze high-severity incidents on the map",
          }
        },
        {
          type: "function",
          function: {
            name: "find-nearby-resources",
            description: "Find nearby resources on the map",
            parameters: {
              type: "object",
              properties: {
                lat: {
                  type: "float",
                  description: "The latitude of the location"
                },
                lon: {
                  type: "float",
                  description: "The longitude of the location"
                },
                resourceType: {
                  type: "string",
                  description: "The type of resource to find",
                  enum: ["hospital", "school", "shelter", "police", "fire"],
                  default: "all"
                },
                radius: {
                  type: "float",
                  description: "The radius (in km) to search for resources",
                  default: 5.0
                }
              },
              required: ["lat", "lon"]
            }
          }
        },
                 {
           type: "function",
           function: {
             name: "find-incidents-within-radius",
             description: "Find incidents within a specified radius on the map",
             parameters: {
               type: "object",
               properties: {
                 lat: {
                   type: "float",
                   description: "The latitude of the location"
                 },
                 lon: {
                   type: "float",
                   description: "The longitude of the location"
                 },
                 radius: {
                   type: "float",
                   description: "The radius (in km) to search for incidents",
                   default: 5.0
                 }
               },
               required: ["lat", "lon"]
             }
           }
         },
         {
           type: "function",
           function: {
             name: "find-crisis-within-radius",
             description: "Find crisis/disaster events within a specified radius on the map",
             parameters: {
               type: "object",
               properties: {
                 lat: {
                   type: "float",
                   description: "The latitude of the location"
                 },
                 lon: {
                   type: "float",
                   description: "The longitude of the location"
                 },
                 radius: {
                   type: "float",
                   description: "The radius (in km) to search for crisis events",
                   default: 5.0
                 }
               },
               required: ["lat", "lon"]
             }
           }
         },
        {
          type: "function",
          function: {
            name: "find-closest-spatial",
            description: "Find the closest spatial features to a given location",
            parameters: {
              type: "object",
              properties: {
                lat: {
                  type: "float",
                  description: "The latitude of the location"
                },
                lon: {
                  type: "float",
                  description: "The longitude of the location"
                },
                limit: {
                  type: "int",
                  description: "The maximum number of features to return",
                  default: 5
                }
              },
              required: ["lat", "lon"]
            }
          }
        },
        {
          type: "function",
          function: {
            // Something is wrong with dates
            // ⚠️ تواريخ غير صالحة. استخدم صيغة مثل 2024-12-01.
            // {endDate: '20-10-2025', startDate: '21-05-2020'}
            name: "filter-incidents-date-range",
            description: "Filter incidents by date range",
            parameters: {
              type: "object",
              properties: {
                startDate: {
                  type: "string",
                  description: "The start date of the range (DD-MM-YYYY)"
                },
                endDate: {
                  type: "string",
                  description: "The end date of the range (DD-MM-YYYY)"
                }
              },
              required: ["startDate", "endDate"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "find-closest-temporal",
            description: "Find the closest temporal features to a given date",
            parameters: {
              type: "object",
              properties: {
                date: {
                  type: "string",
                  description: "The date to search for temporal features (DD-MM-YYYY)"
                },
                limit: {
                  type: "integer",
                  description: "The maximum number of features to return",
                  default: 5
                }
              },
              required: ["date"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "top-roads-by-incidents",
            description: "Find the top roads by incidents",
            parameters: {
              type: "object",
              properties: {
                limit: {
                  type: "integer",
                  description: "The maximum number of features to return",
                  default: 5
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "top-incident-types",
            description: "Find the top incident types",
            parameters: {
              type: "object",
              properties: {
                limit: {
                  type: "integer",
                  description: "The maximum number of features to return",
                  default: 5
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            // Couldn't test
            name: "compare-incident-counts",
            description: "Compare incident counts between different locations",
            parameters: {
              type: "object",
              properties: {
                area1: {
                  type: "string",
                  description: "The name of the first area to compare",
                },
                area2: {
                  type: "string",
                  description: "The name of the second area to compare",
                }
              },
              required: ["area1", "area2"]
            }
          }
        },
        {
          type: "function",
          function: {
            // Somthing is not working fillters are not being applied
            name: "filter-by-keywords",
            description: "Filter incidents by keywords",
            parameters: {
              type: "object",
              properties: {
                keywords: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "The keywords to filter incidents by (eg. 'sandstorm' or 'flood')",
                },
                status: {
                  type: "string",
                  description: "The status of the incidents to filter",
                  enum: ["open", "closed"]
                }
              },
              required: ["keywords"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "filter-major-roads-incidents",
            description: "Filter incidents on major roads"
          }
        },
        {
          type: "function",
          function: {
            name: "show-crisis-grouped-status",
            description: "Show the status of incidents grouped by crisis"
          }
        },
        {
          type: "function",
          function: {
            name: "clear",
            description: "Clear all results and visualizations from the map"
          }
        }
      ]
      setHistory(prev => [...prev, {
        "role": "user",
        "content": prompt
      }])
      const sysPrompt = history[0];
      makeLLMCall([sysPrompt,
      {
        "role": "user",
        "content": prompt
      }
      ], tools).then(() => {
        setLoading(false);
        setIsTyping(false);
      })
    },
    [addMessage, history, makeLLMCall, setInput, setIsTyping, setLoading]
  );

  // Monitor allFeaturesData changes
  useEffect(() => {
    console.log("📈 عدد الميزات المتاحة:", allFeaturesData.length);
    if (allFeaturesData.length > 0) {
      setMapStats((prev) => ({ ...prev, features: allFeaturesData.length }));
    }
  }, [allFeaturesData]);

  // Keep displayed features count in sync with activeFeatures
  useEffect(() => {
    setMapStats((prev) => ({ ...prev, features: activeFeatures }));
  }, [activeFeatures]);

  // Monitor connection status
  useEffect(() => {
    console.log("🔗 حالة الاتصال:", connectionStatus);
  }, [connectionStatus]);

  // Monitor data processing status
  useEffect(() => {
    console.log("⚙️ حالة معالجة البيانات:", dataProcessingStatus);
  }, [dataProcessingStatus]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatPanel
        messages={messages}
        input={input}
        setInput={setInput}
        loading={loading}
        connectionStatus={connectionStatus}
        activeFeatures={activeFeatures}
        mapStats={mapStats}
        dataProcessingStatus={dataProcessingStatus}
        handleUserQuery={handleUserQuery}
        clearChat={clearChat}
        isTyping={isTyping}
      />
      <MapPanel
        mapDiv={mapDiv}
        leafletLoaded={leafletLoaded}
        allFeaturesData={allFeaturesData}
        handleMapAction={handleMapAction}
        availableFiles={availableFiles}
        activeFeatures={activeFeatures}
        dataProcessingStatus={dataProcessingStatus}
        mapStats={mapStats}
      />
    </div>
  );
}
