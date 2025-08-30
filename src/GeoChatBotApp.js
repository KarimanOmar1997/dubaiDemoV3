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
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
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
      }
    };

    // Only include tools on the first call
    if (tools && callDepth === 0) {
      requestBody.tools = tools;
    }

    const res = await fetch("http://135.222.40.6:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let buffer = "";
    var botMessageId = null;
    let modelThinking = false;
    const conversationMessages = [...messages];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.trim().split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        const json = JSON.parse(line);

        if (modelThinking){
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
            const lat = args?.lat;
            const lon = args?.lon;
            const resourceType = args?.resourceType ?? 'all';
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
              content: "",
              tool_calls: [toolCall]
            });
            conversationMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: result
            });
          }

          // Recursively call with updated conversation and incremented depth
          console.log(`Making recursive LLM call (depth: ${callDepth + 1})`);
          await makeLLMCall(conversationMessages, tools, callDepth + 1);
          return; // Exit early since we'll handle the response in the recursive call
        }
      }
    }

    // Final update to ensure all text is displayed
    if (fullText) {
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

      const tools = [
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
                  description: "The status of the incidents to filter (e.g., 'active', 'resolved')",
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

      makeLLMCall([
        {
          "role": "user",
          "content": prompt
        }
      ], tools).then(() => {
        setLoading(false);
        setIsTyping(false);
      })
    },
    [addMessage, makeLLMCall, setInput, setIsTyping, setLoading]
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
