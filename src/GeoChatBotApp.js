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

  // Enhanced handle user query function with high-severity analysis
  const handleUserQuery = useCallback(
    async (prompt) => {
      if (!prompt.trim()) return;

      processedActionsRef.current.clear();

      addMessage("user", prompt);
      setInput("");
      setLoading(true);
      setIsTyping(true);

      // Simulate thinking time
      await new Promise((resolve) => setTimeout(resolve, 800));

      try {
        const lowerPrompt = prompt.toLowerCase().trim();
        // Normalize Arabic by removing diacritics and tatweel for robust matching
        const normalizedPrompt = lowerPrompt.replace(/[\u064B-\u0652\u0640]/g, "");
        console.log("🔍 Processing query:", lowerPrompt);
        console.log("📊 Available features:", allFeaturesData.length);

        // If awaiting resource type/radius after choosing Resources at a clicked location
        if (pendingResourceQueryRef.current) {
          const pending = pendingResourceQueryRef.current;
          const { lat, lon, resourceType: pendingType } = pending;
          // Parse type (or reuse previously chosen type)
          const typeMap = {
            hospitals: ["مستشفى", "مستشفيات", "hospital", "clinic", "طبي", "صحي"],
            schools: ["مدرسة", "مدارس", "school", "جامعة", "تعليم", "كلية"],
            shelters: ["ملجأ", "ملاجئ", "shelter", "إيواء", "طوارئ", "تجمع", "نقطة تجمع", "إخلاء"],
            police: ["شرطة", "police", "مخفر", "قسم", "أمن"],
            fire: ["إطفاء", "fire", "حريق", "دفاع مدني", "إنقاذ"],
          };
          let resourceType = pendingType || "all";
          Object.entries(typeMap).forEach(([t, kws]) => {
            if (kws.some((kw) => lowerPrompt.includes(kw))) resourceType = t;
          });
          // Parse radius (km)
          const radiusMatchRes = prompt.match(/(?:ضمن\s*نطاق|في\s*نطاق|within)\s*(\d+)\s*(?:كم|km)?/i);
          const radiusNumberOnly = prompt.match(/^\s*(\d+)\s*(?:كم|km)?\s*$/i);
          const radiusInlineAny = !radiusMatchRes && !radiusNumberOnly ? prompt.match(/(\d+)\s*(?:كم|km)?/i) : null;
          let radiusRes = null;
          if (radiusMatchRes) {
            radiusRes = parseInt(radiusMatchRes[1]);
          } else if (radiusNumberOnly) {
            radiusRes = parseInt(radiusNumberOnly[1]);
          } else if (radiusInlineAny) {
            radiusRes = parseInt(radiusInlineAny[1]);
          }
          if (!radiusRes || isNaN(radiusRes)) {
            // Ask user to specify radius explicitly; keep chosen type
            pendingResourceQueryRef.current = { lat, lon, resourceType };
            setIsTyping(false);
            addMessage(
              "bot",
              "📏 من فضلك حدّد نطاق البحث بالكيلومترات (اكتب رقماً مثل 5 أو 10)."
            );
            return;
          }
          pendingResourceQueryRef.current = null;
          setIsTyping(false);
          addMessage(
            "bot",
            `🔍 جاري البحث عن ${resourceType === "all" ? "الموارد" : resourceType} ضمن ${radiusRes} كم من (${lat.toFixed(6)}, ${lon.toFixed(6)})`
          );
          await handleMapAction(
            { action: "find-nearby-resources", lat, lon, resourceType, radius: radiusRes },
            `query_click_resources_${Date.now()}`
          );
          return;
        }

        // If awaiting choice of what to search at clicked location
        if (pendingLocationChoiceRef.current) {
          const { lat, lon } = pendingLocationChoiceRef.current;
          // Detect choice
          const chooseResources = ["موارد", "موارد", "resource", "resources", "خدمات", "مرافق"].some((k) => lowerPrompt.includes(k));
          const chooseIncidents = ["حادث", "حوادث", "incident", "incidents", "accident", "accidents"].some((k) => lowerPrompt.includes(k));
          const chooseDisasters = ["كارثة", "كوارث", "crisis", "disaster"].some((k) => lowerPrompt.includes(k));

          if (chooseResources) {
            pendingLocationChoiceRef.current = null;
            pendingResourceQueryRef.current = { lat, lon };
            setIsTyping(false);
            addMessage(
              "bot",
              "🎯 ما نوع المورد الذي تريد البحث عنه؟ اكتب: مستشفيات، مدارس، ملاجئ، شرطة، إطفاء، أو الكل.\nثم حدّد نطاق البحث بالكيلومترات (مثلاً: ضمن نطاق 5 كم)."
            );
            return;
          }

          if (chooseIncidents) {
            pendingLocationChoiceRef.current = null;
            pendingIncidentQueryRef.current = { lat, lon };
            setIsTyping(false);
            addMessage(
              "bot",
              `🎯 كم حادث تريد عرض أقربهم للموقع (${lat.toFixed(6)}, ${lon.toFixed(6)})؟ اكتب رقماً مثل 5 أو 10.`
            );
            return;
          }

          if (chooseDisasters) {
            pendingLocationChoiceRef.current = null;
            setIsTyping(false);
            addMessage(
              "bot",
              "ℹ️ حالياً البحث المكاني للكوارث غير مفعل. يمكنك البحث عن \"موارد\" أو \"حوادث\" لهذا الموقع."
            );
            return;
          }

          // If unclear, re-prompt
          setIsTyping(false);
          addMessage(
            "bot",
            "⚠️ لم أفهم اختيارك. اكتب: \"موارد\" أو \"حوادث\" أو \"كوارث\"."
          );
          return;
        }

        // If user previously clicked on the map and we are awaiting a count, handle it here
        if (pendingIncidentQueryRef.current) {
          const countMatch = prompt.match(/(\d+)/);
          if (countMatch) {
            const limit = Math.max(1, parseInt(countMatch[1]));
            const { lat, lon } = pendingIncidentQueryRef.current;
            pendingIncidentQueryRef.current = null;
            setIsTyping(false);
            addMessage(
              "bot",
              `🎯 جاري عرض أقرب ${limit} حوادث للموقع (${lat.toFixed(6)}, ${lon.toFixed(6)})`
            );
            await handleMapAction(
              { action: "find-closest-spatial", lat, lon, limit },
              `query_click_count_${Date.now()}`
            );
            return;
          } else {
            setIsTyping(false);
            addMessage(
              "bot",
              "⚠️ من فضلك اكتب رقماً فقط لعدد الحوادث المطلوب (مثلاً 5 أو 10)."
            );
            return;
          }
        }

        // NEW: HIGH-SEVERITY INCIDENT ANALYSIS
        const severityKeywords = [
          "خطورة عالية",
          "عالية الخطورة",
          "الأعلى خطورة",
          "أكثر خطورة",
          "الأخطر",
          "حوادث خطيرة",
          "حوادث قاتلة",
          "وفيات",
          "إصابات شديدة",
          "الإصابات الشديدة",
          "تحليل الإصابات الشديدة",
          "إصابة شديدة",
          "إصابة بليغة",
          "إصابات بليغة",
          "أشد الحوادث",
          "high severity",
          "dangerous",
          "fatal",
          "critical",
          "severe",
        ];
        const hasSeverityKeyword = severityKeywords.some((keyword) =>
          normalizedPrompt.includes(keyword)
        );

        if (hasSeverityKeyword) {
          setIsTyping(false);
          addMessage(
            "bot",
            "🚨 جاري تحليل الحوادث عالية الخطورة وتحديد أكثر المناطق خطورة..."
          );

          await handleMapAction(
            {
              action: "analyze-high-severity",
            },
            `query_severity_${Date.now()}`
          );

          return;
        }

        // Guard: if disaster-like terms present, skip resource intent
        const hasDisasterLikeTerms = [
          "كارث",
          "كوارث",
          "سيول",
          "فيض",
          "أمطار",
          "حريق",
          "flood",
          "rain",
          "storm",
        ].some((k) => lowerPrompt.includes(k));

        const resourceKeywords = {
          general: ["مورد", "موارد", "خدمات", "مرافق", "resources"],
          hospitals: ["مستشفى", "مستشفيات", "hospital", "طبي"],
          schools: ["مدرسة", "مدارس", "school", "جامعة", "تعليم"],
          shelters: [
            "ملجأ",
            "ملاجئ",
            "shelter",
            "إيواء",
            "طوارئ",
            "إخلاء",
            "نقطة إخلاء",
            "تجمع",
            "نقطة تجمع",
          ],
          police: ["شرطة", "police", "أمن", "مخفر", "قسم", "أقسام"],
          fire: ["إطفاء", "fire", "حريق", "دفاع مدني"],
        };
        // فحص نوع المورد المطلوب
        let hasResourceKeyword = false;
        let detectedResourceType = "all";

        Object.entries(resourceKeywords).forEach(([type, keywords]) => {
          if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
            hasResourceKeyword = true;
            if (type !== "general") {
              detectedResourceType = type;
            }
          }
        });
        if (hasResourceKeyword && !hasDisasterLikeTerms) {
          // Check for coordinates in resource query
          const coordPatterns = [
            /(\d+\.?\d*)[,\s]+(\d+\.?\d*)/,
            /lat[:\s]*(\d+\.?\d*)[,\s]*lon[:\s]*(\d+\.?\d*)/i,
            /(\d+\.?\d*)\s*درجة[,\s]*(\d+\.?\d*)\s*درجة/,
            /إحداثيات[:\s]*(\d+\.?\d*)[,\s]*(\d+\.?\d*)/,
          ];

          let coordMatch = null;
          for (const pattern of coordPatterns) {
            coordMatch = prompt.match(pattern);
            if (coordMatch) break;
          }

          // Extract radius if specified
          const radiusMatch = prompt.match(
            /(\d+)\s*كم|(\d+)\s*km|نطاق[:\s]*(\d+)/i
          );
          const radius = radiusMatch
            ? parseInt(radiusMatch[1] || radiusMatch[2] || radiusMatch[3])
            : 5;

          if (coordMatch) {
            const lat = parseFloat(coordMatch[1]);
            const lon = parseFloat(coordMatch[2]);

            if (
              lat &&
              lon &&
              lat >= -90 &&
              lat <= 90 &&
              lon >= -180 &&
              lon <= 180
            ) {
              setIsTyping(false);
              const resourceTypeArabic = {
                hospitals: "المستشفيات",
                schools: "المدارس",
                shelters: "الملاجئ",
                police: "مراكز الشرطة",
                fire: "مراكز الإطفاء",
                all: "جميع الموارد",
              };

              addMessage(
                "bot",
                `🔍 جاري البحث عن ${resourceTypeArabic[detectedResourceType]
                } في نطاق ${radius} كم من الموقع (${lat.toFixed(
                  6
                )}, ${lon.toFixed(6)})`
              );

              await handleMapAction(
                {
                  action: "find-nearby-resources",
                  lat: lat,
                  lon: lon,
                  resourceType: detectedResourceType,
                  radius: radius,
                },
                `query_resources_${Date.now()}`
              );

              return;
            } else {
              setIsTyping(false);
              addMessage(
                "bot",
                "⚠️ الإحداثيات غير صحيحة. تأكد من أن خط العرض بين -90 و 90 وخط الطول بين -180 و 180"
              );
              return;
            }
          } else {
            // No coordinates provided: set intent and prompt click
            setIsTyping(false);
            const resourceTypeArabic = {
              hospitals: "المستشفيات",
              schools: "المدارس",
              shelters: "الملاجئ",
              police: "مراكز الشرطة",
              fire: "مراكز الإطفاء",
              all: "الموارد",
            };
            resourceIntentRef.current = { type: detectedResourceType, radius };
            addMessage(
              "bot",
              `📍 اختر موقعاً على الخريطة للبحث عن ${resourceTypeArabic[detectedResourceType]} في نطاق ${radius} كم، أو اكتب الإحداثيات يدوياً.`
            );
            return;
          }
        }

        // HEATMAP/DENSITY ANALYSIS
        const heatmapKeywords = [
          "heatmap",
          "كثافة",
          "تمركز",
          "تجمع",
          "تركز",
          "خريطة حرارية",
          "حرارية",
        ];
        // POPULATION DISTRIBUTION
        const populationKeywords = [
          "توزيع السكان",
          "الكثافة السكانية",
          "سكان",
          "population",
          "population distribution",
        ];
        if (populationKeywords.some((k) => lowerPrompt.includes(k))) {
          setIsTyping(false);
          await handleMapAction({ action: "population-distribution" }, `pop_${Date.now()}`);
          return;
        }

        const hasHeatmapKeyword = heatmapKeywords.some((keyword) =>
          lowerPrompt.includes(keyword)
        );

        if (hasHeatmapKeyword) {
          setIsTyping(false);
          addMessage(
            "bot",
            "🔥 جاري تحليل كثافة الحوادث وإنشاء الخريطة الحرارية..."
          );

          await handleMapAction(
            {
              action: "create-heatmap",
              intensity: 0.6,
              radius: 30,
            },
            `query_heatmap_${Date.now()}`
          );

          return;
        }

        // Enhanced coordinate parsing - support various formats
        const coordPatterns = [
          /(\d+\.?\d*)[,\s]+(\d+\.?\d*)/,
          /lat[:\s]*(\d+\.?\d*)[,\s]*lon[:\s]*(\d+\.?\d*)/i,
          /(\d+\.?\d*)\s*درجة[,\s]*(\d+\.?\d*)\s*درجة/,
          /إحداثيات[:\s]*(\d+\.?\d*)[,\s]*(\d+\.?\d*)/,
        ];

        let coordMatch = null;
        for (const pattern of coordPatterns) {
          coordMatch = prompt.match(pattern);
          if (coordMatch) break;
        }

        // Check for proximity/closest search keywords
        const proximityKeywords = ["أقرب", "قريب", "closest", "near", "بالقرب"];
        const hasProximityKeyword = proximityKeywords.some((keyword) =>
          lowerPrompt.includes(keyword)
        );

        // Extract number limit
        const limitMatch = prompt.match(/(\d+)\s*حوادث?|(\d+)\s*incidents?/i);
        const limit = limitMatch ? parseInt(limitMatch[1] || limitMatch[2]) : 5;

        // Landmark name to coordinates mapping (Dubai)
        const landmarkCoordinates = {
          "برج خليفة": { lat: 25.197197, lon: 55.274376 },
          "burj khalifa": { lat: 25.197197, lon: 55.274376 },
          "دبي مول": { lat: 25.198500, lon: 55.279700 },
          "dubai mall": { lat: 25.198500, lon: 55.279700 },
          "برج العرب": { lat: 25.141300, lon: 55.185300 },
          "burj al arab": { lat: 25.141300, lon: 55.185300 },
          "مطار دبي": { lat: 25.253200, lon: 55.365700 },
          "dubai airport": { lat: 25.253200, lon: 55.365700 }
        };

        // SPATIAL SEARCH - radius around landmark or coordinates
        const radiusMatchPrompt = prompt.match(/(?:ضمن\s*نطاق|في\s*نطاق|within)\s*(\d+)\s*(?:كم|km)/i);
        if (radiusMatchPrompt) {
          const radiusKm = parseInt(radiusMatchPrompt[1]);
          let centerLat = null, centerLon = null;

          // Try coordinates first
          if (coordMatch) {
            centerLat = parseFloat(coordMatch[1]);
            centerLon = parseFloat(coordMatch[2]);
          }

          // Then try landmarks (no need for proximity keywords)
          if (centerLat === null || isNaN(centerLat)) {
            const foundLmForRadius = Object.keys(landmarkCoordinates).find((name) =>
              lowerPrompt.includes(name)
            );
            if (foundLmForRadius) {
              centerLat = landmarkCoordinates[foundLmForRadius].lat;
              centerLon = landmarkCoordinates[foundLmForRadius].lon;
            }
          }

          if (
            typeof centerLat === "number" &&
            typeof centerLon === "number" &&
            !isNaN(centerLat) &&
            !isNaN(centerLon)
          ) {
            setIsTyping(false);
            addMessage(
              "bot",
              `🔎 جاري البحث عن الحوادث ضمن نطاق ${radiusKm} كم من الإحداثيات (${centerLat.toFixed(6)}, ${centerLon.toFixed(6)})`
            );
            await handleMapAction(
              {
                action: "find-incidents-within-radius",
                lat: centerLat,
                lon: centerLon,
                radius: radiusKm,
              },
              `query_radius_${Date.now()}`
            );
            return;
          }
        }

        // SPATIAL SEARCH - with landmark names (nearest N)
        if (hasProximityKeyword) {
          const foundLandmark = Object.keys(landmarkCoordinates).find((name) =>
            lowerPrompt.includes(name)
          );
          if (foundLandmark) {
            const { lat, lon } = landmarkCoordinates[foundLandmark];
            setIsTyping(false);
            addMessage(
              "bot",
              `🎯 جاري البحث عن ${limit} حوادث الأقرب لـ "${foundLandmark}"`
            );
            await handleMapAction(
              {
                action: "find-closest-spatial",
                lat,
                lon,
                limit,
              },
              `query_landmark_${Date.now()}`
            );
            return;
          }
        }

        // SPATIAL SEARCH - with coordinates
        if (hasProximityKeyword && coordMatch) {
          const lat = parseFloat(coordMatch[1]);
          const lon = parseFloat(coordMatch[2]);

          console.log(
            `🎯 Extracted coordinates: ${lat}, ${lon}, limit: ${limit}`
          );

          if (
            lat &&
            lon &&
            lat >= -90 &&
            lat <= 90 &&
            lon >= -180 &&
            lon <= 180
          ) {
            if (allFeaturesData.length > 0) {
              setIsTyping(false);
              addMessage(
                "bot",
                `🎯 تم تحليل طلبك! جاري البحث عن ${limit} حوادث أقرب للإحداثيات (${lat.toFixed(
                  6
                )}, ${lon.toFixed(6)})`
              );

              await handleMapAction(
                {
                  action: "find-closest-spatial",
                  lat: lat,
                  lon: lon,
                  limit: limit,
                },
                `query_coords_${Date.now()}`
              );

              return;
            } else {
              setIsTyping(false);
              addMessage(
                "bot",
                "⚠️ البيانات غير محملة بعد. يرجى انتظار اكتمال التحميل."
              );
              return;
            }
          } else {
            setIsTyping(false);
            addMessage(
              "bot",
              "⚠️ الإحداثيات غير صحيحة. تأكد من أن خط العرض بين -90 و 90 وخط الطول بين -180 و 180"
            );
            return;
          }
        }

        // SPATIAL SEARCH - with location names (dynamic based on data)
        if (
          hasProximityKeyword &&
          (lowerPrompt.includes("حادث") || lowerPrompt.includes("incident"))
        ) {
          // Remove static location mappings - will search dynamically in the loaded data
          const searchTerm = lowerPrompt
            .replace(/أقرب|حادث|حوادث|closest|incident/g, "")
            .trim();

          if (searchTerm) {
            setIsTyping(false);
            addMessage(
              "bot",
              `🔍 جاري البحث عن المنطقة "${searchTerm}" في البيانات المحملة...`
            );

            // Search for features matching the location name
            const matchingFeatures = allFeaturesData.filter((feature) => {
              const props = feature.properties || {};
              return Object.values(props).some((value) =>
                String(value).toLowerCase().includes(searchTerm)
              );
            });

            if (matchingFeatures.length > 0) {
              // Use first matching feature's coordinates as center
              const centerFeature = matchingFeatures[0];
              let lat = null,
                lon = null;

              if (centerFeature.geometry?.type === "Point") {
                [lon, lat] = centerFeature.geometry.coordinates;
              } else if (centerFeature.geometry?.type === "Polygon") {
                const coords = centerFeature.geometry.coordinates[0];
                lat =
                  coords.reduce((sum, coord) => sum + coord[1], 0) /
                  coords.length;
                lon =
                  coords.reduce((sum, coord) => sum + coord[0], 0) /
                  coords.length;
              }

              if (lat && lon) {
                await handleMapAction(
                  {
                    action: "find-closest-spatial",
                    lat: lat,
                    lon: lon,
                    limit: limit,
                  },
                  `query_location_search_${Date.now()}`
                );

                return;
              }
            } else {
              setIsTyping(false);
              addMessage(
                "bot",
                `⚠️ لم يتم العثور على "${searchTerm}" في البيانات المحملة.\n\n💡 جرب البحث بالإحداثيات أو انقر على الخريطة مباشرة.`
              );
              return;
            }
          }
        }

        // TEMPORAL SEARCH
        // Date range: "بين 2024-12-01 و2024-12-31" or "from 2024-12-01 to 2024-12-31"
        const rangeMatch = prompt.match(/(?:بين|from)\s*(\d{4}[-\/]\d{1,2}[-\/]\d{1,2})\s*(?:و|to)\s*(\d{4}[-\/]\d{1,2}[-\/]\d{1,2})/i);
        if (rangeMatch) {
          const startStr = rangeMatch[1];
          const endStr = rangeMatch[2];
          setIsTyping(false);
          await handleMapAction(
            {
              action: "filter-incidents-date-range",
              startDate: startStr,
              endDate: endStr,
            },
            `query_date_range_${Date.now()}`
          );
          return;
        }

        if (
          lowerPrompt.includes("زمنياً") ||
          lowerPrompt.includes("تاريخ") ||
          lowerPrompt.includes("temporal") ||
          lowerPrompt.includes("date")
        ) {
          const datePatterns = [
            /(\d{4}[-/]\d{1,2}[-/]\d{1,2})/,
            /(\d{1,2}[-/]\d{1,2}[-/]\d{4})/,
            /تاريخ[:\s]*(\d{4}[-/]\d{1,2}[-/]\d{1,2})/,
            /date[:\s]*(\d{4}[-/]\d{1,2}[-/]\d{1,2})/i,
          ];

          let dateMatch = null;
          for (const pattern of datePatterns) {
            dateMatch = prompt.match(pattern);
            if (dateMatch) break;
          }

          if (dateMatch) {
            setIsTyping(false);
            addMessage(
              "bot",
              `⏰ جاري البحث عن أقرب ${limit} حوادث زمنياً لتاريخ ${dateMatch[1]}`
            );

            await handleMapAction(
              {
                action: "find-closest-temporal",
                date: dateMatch[1],
                limit: limit,
              },
              `query_temporal_${Date.now()}`
            );

            return;
          } else {
            setIsTyping(false);
            addMessage(
              "bot",
              "⚠️ لم أتمكن من تحديد التاريخ. استخدم صيغ مثل: 2024-01-15 أو 15/01/2024"
            );
            return;
          }
        }

        // TOP ROADS BY INCIDENTS
        {
          const topRoadsKeywords = ["أعلى", "top", "أكثر"];
          const roadsWords = ["طرق", "الطرق", "roads", "شارع", "شوارع"];
          const incidentsWords = ["حوادث", "accidents", "incidents"];
          const mentionsTopRoads =
            topRoadsKeywords.some((k) => lowerPrompt.includes(k)) &&
            roadsWords.some((k) => lowerPrompt.includes(k)) &&
            incidentsWords.some((k) => lowerPrompt.includes(k));
          if (mentionsTopRoads) {
            const limitNumMatch = prompt.match(/(\d+)\s*(?:طرق|طريق|roads?)/i);
            const topLimit = limitNumMatch ? parseInt(limitNumMatch[1]) : 10;
            setIsTyping(false);
            await handleMapAction(
              { action: "top-roads-by-incidents", limit: topLimit },
              `query_top_roads_${Date.now()}`
            );
            return;
          }
        }

        // TOP INCIDENT TYPES (most frequent)
        {
          const typeKeywords = ["نوع", "أنواع", "types", "type"]; // mentions types
          const frequentKeywords = ["الأكثر", "اكثر", "الأعلى", "متكر", "متكررة", "تكرارا", "تكرار", "most", "frequent"]; // frequent
          const incidentWord = ["حادث", "حوادث", "accidents", "incidents"]; // incidents
          const mentionsTopTypes =
            typeKeywords.some((k) => normalizedPrompt.includes(k)) &&
            frequentKeywords.some((k) => normalizedPrompt.includes(k)) &&
            incidentWord.some((k) => normalizedPrompt.includes(k));
          const phraseRegex = /(ا?كثر|الأكثر)\s+أنواع\s+الحوادث.*(تكرار|تكرارا)/;
          const matchesPhrase = phraseRegex.test(normalizedPrompt);
          if (mentionsTopTypes || matchesPhrase) {
            const limitNumMatch = prompt.match(/(\d+)\s*(?:أنواع|types?)/i);
            const topLimit = limitNumMatch ? parseInt(limitNumMatch[1]) : 10;
            setIsTyping(false);
            await handleMapAction(
              { action: "top-incident-types", limit: topLimit },
              `query_top_types_${Date.now()}`
            );
            return;
          }
        }

        // COMPARE INCIDENT COUNTS BETWEEN TWO AREAS (Arabic/English)
        {
          // Examples: "مقارنة عدد الحوادث بين منطقتين: ديرة وعود ميثاء"
          //            "compare incidents between Deira and Oud Metha"
          const compareRegexAr = /(?:مقارنة|قارن)[^\w]*عدد?\s*الحوادث[^\w]*بين[^:]*:?\s*([^و]+)\s*و\s*(.+)$/i;
          const compareRegexEn = /compare[^\w]*incidents[^\w]*between\s*([^and]+)\s*and\s*(.+)$/i;
          const mAr = normalizedPrompt.match(compareRegexAr);
          const mEn = mAr ? null : prompt.match(compareRegexEn);
          if (mAr || mEn) {
            const area1 = (mAr ? mAr[1] : mEn[1]).trim();
            const area2 = (mAr ? mAr[2] : mEn[2]).trim();
            if (area1 && area2) {
              setIsTyping(false);
              await handleMapAction(
                {
                  action: "compare-incident-counts",
                  area1,
                  area2,
                },
                `query_compare_${Date.now()}`
              );
              return;
            }
          }
        }

        // FILTER: incidents on major roads only
        {
          const majorRoadsKeywords = [
            "الطرق الرئيسية",
            "الطرق الرئيسيه",
            "الطرق السريعة",
            "الطرق الشريانية",
            "طريق رئيسي",
            "طرق رئيسية",
            "major roads",
            "main roads",
            "highways",
            "arterial",
          ];
          if (majorRoadsKeywords.some((k) => lowerPrompt.includes(k))) {
            setIsTyping(false);
            await handleMapAction(
              { action: "filter-major-roads-incidents" },
              `query_major_roads_${Date.now()}`
            );
            return;
          }
        }

        // Prepare grouped-by-status intent detection
        const mentionsCrisisGeneric = ["كوارث", "كارثة", "الكوارث", "crisis", "disaster"].some((k) =>
          normalizedPrompt.includes(k)
        );
        const mentionsGroupStatus =
          (normalizedPrompt.includes("صنف") || normalizedPrompt.includes("حسب") || normalizedPrompt.includes("group")) &&
          (normalizedPrompt.includes("مفتوح") || normalizedPrompt.includes("مغل") || normalizedPrompt.includes("open") || normalizedPrompt.includes("closed"));

        // DISASTER TYPE FILTER (e.g., أمطار غزيرة، سيول، فيضانات)
        {
          const disasterKeywords = [
            "أمطار",
            "أمطار غزيرة",
            "سيول",
            "فيضانات",
            "فيضان",
            "الفيضانات",
            "أمطار رعدية",
            "عاصفة",
            "عواصف",
            "رياح شديدة",
            "sandstorm",
            "flood",
            "floods",
            "rain",
            "heavy rain",
            "storm",
            "كارثة",
            "كوارث",
            "الكوارث",
            "disaster",
            "crisis",
          ];
          if (disasterKeywords.some((k) => normalizedPrompt.includes(k)) && !mentionsGroupStatus) {
            // Collect matched terms from prompt to pass as filters
            const matched = disasterKeywords.filter((k) => normalizedPrompt.includes(k));
            setIsTyping(false);
            await handleMapAction(
              { action: "filter-by-keywords", keywords: matched, color: "#2980b9", dataset: "crisis" },
              `query_disaster_${Date.now()}`
            );
            return;
          }
        }

        // STATUS FILTER: open/closed events (ماهي الاحداث المفتوحة/المغلقة)
        {
          const openWords = ["مفتوحة", "مفتوح", "open", "جارية", "نشطة", "ongoing", "active"];
          const closedWords = ["مغلقة", "مغلق", "closed", "منتهية", "resolved", "completed", "انتهت"];
          const asksOpen = openWords.some((k) => lowerPrompt.includes(k)) && lowerPrompt.includes("احداث");
          const asksClosed = closedWords.some((k) => lowerPrompt.includes(k)) && lowerPrompt.includes("احداث");
          if (asksOpen || asksClosed) {
            setIsTyping(false);
            await handleMapAction(
              {
                action: "filter-by-keywords",
                status: asksOpen ? "open" : "closed",
                color: asksOpen ? "#27ae60" : "#7f8c8d",
                dataset: "crisis",
              },
              `query_status_${Date.now()}`
            );
            return;
          }
        }

        // CRISIS GROUPED BY STATUS: e.g., "اعرض الكوارث و صنفهم على حسب مين مغلق و مين مفتوح"
        {
          if (mentionsCrisisGeneric && mentionsGroupStatus) {
            setIsTyping(false);
            await handleMapAction({ action: "show-crisis-grouped-status" }, `query_crisis_group_${Date.now()}`);
            return;
          }
        }
        // CLEAR/RESET
        if (
          lowerPrompt.includes("مسح") ||
          lowerPrompt.includes("clear") ||
          lowerPrompt.includes("reset") ||
          lowerPrompt.includes("نظف")
        ) {
          setIsTyping(false);
          addMessage("bot", "🧹 جاري مسح جميع النتائج من الخريطة...");

          await handleMapAction(
            {
              action: "clear",
            },
            `query_clear_${Date.now()}`
          );

          return;
        }

        // HELP/INFO
        // HELP/INFO - استبدل هذا القسم في handleUserQuery
        if (
          lowerPrompt.includes("مساعدة") ||
          lowerPrompt.includes("help") ||
          lowerPrompt.includes("كيف") ||
          lowerPrompt.includes("how")
        ) {
          setIsTyping(false);
          addMessage(
            "bot",
            `مرحباً! إليك ما يمكنني مساعدتك به:

              🏥 **البحث عن الموارد المتاحة:**
              - "أقرب مستشفيات للإحداثيات 25.267699, 55.294676"
              - "ملاجئ طوارئ في نطاق 3 كم من 25.2048, 55.2708"
              - "مدارس قريبة من دبي"
              - "مراكز الشرطة والإطفاء للموقع الحالي"
              - "جميع الموارد في نطاق 10 كم"

              🚨 **تحليل الحوادث عالية الخطورة:**
              - "أين توجد أكثر الأحداث ذات خطورة عالية"
              - "الحوادث القاتلة"
              - "تحليل الحوادث الخطيرة"

              🎯 **البحث المكاني:**
              - "أقرب 5 حوادث للإحداثيات 25.267699, 55.294676"
              - "أقرب حادث لدبي"

              ⏰ **البحث الزمني:**
              - "أقرب حوادث زمنياً لتاريخ 2024-12-30"

              🔥 **الخريطة الحرارية:**
              - "أين تمركز أكثر الحوادث"
              - "خريطة حرارية"

              🧹 **أوامر أخرى:**
              - "مسح الخريطة"
              - "إحصائيات"

              💡 أو انقر مباشرة على الخريطة للبحث السريع!`
          );
          return;
        }

        // ROUTING: أسرع طريق
        const routingKeywords = [
          "أسرع طريق",
          "الطريق الاسرع",
          "اسرع طريق",
          "route",
          "fastest route",
        ];
        const nearestPlaceKeywords = [
          "اقرب مكان",
          "أقرب مكان",
          "اقرب",
        ];

        // If the user says: "الطريق الاسرع للمكان كذا" with coords
        const routeWithCoords = prompt.match(/(\d+\.?\d*)[,\s]+(\d+\.?\d*)/);
        if (routingKeywords.some((k) => lowerPrompt.includes(k)) && routeWithCoords) {
          const endLat = parseFloat(routeWithCoords[1]);
          const endLon = parseFloat(routeWithCoords[2]);
          if (
            !isNaN(endLat) &&
            !isNaN(endLon) &&
            endLat >= -90 &&
            endLat <= 90 &&
            endLon >= -180 &&
            endLon <= 180
          ) {
            setIsTyping(false);
            routingIntentRef.current = { endLat, endLon };
            addMessage(
              "bot",
              `📍 اختر نقطة الانطلاق على الخريطة لحساب أسرع طريق إلى (${endLat.toFixed(6)}, ${endLon.toFixed(6)})`
            );
            return;
          }
        }

        // If the user says: "أقرب مكان" (we can later map to nearest resource/incidents)
        if (nearestPlaceKeywords.some((k) => lowerPrompt.includes(k))) {
          setIsTyping(false);
          addMessage(
            "bot",
            "📍 اختر موقعاً على الخريطة وسأعرض أقرب الحوادث والموارد ذات الصلة."
          );
          resourceIntentRef.current = { type: "all", radius: 5 };
          return;
        }

        // STATS/INFO
        if (
          lowerPrompt.includes("إحصائيات") ||
          lowerPrompt.includes("stats") ||
          lowerPrompt.includes("معلومات") ||
          lowerPrompt.includes("info")
        ) {
          setIsTyping(false);
          const totalFeatures = allFeaturesData.length;
          const filesCount = availableFiles.length;
          const displayedFeatures = activeFeatures;

          addMessage(
            "bot",
            `📊 **إحصائيات البيانات الحالية:**\n\n📁 عدد الملفات المحملة: ${filesCount}\n📍 إجمالي الحوادث: ${totalFeatures.toLocaleString()}\n📍 المعروض حالياً: ${displayedFeatures}\n🗺️ مستوى التكبير: ${mapStats.zoom
            }\n\n✅ حالة النظام: ${dataProcessingStatus === "completed"
              ? "جاهز للاستخدام"
              : "قيد التحميل"
            }\n\n💡 جرب النقر على الخريطة أو كتابة استعلام للبدء!`
          );
          return;
        }

        // If we reach here, the query wasn't understood
        setIsTyping(false);
        addMessage(
          "bot",
          `🤔 لم أتمكن من فهم طلبك: "${prompt}"\n\n✨ **جرب هذه الأمثلة:**\n\n🚨 **للحوادث عالية الخطورة:**\n• "أين توجد أكثر الأحداث ذات خطورة عالية"\n• "الحوادث القاتلة"\n• "تحليل الحوادث الخطيرة"\n\n🎯 **للبحث المكاني:**\n• "أقرب 5 حوادث للإحداثيات 25.267699, 55.294676"\n• "أقرب حادث لدبي"\n\n⏰ **للبحث الزمني:**\n• "أقرب حوادث زمنياً لتاريخ 2024-12-30"\n\n🔥 **للخريطة الحرارية:**\n• "أين تمركز أكثر الحوادث"\n• "خريطة حرارية"\n\n🧹 **أوامر أخرى:**\n• "مسح الخريطة"\n• "مساعدة"\n• "إحصائيات"\n\n💡 أو انقر مباشرة على الخريطة للبحث السريع!`
        );
      } catch (error) {
        console.error("Query processing error:", error);
        setIsTyping(false);
        addMessage(
          "bot",
          `🔧 حدث خطأ في معالجة طلبك: ${error.message}\n\n💡 يرجى المحاولة مرة أخرى أو النقر على الخريطة للبحث المباشر.`
        );
      } finally {
        setLoading(false);
        setIsTyping(false);
      }
    },
    [
      handleMapAction,
      parseDate,
      allFeaturesData,
      availableFiles,
      activeFeatures,
      mapStats,
      dataProcessingStatus,
      addMessage,
      setLoading,
      setIsTyping,
      setInput,
    ]
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
