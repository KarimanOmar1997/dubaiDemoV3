import { useCallback, useEffect, useRef, useState } from 'react'
import ChatPanel from './components/ChatPanel'
import MapPanel from './components/MapPanel'
import { useChat } from './hooks/useChat'
import { useGeoData } from './hooks/useGeoData'
import { useLeaflet } from './hooks/useLeaflet'
import { useMapActions } from './hooks/useMapActions'

export default function EnhancedGeoChatBotApp() {
  const mapDiv = useRef(null)
  const mapRef = useRef(null)
  const geoJsonLayerRef = useRef(null)
  const highlightLayerRef = useRef(null)
  const legendRef = useRef(null)
  const processedActionsRef = useRef(new Set())
  const isClickProcessingRef = useRef(false)
  const resourceIntentRef = useRef(null)
  const routingIntentRef = useRef(null)
  const pendingLocationChoiceRef = useRef(null) // holds { lat, lon } awaiting what to search

  const [mapStats, setMapStats] = useState({ zoom: 8, features: 0 })
  const [_history, setHistory] = useState(() => [
    {
      role: 'system',
      content: `
You are **GeoAI**, a highly capable AI assistant specialized in geospatial data analysis and visualization.  
Your primary role is to interact with and control a map using the tools available to you.  
You can generate, update, and analyze visualizations such as heatmaps, choropleth maps, scatter plots, or overlays.  

### Interaction Guidelines:
- Always clarify the user's intent before executing complex map operations.  
- If data or coordinates are missing, ask the user to provide them.  
- Prefer visual map-based outputs (heatmaps, overlays, plots) when possible.  
- If a tool is required (e.g., to generate a heatmap), output a **structured tool call** with the necessary parameters.  
- Never mention internal states, processes, or tools to the user.
- Never respond with a code block.
- Respond in a clear and professional way, suitable for analysts, researchers, or decision-makers.  
- Use only simple Markdown to format your responses.
- Use multiple paragraphs to separate different ideas or points.
- Use numbered lists (e.g., 1. Item one) for ordered information or bullet points (e.g., - Item one) for unordered lists when there are multiple distinct points.
- Allways pay attention to the tools you have called and their results, and use them to inform your responses and actions.

You must always act as an intelligent **geospatial analyst and visualization assistant**, helping users explore data and gain insights from maps.
`,
    },
  ])

  const {
    availableFiles,
    allFeaturesData,
    connectionStatus,
    setConnectionStatus,
    dataProcessingStatus,
    loadGeoJSONFiles,
    activeFeatures,
    setActiveFeatures,
  } = useGeoData()

  const { leafletLoaded } = useLeaflet(setConnectionStatus)

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
  } = useChat()

  const { handleMapAction } = useMapActions({
    allFeaturesData,
    mapRef,
    geoJsonLayerRef,
    highlightLayerRef,
    legendRef,
    processedActionsRef,
    addMessage,
    setActiveFeatures,
  })

  // Clear chat function
  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'مرحباً بك في StrategizeIT! 🗺️ أنا مساعدك الذكي للخرائط. جاري تحميل البيانات من الخادم...',
        timestamp: new Date(),
      },
    ])

    if (highlightLayerRef.current) {
      mapRef.current?.removeLayer(highlightLayerRef.current)
      highlightLayerRef.current = null
    }
    if (geoJsonLayerRef.current) {
      mapRef.current?.removeLayer(geoJsonLayerRef.current)
      geoJsonLayerRef.current = null
    }
    if (legendRef.current) {
      mapRef.current?.removeControl(legendRef.current)
      legendRef.current = null
    }
    setActiveFeatures(0)
    processedActionsRef.current.clear()

    // Reload data
    if (leafletLoaded && mapRef.current) {
      loadGeoJSONFiles()
    }
  }, [setMessages, setActiveFeatures, leafletLoaded, loadGeoJSONFiles])

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapDiv.current || mapRef.current) return

    try {
      const map = window.L.map(mapDiv.current, {
        center: [25.267078, 55.293646], // Dubai coordinates
        zoom: 14,
        zoomControl: true,
        layers: [],
      })

      window.L.tileLayer('./esri-imagery/{z}/{x}/{y}.jpg', {
        attribution: 'Tiles © Esri',
        maxZoom: 18,
      }).addTo(map)

      mapRef.current = map

      // Add scale control
      window.L.control.scale({ metric: true, imperial: false }).addTo(map)

      // Enhanced map click handler for proximity search
      map.on('zoomend', () => {
        setMapStats((prev) => ({ ...prev, zoom: map.getZoom() }))
      })

      console.log('✅ Map initialized successfully')
    } catch (error) {
      console.error('Map initialization failed:', error)
      setConnectionStatus('error')
      addMessage('bot', '⚠️ فشل في تهيئة الخريطة. يرجى إعادة تحميل الصفحة.')
    }
  }, [leafletLoaded, setConnectionStatus, addMessage])

  // Add map click handler after data is loaded
  useEffect(() => {
    if (mapRef.current && allFeaturesData.length > 0) {
      const map = mapRef.current

      // Remove any existing click handlers
      map.off('click')

      // Add new click handler
      map.on('click', async (e) => {
        if (isClickProcessingRef.current) {
          return
        }
        isClickProcessingRef.current = true
        const lat = e.latlng.lat
        const lng = e.latlng.lng
        // فحص إذا كان المستخدم سأل مؤخراً عن موارد
        const recentMessages = messages.slice(-3)
        const hasRecentResourceQuery =
          resourceIntentRef.current !== null ||
          recentMessages.some(
            (msg) =>
              msg.sender === 'user' &&
              (msg.text.includes('مستشفى') ||
                msg.text.includes('مدرسة') ||
                msg.text.includes('ملجأ') ||
                msg.text.includes('إخلاء') ||
                msg.text.includes('تجمع') ||
                msg.text.includes('موارد'))
          )
        const hasRoutingIntent = routingIntentRef.current !== null

        try {
          if (hasRoutingIntent) {
            // If we have a routing intent: first click is origin, destination comes from intent
            const { endLat, endLon } = routingIntentRef.current
            routingIntentRef.current = null
            addMessage(
              'user',
              `أسرع طريق من (${lat.toFixed(6)}, ${lng.toFixed(6)}) إلى (${endLat.toFixed(6)}, ${endLon.toFixed(6)})`
            )
            await handleMapAction(
              {
                action: 'route-to',
                startLat: lat,
                startLon: lng,
                endLat,
                endLon,
              },
              `route_${Date.now()}`
            )
          } else if (hasRecentResourceQuery) {
            const intent = resourceIntentRef.current
            const resourceType = intent?.type || 'all'
            const radius = intent?.radius || 5
            addMessage(
              'user',
              intent
                ? `بحث عن ${resourceType} بالقرب من: ${lat.toFixed(6)}, ${lng.toFixed(6)} (نطاق ${radius} كم)`
                : `بحث عن الموارد بالقرب من: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            )
            // بحث عن موارد
            await handleMapAction(
              {
                action: 'find-nearby-resources',
                lat: lat,
                lon: lng,
                resourceType: resourceType,
                radius: radius,
              },
              `click_resources_${Date.now()}`
            )
            resourceIntentRef.current = null
          } else {
            // لا تعرض نتائج مباشرة. احفظ الموقع واطلب اختيار نوع البحث
            pendingLocationChoiceRef.current = { lat, lon: lng }
            addMessage(
              'bot',
              `📍 تم تحديد الموقع (${lat.toFixed(6)}, ${lng.toFixed(6)}).\nماذا تريد البحث في هذا المكان؟ اكتب: "موارد" أو "حوادث" أو "كوارث".`
            )
          }
        } catch (error) {
          console.error('Error in map click handler:', error)
          addMessage('bot', '❌ حدث خطأ أثناء البحث')
        } finally {
          isClickProcessingRef.current = false
        }

        console.log(`🖱️ Map clicked at coordinates: ${lat}, ${lng}`)
        console.log(
          `📊 Available features for search: ${allFeaturesData.length}`
        )
      })

      console.log('✅ Map click handler added with data available')
    }
  }, [allFeaturesData, handleMapAction, addMessage, messages])

  // Load data when map is ready
  useEffect(() => {
    if (leafletLoaded && mapRef.current) {
      loadGeoJSONFiles()
    }
  }, [leafletLoaded, loadGeoJSONFiles])

  const makeLLMCall = useCallback(
    async (prompt, tools = null, callDepth = 0) => {
      const MAX_CALLS = 3
      if (callDepth >= MAX_CALLS) {
        console.warn(
          `Maximum call depth (${MAX_CALLS}) reached, stopping recursion`
        )
        addMessage('bot', '⚠️ Something went wrong. Please try again.')
        return
      }

      const requestBody = { prompt, tools }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 300000) // 30 second timeout
      const res = await fetch(process.env.REACT_APP_OLLAMACHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      console.log('API Response status:', res.status)
      console.log(
        'API Response headers:',
        Object.fromEntries(res.headers.entries())
      )

      const {
        success,
        message: llm_message,
        tool_calls,
        think: llm_think,
      } = await res.json()
      console.log('LLM API success:', success)
      console.log('LLM API message:', llm_message)
      console.log('LLM API tool calls:', tool_calls)
      console.log('LLM API thinking:', llm_think)

      if (!success) {
        throw new Error('LLM API error')
      }
      if (tool_calls && tool_calls.length > 0) {
        for (const toolCall of tool_calls) {
          console.log('Executing tool call:', toolCall)
          const { name: action, arguments: args } = toolCall.function
          console.log('Tool call name:', action, 'Arguments:', args)
          const lat = parseFloat(args?.lat)
          const lon = parseFloat(args?.lon)
          const endLat = parseFloat(args?.endLat)
          const endLon = parseFloat(args?.endLon)
          const startLat = parseFloat(args?.startLat)
          const startLon = parseFloat(args?.startLon)
          const resourceType = args?.resourceType || 'all'
          const radius = args?.radius ?? 5.0
          const limit = args?.limit ?? 5
          const startDate = args?.startDate
          const endDate = args?.endDate
          const date = args?.date
          const dataset = 'crisis'
          const data = toolCall.data
          const area1 = args?.area1
          const area2 = args?.area2
          const locationName = args?.locationName
          console.log('Parsed tool call params:', {
            action,
            lat,
            lon,
            resourceType,
            radius,
            limit,
            startDate,
            endDate,
            date,
            dataset,
            data,
            endLat,
            endLon,
            startLat,
            startLon,
            area1,
            area2,
            locationName,
          })
          // Execute the map action
          const result = await handleMapAction(
            {
              action,
              lat,
              lon,
              resourceType,
              radius,
              limit,
              startDate,
              endDate,
              date,
              dataset,
              data,
              endLat,
              endLon,
              startLat,
              startLon,
              area1,
              area2,
              locationName,
            },
            `ID_${Date.now()}`
          )
          console.log('Tool call result:', result)
        }
      }
      console.log('Thinking text:', llm_think)
      setHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: llm_message.trim(),
        },
      ])
      setMessages((prev) => {
        const newMessage = {
          id: Date.now() + Math.random(),
          sender: 'bot',
          text: llm_message.trim(),
          timestamp: new Date(),
        }
        return [...prev, newMessage]
      })
    },
    [addMessage, handleMapAction, setMessages]
  )

  // Enhanced handle user query function with high-severity analysis
  const handleUserQuery = useCallback(
    async (prompt) => {
      if (!prompt.trim()) return

      processedActionsRef.current.clear()

      addMessage('user', prompt)
      setInput('')
      setLoading(true)
      setIsTyping(true)

      const tools = [
        {
          type: 'function',
          function: {
            name: 'route-to',
            description:
              'Find the fastest driving route between two coordinates',
            parameters: {
              type: 'object',
              properties: {
                startLat: {
                  type: 'float',
                  description: 'The latitude of the starting point',
                },
                startLon: {
                  type: 'float',
                  description: 'The longitude of the starting point',
                },
                endLat: {
                  type: 'float',
                  description: 'The latitude of the destination point',
                },
                endLon: {
                  type: 'float',
                  description: 'The longitude of the destination point',
                },
              },
              required: ['startLat', 'startLon', 'endLat', 'endLon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'route-to-destination',
            description:
              'Find the fastest driving route from Dubai center to a specific destination',
            parameters: {
              type: 'object',
              properties: {
                endLat: {
                  type: 'float',
                  description: 'The latitude of the destination point',
                },
                endLon: {
                  type: 'float',
                  description: 'The longitude of the destination point',
                },
              },
              required: ['endLat', 'endLon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'population-distribution',
            description: 'View the Population Distribution heatmap on the map',
          },
        },
        {
          type: 'function',
          function: {
            name: 'create-heatmap',
            description:
              'Create a heatmap of the available incidents on the map',
          },
        },
        {
          type: 'function',
          function: {
            name: 'analyze-high-severity',
            description: 'Analyze high-severity incidents on the map',
          },
        },
        {
          type: 'function',
          function: {
            name: 'find-nearby-resources',
            description: 'Find nearby resources on the map',
            parameters: {
              type: 'object',
              properties: {
                lat: {
                  type: 'float',
                  description: 'The latitude of the location',
                },
                lon: {
                  type: 'float',
                  description: 'The longitude of the location',
                },
                resourceType: {
                  type: 'string',
                  description: 'The type of resource to find',
                  enum: ['hospital', 'school', 'shelter', 'police', 'fire'],
                  default: 'all',
                },
                radius: {
                  type: 'float',
                  description: 'The radius (in km) to search for resources',
                  default: 5.0,
                },
              },
              required: ['lat', 'lon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'find-incidents-within-radius',
            description: 'Find incidents within a specified radius on the map',
            parameters: {
              type: 'object',
              properties: {
                lat: {
                  type: 'float',
                  description: 'The latitude of the location',
                },
                lon: {
                  type: 'float',
                  description: 'The longitude of the location',
                },
                radius: {
                  type: 'float',
                  description: 'The radius (in km) to search for incidents',
                  default: 5.0,
                },
              },
              required: ['lat', 'lon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'find-crisis-within-radius',
            description:
              'Find crisis/disaster events within a specified radius on the map',
            parameters: {
              type: 'object',
              properties: {
                lat: {
                  type: 'float',
                  description: 'The latitude of the location',
                },
                lon: {
                  type: 'float',
                  description: 'The longitude of the location',
                },
                radius: {
                  type: 'float',
                  description: 'The radius (in km) to search for crisis events',
                  default: 5.0,
                },
              },
              required: ['lat', 'lon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'find-closest-spatial',
            description: 'Find the closest incidents to a given location',
            parameters: {
              type: 'object',
              properties: {
                lat: {
                  type: 'float',
                  description: 'The latitude of the location',
                },
                lon: {
                  type: 'float',
                  description: 'The longitude of the location',
                },
                limit: {
                  type: 'int',
                  description: 'The maximum number of features to return',
                  default: 5,
                },
              },
              required: ['lat', 'lon'],
            },
          },
        },
        {
          type: 'function',
          function: {
            // Something is wrong with dates
            // ⚠️ تواريخ غير صالحة. استخدم صيغة مثل 2024-12-01.
            // {endDate: '20-10-2025', startDate: '21-05-2020'}
            name: 'filter-incidents-date-range',
            description: 'Filter incidents by date range',
            parameters: {
              type: 'object',
              properties: {
                startDate: {
                  type: 'string',
                  description: 'The start date of the range (YYYY-MM-DD)',
                },
                endDate: {
                  type: 'string',
                  description: 'The end date of the range (YYYY-MM-DD)',
                },
              },
              required: ['startDate', 'endDate'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'find-closest-temporal',
            description: 'Find the closest temporal features to a given date',
            parameters: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  description:
                    'The date to search for temporal features (YYYY-MM-DD)',
                },
                limit: {
                  type: 'integer',
                  description: 'The maximum number of features to return',
                  default: 5,
                },
              },
              required: ['date'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'top-roads-by-incidents',
            description: 'Find the top roads by incidents',
            parameters: {
              type: 'object',
              properties: {
                limit: {
                  type: 'integer',
                  description: 'The maximum number of features to return',
                  default: 5,
                },
              },
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'top-incident-types',
            description: 'Find the top incident types',
            parameters: {
              type: 'object',
              properties: {
                limit: {
                  type: 'integer',
                  description: 'The maximum number of features to return',
                  default: 5,
                },
              },
            },
          },
        },
        {
          type: 'function',
          function: {
            // Couldn't test
            name: 'compare-incident-counts',
            description: 'Compare incident counts between different locations',
            parameters: {
              type: 'object',
              properties: {
                area1: {
                  type: 'string',
                  description: 'The name of the first area to compare',
                },
                area2: {
                  type: 'string',
                  description: 'The name of the second area to compare',
                },
              },
              required: ['area1', 'area2'],
            },
          },
        },
        {
          type: 'function',
          function: {
            // Somthing is not working fillters are not being applied
            name: 'filter-by-keywords',
            description: 'Filter incidents by keywords',
            parameters: {
              type: 'object',
              properties: {
                keywords: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    "The keywords to filter incidents by (eg. 'sandstorm' or 'flood')",
                },
                status: {
                  type: 'string',
                  description: 'The status of the incidents to filter',
                  enum: ['open', 'closed'],
                },
              },
              required: ['keywords'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'filter-major-roads-incidents',
            description: 'Filter incidents on major roads',
          },
        },
        {
          type: 'function',
          function: {
            name: 'show-crisis-grouped-status',
            description: 'Show the status of incidents grouped by crisis',
          },
        },
        {
          type: 'function',
          function: {
            name: 'clear',
            description: 'Clear all results and visualizations from the map',
          },
        },
      ]
      setHistory((prev) => [
        ...prev,
        {
          role: 'user',
          content: prompt,
        },
      ])
      makeLLMCall(prompt, tools).then(() => {
        setLoading(false)
        setIsTyping(false)
      })
    },
    [addMessage, makeLLMCall, setInput, setIsTyping, setLoading]
  )

  // Monitor allFeaturesData changes
  useEffect(() => {
    console.log('📈 عدد الميزات المتاحة:', allFeaturesData.length)
    if (allFeaturesData.length > 0) {
      setMapStats((prev) => ({ ...prev, features: allFeaturesData.length }))
    }
  }, [allFeaturesData])

  // Keep displayed features count in sync with activeFeatures
  useEffect(() => {
    setMapStats((prev) => ({ ...prev, features: activeFeatures }))
  }, [activeFeatures])

  // Monitor connection status
  useEffect(() => {
    console.log('🔗 حالة الاتصال:', connectionStatus)
  }, [connectionStatus])

  // Monitor data processing status
  useEffect(() => {
    console.log('⚙️ حالة معالجة البيانات:', dataProcessingStatus)
  }, [dataProcessingStatus])

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
  )
}
