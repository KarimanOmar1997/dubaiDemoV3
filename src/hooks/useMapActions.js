import { useCallback } from 'react'

export const useMapActions = ({
  mapRef,
  geoJsonLayerRef,
  highlightLayerRef,
  legendRef,
  processedActionsRef,
  addMessage,
  setActiveFeatures,
}) => {
  // Enhanced function to calculate distance between two coordinates
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }, [])

  // Helper: restrict to accident Point features from incidents file only
  const isIncidentPointFeature = useCallback((feature) => {
    if (!feature || feature?.geometry?.type !== 'Point') return false
    const source = String(feature?.sourceFile || '').toLowerCase()
    if (!source) return false

    // Check for incident-related keywords in source file name
    // The actual file is "TrafficIncidents_ExportFeatures.geojson"
    const isIncidentFile =
      source.includes('trafficincidents') ||
      source.includes('trafficincident') ||
      (source.includes('traffic') && source.includes('incident')) ||
      source.includes('accident') ||
      source.includes('حوادث') ||
      source.includes('incident') ||
      source.includes('exportfeatures') // Include this as it's part of the actual incident file name

    // Check if the feature has incident-related properties
    // Since we can't read the large incident file, we'll be more flexible
    const properties = feature.properties || {}

    // Look for any properties that might indicate this is an incident
    // Don't require specific properties since we don't know the exact structure
    const hasAnyProperties = Object.keys(properties).length > 0

    // Explicitly exclude crisis-related properties to avoid overlap
    const hasCrisisProperties =
      properties.type === 'crisis' ||
      properties.category === 'crisis' ||
      properties.crisis_type ||
      properties.disaster_type ||
      properties.crisis_level ||
      properties.crisis_status ||
      properties.crisis_date ||
      properties.disaster_date ||
      properties.crisis_category ||
      properties.name // Crisis file has "name" property

    // Return true if it's an incident file AND has properties, AND doesn't have crisis properties
    return isIncidentFile && hasAnyProperties && !hasCrisisProperties
  }, [])

  // Helper: any point feature (incidents or crisis, resources, etc.)
  const isPointFeature = useCallback((feature) => {
    return !!feature && feature.geometry?.type === 'Point'
  }, [])

  // Helper: restrict to crisis Point features only
  const isCrisisPointFeature = useCallback((feature) => {
    if (!feature || feature?.geometry?.type !== 'Point') return false
    const source = String(feature?.sourceFile || '').toLowerCase()
    if (!source) return false

    // Check for crisis-related keywords in source file name
    const isCrisisFile =
      source.includes('crisis') ||
      source.includes('disaster') ||
      source.includes('كوارث') ||
      source.includes('كارثة') ||
      source.includes('طوارئ') ||
      source.includes('emergency')

    // Check if the feature has crisis-related properties
    const properties = feature.properties || {}
    const hasCrisisProperties =
      properties.type === 'crisis' ||
      properties.category === 'crisis' ||
      properties.crisis_type ||
      properties.disaster_type ||
      properties.crisis_level ||
      properties.crisis_status ||
      properties.crisis_date ||
      properties.disaster_date ||
      properties.crisis_category ||
      properties.disaster_category

    // Return true only if it's a crisis file AND has crisis properties
    return isCrisisFile && hasCrisisProperties
  }, [])

  // 1. Update your useMapActions.js - Add this function to the hook
  const findNearbyResources = useCallback(
    async (lat, lon, data, _resourceType = 'all', radius = 5) => {
      if (!mapRef.current || !window.L || !data) {
        console.log('❌ Cannot find resources: missing map, Leaflet, or data')
        return 'Something went wrong'
      }

      const L = window.L

      try {
        // Remove existing layers
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }

        // Resource type mapping with Arabic keywords
        const resourceKeywords = {
          hospitals: {
            keywords: [
              'مستشفى',
              'hospital',
              'clinic',
              'عيادة',
              'طبي',
              'medical',
              'صحي',
              'health',
            ],
            color: '#e74c3c',
            icon: '🏥',
            name: 'المستشفيات',
          },
          schools: {
            keywords: [
              'مدرسة',
              'school',
              'جامعة',
              'university',
              'college',
              'كلية',
              'تعليم',
              'education',
            ],
            color: '#3498db',
            icon: '🏫',
            name: 'المدارس',
          },
          shelters: {
            keywords: [
              'ملجأ',
              'shelter',
              'إيواء',
              'طوارئ',
              'emergency',
              'آمن',
              'safe',
              'مأوى',
              'إخلاء',
              'نقطة إخلاء',
              'تجمع',
              'التجمع',
              'نقطة تجمع',
              'evacuation',
              'assembly',
              'gathering',
            ],
            color: '#27ae60',
            icon: '🏠',
            name: 'الملاجئ',
          },
          police: {
            keywords: ['شرطة', 'police', 'أمن', 'security', 'مخفر', 'station'],
            color: '#8e44ad',
            icon: '👮',
            name: 'مراكز الشرطة',
          },
          fire: {
            keywords: ['إطفاء', 'fire', 'حريق', 'إنقاذ', 'rescue', 'دفاع مدني'],
            color: '#f39c12',
            icon: '🚒',
            name: 'مراكز الإطفاء',
          },
        }

        // Filter resources by type and proximity
        const { foundResources, allResources } = data

        if (allResources.length === 0) {
          const retMessage = `❌ لم يتم العثور على موارد في نطاق ${radius} كم من الموقع المحدد`
          return retMessage
        }

        // Create markers for each resource type
        const markersGroup = L.layerGroup()

        Object.entries(foundResources).forEach(([type, resources]) => {
          if (resources.length === 0) return

          const config = resourceKeywords[type]

          resources.forEach((resource, _index) => {
            const [resLat, resLon] = resource.coordinates

            // Create custom marker
            const marker = L.circleMarker([resLat, resLon], {
              radius: 10,
              fillColor: config.color,
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.8,
              className: `resource-marker ${type}`,
            })

            // Create detailed popup
            const props = resource.properties
            const popupContent = `
          <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; min-width: 250px;">
            <h4 style="margin: 0 0 10px 0; color: ${config.color}; font-size: 14px; text-align: center;">
              ${config.icon} ${config.name}
            </h4>
            <div style="font-size: 12px; line-height: 1.4;">
              ${`<strong>الاسم:</strong> ${props.name || props.Name || props.COMM_NAME_AR || 'غير محدد'}<br>`}
              ${
                props.address || props.Address || props.location
                  ? `<strong>العنوان:</strong> ${props.address || props.Address || props.location}<br>`
                  : ''
              }
              ${
                props.Type_Ar || props.type || props.category
                  ? `<strong>النوع:</strong> ${props.Type_Ar || props.type || props.category}<br>`
                  : ''
              }
              <strong>المسافة:</strong> ${resource.distance.toFixed(2)} كم<br>
              ${
                props.phone || props.Phone
                  ? `<strong>الهاتف:</strong> ${props.phone || props.Phone}<br>`
                  : ''
              }
              ${
                props.hours || props.working_hours
                  ? `<strong>ساعات العمل:</strong> ${props.hours || props.working_hours}<br>`
                  : ''
              }
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; font-size: 10px; color: #666; text-align: center;">
              الإحداثيات: ${resLat.toFixed(6)}, ${resLon.toFixed(6)}
            </div>
          </div>
        `

            marker.bindPopup(popupContent, {
              maxWidth: 300,
              className: 'resource-popup',
            })

            // Add hover effects
            marker.on('mouseover', function (_e) {
              this.setStyle({
                radius: 12,
                weight: 3,
              })
            })

            marker.on('mouseout', function (_e) {
              this.setStyle({
                radius: 10,
                weight: 2,
              })
            })

            markersGroup.addLayer(marker)
          })
        })

        // Add query location marker
        const queryMarker = L.circleMarker([lat, lon], {
          radius: 8,
          fillColor: '#000000',
          color: '#ffffff',
          weight: 3,
          opacity: 1,
          fillOpacity: 1,
          className: 'query-location-marker',
        })

        queryMarker.bindPopup(`
      <div style="text-align: center; font-family: Arial;">
        <strong>📍 موقع البحث</strong><br>
        <small>${lat.toFixed(6)}, ${lon.toFixed(6)}</small>
      </div>
    `)

        markersGroup.addLayer(queryMarker)

        // Add to map
        highlightLayerRef.current = markersGroup
        markersGroup.addTo(mapRef.current)

        // Create legend
        const legend = L.control({ position: 'bottomright' })
        legend.onAdd = () => {
          const div = L.DomUtil.create('div', 'resources-legend')
          div.style.cssText = `
        background: white;
        padding: 12px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-size: 12px;
        line-height: 1.5;
        max-width: 250px;
        border: 2px solid #3498db;
      `

          let legendContent = `
        <div style="font-weight: bold; margin-bottom: 10px; text-align: center; color: #3498db; font-size: 14px;">
          🗺️ الموارد المتاحة (${radius} كم)
        </div>
      `

          Object.entries(foundResources).forEach(([type, resources]) => {
            if (resources.length > 0) {
              const config = resourceKeywords[type]
              legendContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 10px; height: 10px; background: ${config.color}; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
              <span>${config.icon} ${config.name} (${resources.length})</span>
            </div>
          `
            }
          })

          legendContent += `
        <div style="display: flex; align-items: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
          <div style="width: 8px; height: 8px; background: #000000; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
          <span>📍 موقع البحث</span>
        </div>
        <div style="font-size: 10px; color: #666; margin-top: 8px; text-align: center;">
          إجمالي الموارد: ${allResources.length}
        </div>
      `

          div.innerHTML = legendContent
          return div
        }

        if (legendRef.current) {
          mapRef.current.removeControl(legendRef.current)
        }
        legendRef.current = legend
        legend.addTo(mapRef.current)

        setActiveFeatures(allResources.length + 1) // +1 for query marker

        // Generate summary report
        let summaryReport = `🗺️ **تم العثور على ${allResources.length} مورد في نطاق ${radius} كم:**\n\n`

        Object.entries(foundResources).forEach(([type, resources]) => {
          if (resources.length > 0) {
            const config = resourceKeywords[type]
            summaryReport += `${config.icon} **${config.name}** (${resources.length}):\n`

            resources.slice(0, 3).forEach((resource, index) => {
              const props = resource.properties
              const name =
                props.name ||
                props.Name ||
                props.COMM_NAME_AR ||
                `${config.name.slice(0, -1)} ${index + 1}`
              summaryReport += `   ${index + 1}. ${name} - ${resource.distance.toFixed(2)} كم\n`
            })

            if (resources.length > 3) {
              summaryReport += `   ... و ${resources.length - 3} موارد أخرى\n`
            }
            summaryReport += '\n'
          }
        })

        summaryReport += `💡 انقر على العلامات للحصول على التفاصيل الكاملة.`

        addMessage('bot', summaryReport)

        console.log('✅ Resources search completed')
        return summaryReport
      } catch (error) {
        console.error('Failed to find nearby resources:', error)
        const retMessage = `❌ فشل في البحث عن الموارد: ${error.message}`
        return retMessage
      }
    },
    [
      mapRef,
      geoJsonLayerRef,
      highlightLayerRef,
      legendRef,
      setActiveFeatures,
      addMessage,
    ]
  )

  // Enhanced function to parse dates from various formats
  const parseDate = useCallback((dateStr) => {
    if (!dateStr) return null

    try {
      // If it's a timestamp
      if (typeof dateStr === 'number') {
        return new Date(dateStr)
      }

      const date = new Date(dateStr)
      if (!Number.isNaN(date.getTime())) {
        return date
      }
    } catch (_e) {
      console.warn('Could not parse date:', dateStr)
    }
    return null
  }, [])

  // NEW: Geographic clustering for high-severity analysis
  const performGeographicClustering = useCallback((incidents) => {
    const gridSize = 0.008 // Smaller grid for more precise clustering (~800m)
    const clusters = {}

    incidents.forEach((feature) => {
      let lat = null,
        lon = null

      if (feature.geometry) {
        switch (feature.geometry.type) {
          case 'Point':
            ;[lon, lat] = feature.geometry.coordinates
            break
          case 'Polygon': {
            const coords = feature.geometry.coordinates[0]
            lat =
              coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length
            lon =
              coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length
            break
          }
          default:
            console.warn('Unknown geometry type:', feature.geometry.type)
            break
        }
      }

      if (lat !== null && lon !== null) {
        const gridLat = Math.floor(lat / gridSize) * gridSize
        const gridLon = Math.floor(lon / gridSize) * gridSize
        const key = `${gridLat},${gridLon}`

        if (!clusters[key]) {
          clusters[key] = {
            count: 0,
            fatalCount: 0,
            severeCount: 0,
            lat: gridLat,
            lon: gridLon,
            incidents: [],
            areas: new Set(),
          }
        }

        clusters[key].count++
        clusters[key].incidents.push(feature)

        const props = feature.properties || {}
        const severity = (props.Severity_Ar || '').toLowerCase()
        const type = (props.Type_Ar || '').toLowerCase()

        if (
          severity.includes('قاتل') ||
          type.includes('وفاة') ||
          type.includes('قتل')
        ) {
          clusters[key].fatalCount++
        } else if (severity.includes('شديد') || severity.includes('خطير')) {
          clusters[key].severeCount++
        }

        // Track area names
        if (props.COMM_NAME_AR) {
          clusters[key].areas.add(props.COMM_NAME_AR)
        }
      }
    })

    return Object.values(clusters).sort(
      (a, b) =>
        b.fatalCount * 3 +
        b.severeCount * 2 +
        b.count -
        (a.fatalCount * 3 + a.severeCount * 2 + a.count)
    )
  }, [])

  // NEW: Generate safety recommendations
  const generateSafetyRecommendations = useCallback(
    (clusters, severityStats) => {
      const recommendations = []

      if (severityStats.fatal > 0) {
        recommendations.push('🚑 تكثيف دوريات الإسعاف في المناطق الحمراء')
      }

      if (clusters.length > 0 && clusters[0].count > 5) {
        recommendations.push('🚦 مراجعة إشارات المرور في المناطق عالية التركز')
      }

      if (severityStats.severe > severityStats.fatal * 2) {
        recommendations.push('🏥 تحسين أوقات استجابة الطوارئ')
      }

      recommendations.push('📈 تطبيق حملات توعية مرورية مكثفة')
      recommendations.push('🛣️ فحص حالة الطرق في المناطق الخطرة')

      return recommendations
        .slice(0, 4)
        .map((rec, i) => `${i + 1}. ${rec}`)
        .join('\n')
    },
    []
  )

  // NEW: Generate detailed severity analysis report
  const generateSeverityAnalysisReport = useCallback(
    (clusters, incidents) => {
      // Top dangerous areas
      const topAreas = clusters.slice(0, 5).map((cluster, index) => {
        const areaNames = Array.from(cluster.areas).slice(0, 2).join('، ')
        const riskScore =
          cluster.fatalCount * 3 + cluster.severeCount * 2 + cluster.count
        return `${index + 1}. منطقة (${cluster.lat.toFixed(
          3
        )}, ${cluster.lon.toFixed(3)})\n   📍 ${
          areaNames || 'منطقة غير محددة'
        }\n   💀 حوادث قاتلة: ${cluster.fatalCount}\n   🚨 حوادث شديدة: ${
          cluster.severeCount
        }\n   📊 نقاط الخطر: ${riskScore}`
      })

      // Severity distribution analysis
      const severityStats = incidents.reduce(
        (acc, incident) => {
          const props = incident.properties
          const severity = (props.Severity_Ar || '').toLowerCase()
          const type = (props.Type_Ar || '').toLowerCase()

          if (severity.includes('قاتل') || type.includes('وفاة')) {
            acc.fatal++
          } else if (severity.includes('شديد')) {
            acc.severe++
          } else if (severity.includes('خطير')) {
            acc.dangerous++
          } else {
            acc.other++
          }
          return acc
        },
        { fatal: 0, severe: 0, dangerous: 0, other: 0 }
      )

      const severityDistribution = [
        `• الحوادث القاتلة: ${severityStats.fatal} (${(
          (severityStats.fatal / incidents.length) * 100
        ).toFixed(1)}%)`,
        `• الإصابات الشديدة: ${severityStats.severe} (${(
          (severityStats.severe / incidents.length) * 100
        ).toFixed(1)}%)`,
        `• الحوادث الخطيرة: ${severityStats.dangerous} (${(
          (severityStats.dangerous / incidents.length) * 100
        ).toFixed(1)}%)`,
        `• أخرى: ${severityStats.other} (${(
          (severityStats.other / incidents.length) * 100
        ).toFixed(1)}%)`,
      ].join('\n')

      // Generate recommendations based on analysis
      const recommendations = generateSafetyRecommendations(
        clusters,
        severityStats
      )

      return {
        topDangerousAreas:
          topAreas.length > 0
            ? topAreas.join('\n\n')
            : 'لا توجد مناطق عالية الخطورة',
        severityDistribution,
        recommendations,
      }
    },
    [generateSafetyRecommendations]
  )
  // NEW: Analyze high-severity incidents and their geographic distribution
  const analyzeHighSeverityIncidents = useCallback(
    async (data) => {
      if (!mapRef.current || !window.L) {
        const retMessage = '❌ Cannot analyze: missing map, Leaflet, or data'
        console.log(retMessage)
        return retMessage
      }

      const L = window.L

      try {
        // Remove existing layers
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }
        const { highSeverityIncidents } = data
        console.log(
          `🔥 Found ${highSeverityIncidents.length} high-severity incidents`
        )

        if (highSeverityIncidents.length === 0) {
          const retMessage =
            '⚠️ لم يتم العثور على حوادث ذات خطورة عالية في البيانات المحملة'
          return retMessage
        }

        // Geographic clustering analysis
        const clusters = performGeographicClustering(highSeverityIncidents)

        // Create individual markers for high-severity incidents
        const processedIncidents = []
        const markersGroup = L.layerGroup()

        highSeverityIncidents.forEach((feature, _index) => {
          let lat = null,
            lon = null

          if (feature.geometry?.type === 'Point') {
            ;[lon, lat] = feature.geometry.coordinates
          }

          if (lat !== null && lon !== null) {
            const props = feature.properties || {}

            // Determine severity level and marker style
            let severityLevel = 'moderate'
            let markerColor = '#ff9800'
            let markerSize = 8

            if (
              (props.Severity_Ar || '').toLowerCase().includes('قاتل') ||
              (props.Type_Ar || '').toLowerCase().includes('وفاة')
            ) {
              severityLevel = 'fatal'
              markerColor = '#b71c1c'
              markerSize = 12
            } else if (
              (props.Severity_Ar || '').toLowerCase().includes('شديد')
            ) {
              severityLevel = 'severe'
              markerColor = '#d32f2f'
              markerSize = 10
            } else if (
              (props.Severity_Ar || '').toLowerCase().includes('خطير')
            ) {
              severityLevel = 'serious'
              markerColor = '#f44336'
              markerSize = 9
            }

            // Create custom marker
            const marker = L.circleMarker([lat, lon], {
              radius: markerSize,
              fillColor: markerColor,
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.8,
              className: `severity-marker ${severityLevel}`,
            })

            // Create popup with incident details
            const popupContent = `
          <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
            <h4 style="margin: 0 0 10px 0; color: ${markerColor}; font-size: 14px;">
              🚨 حادث عالي الخطورة
            </h4>
            <div style="font-size: 12px; line-height: 1.4;">
              <strong>النوع:</strong> ${
                props.Type_Ar || props.Type || 'غير محدد'
              }<br>
              <strong>الخطورة:</strong> ${
                props.Severity_Ar || props.Severity || 'غير محدد'
              }<br>
              ${
                props.Acc_Name
                  ? `<strong>اسم الحادث:</strong> ${props.Acc_Name}<br>`
                  : ''
              }
              ${
                props.Location
                  ? `<strong>الموقع:</strong> ${props.Location}<br>`
                  : ''
              }
              ${props.Date ? `<strong>التاريخ:</strong> ${props.Date}<br>` : ''}
              ${props.Time ? `<strong>الوقت:</strong> ${props.Time}<br>` : ''}
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; font-size: 10px; color: #666;">
              الإحداثيات: ${lat.toFixed(6)}, ${lon.toFixed(6)}
            </div>
          </div>
        `

            marker.bindPopup(popupContent, {
              maxWidth: 300,
              className: 'severity-popup',
            })

            // Add hover effects
            marker.on('mouseover', function (_e) {
              this.setStyle({
                radius: markerSize + 2,
                weight: 3,
              })
            })

            marker.on('mouseout', function (_e) {
              this.setStyle({
                radius: markerSize,
                weight: 2,
              })
            })

            markersGroup.addLayer(marker)

            processedIncidents.push({
              feature,
              coordinates: [lat, lon],
              severityLevel,
              properties: props,
              marker,
            })
          }
        })

        // Add markers group to map
        highlightLayerRef.current = markersGroup
        markersGroup.addTo(mapRef.current)

        // Create detailed legend for severity analysis
        const legend = L.control({ position: 'bottomright' })
        legend.onAdd = () => {
          const div = L.DomUtil.create('div', 'severity-legend')
          div.style.cssText = `
        background: white;
        padding: 12px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-size: 12px;
        line-height: 1.5;
        max-width: 250px;
        border: 2px solid #d32f2f;
      `

          div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px; text-align: center; color: #d32f2f; font-size: 14px;">
          🚨 تحليل الحوادث عالية الخطورة
        </div>
        <div style="margin-bottom: 8px;">
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; background: #b71c1c; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
            <span>حوادث قاتلة (${
              processedIncidents.filter((i) => i.severityLevel === 'fatal')
                .length
            })</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 10px; height: 10px; background: #d32f2f; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
            <span>إصابات شديدة (${
              processedIncidents.filter((i) => i.severityLevel === 'severe')
                .length
            })</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 9px; height: 9px; background: #f44336; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
            <span>حوادث خطيرة (${
              processedIncidents.filter((i) => i.severityLevel === 'serious')
                .length
            })</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 8px; height: 8px; background: #ff9800; border-radius: 50%; margin-left: 6px; border: 2px solid white;"></div>
            <span>خطورة متوسطة-عالية (${
              processedIncidents.filter((i) => i.severityLevel === 'moderate')
                .length
            })</span>
          </div>
        </div>
        <div style="font-size: 10px; color: #666; margin-top: 10px; text-align: center; border-top: 1px solid #eee; padding-top: 8px;">
          إجمالي الحوادث: ${processedIncidents.length}
        </div>
      `
          return div
        }

        if (legendRef.current) {
          mapRef.current.removeControl(legendRef.current)
        }
        legendRef.current = legend
        legend.addTo(mapRef.current)

        setActiveFeatures(processedIncidents.length)

        // Generate detailed analysis report
        const analysisReport = generateSeverityAnalysisReport(
          clusters,
          processedIncidents
        )

        console.log('✅ High-severity analysis completed')

        const retMessage = `🚨 **تحليل الحوادث عالية الخطورة مكتمل!**\n\n📊 **الإحصائيات:**\n• إجمالي الحوادث عالية الخطورة: ${
          highSeverityIncidents.length
        }\n\n🔴 **توزيع حسب الخطورة:**\n• قاتلة: ${
          processedIncidents.filter((i) => i.severityLevel === 'fatal').length
        }\n• شديدة: ${
          processedIncidents.filter((i) => i.severityLevel === 'severe').length
        }\n• خطيرة: ${
          processedIncidents.filter((i) => i.severityLevel === 'serious').length
        }\n• متوسطة-عالية: ${
          processedIncidents.filter((i) => i.severityLevel === 'moderate')
            .length
        }\n\n🏆 **أكثر المناطق خطورة:**\n${
          analysisReport.topDangerousAreas
        }\n\n📈 **توزيع أنواع الحوادث:**\n${
          analysisReport.severityDistribution
        }\n\n🎯 **التوصيات:**\n${
          analysisReport.recommendations
        }\n\n💡 انقر على النقاط للحصول على تفاصيل كل حادث.`
        return retMessage
      } catch (error) {
        console.error('Failed to analyze high-severity incidents:', error)
        const retMessage = `❌ فشل في تحليل الحوادث عالية الخطورة: ${error.message}`
        return retMessage
      }
    },
    [
      mapRef,
      geoJsonLayerRef,
      highlightLayerRef,
      legendRef,
      setActiveFeatures,
      generateSeverityAnalysisReport,
      performGeographicClustering,
    ]
  )

  // Create and display fastest driving route between two points using OSRM
  const routeBetweenPoints = useCallback(
    async (startLat, startLon, endLat, endLon) => {
      if (!mapRef.current || !window.L) {
        const retMessage = '⚠️ تعذر إنشاء المسار: الخريطة غير جاهزة'
        return retMessage
      }

      const L = window.L
      try {
        // Clear existing overlays
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }
        if (legendRef.current) {
          mapRef.current.removeControl(legendRef.current)
          legendRef.current = null
        }

        // Validate coordinates
        if (
          Number.isNaN(startLat) ||
          Number.isNaN(startLon) ||
          Number.isNaN(endLat) ||
          Number.isNaN(endLon)
        ) {
          const retMessage =
            '⚠️ إحداثيات غير صحيحة. يرجى التحقق من القيم المقدمة.'
          return retMessage
        }

        // Check if coordinates are within reasonable bounds (Dubai area)
        if (
          startLat < 24.5 ||
          startLat > 26.0 ||
          startLon < 54.5 ||
          startLon > 56.5 ||
          endLat < 24.5 ||
          endLat > 26.0 ||
          endLon < 54.5 ||
          endLon > 56.5
        ) {
          const retMessage =
            '⚠️ الإحداثيات خارج نطاق دبي. يرجى التأكد من أن جميع الإحداثيات تقع في منطقة دبي.'
          return retMessage
        }

        const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`

        // Add timeout to the fetch request
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        try {
          const res = await fetch(url, { signal: controller.signal })
          clearTimeout(timeoutId)

          if (!res.ok) {
            if (res.status === 429) {
              throw new Error(
                'تم تجاوز حد الطلبات. يرجى المحاولة مرة أخرى لاحقاً.'
              )
            } else if (res.status === 400) {
              throw new Error(
                'إحداثيات غير صحيحة. يرجى التحقق من الإحداثيات المقدمة.'
              )
            } else {
              throw new Error(`فشل طلب خدمة المسارات (${res.status})`)
            }
          }

          const data = await res.json()
          if (!data.routes || data.routes.length === 0) {
            const retMessage =
              '⚠️ لم يتم العثور على مسار مناسب بين النقطتين. قد تكون الإحداثيات خارج نطاق الخدمة.'
            return retMessage
          }

          const best = data.routes[0]
          const coords = best.geometry.coordinates.map(([lon, lat]) => [
            lat,
            lon,
          ])
          const distanceKm = best.distance / 1000
          const durationMin = best.duration / 60

          const startMarker = L.circleMarker([startLat, startLon], {
            radius: 7,
            fillColor: '#2e7d32',
            color: '#fff',
            weight: 2,
            fillOpacity: 1,
          }).bindPopup('نقطة الانطلاق')

          const endMarker = L.circleMarker([endLat, endLon], {
            radius: 7,
            fillColor: '#b71c1c',
            color: '#fff',
            weight: 2,
            fillOpacity: 1,
          }).bindPopup('الوجهة')

          const routeLine = L.polyline(coords, {
            color: '#1976d2',
            weight: 6,
            opacity: 0.9,
          })

          // Create legend
          const legend = L.control({ position: 'bottomright' })
          legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend')
            div.innerHTML = `
            <h4>المسار</h4>
            <div><i style="background: #2e7d32"></i> نقطة الانطلاق</div>
            <div><i style="background: #b71c1c"></i> الوجهة</div>
            <div><i style="background: #1976d2"></i> المسار</div>
            <div><strong>المسافة:</strong> ${distanceKm.toFixed(2)} كم</div>
            <div><strong>الزمن:</strong> ${durationMin.toFixed(0)} دقيقة</div>
          `
            return div
          }

          const group = L.layerGroup([routeLine, startMarker, endMarker])
          highlightLayerRef.current = group
          legendRef.current = legend

          group.addTo(mapRef.current)
          legend.addTo(mapRef.current)

          mapRef.current.fitBounds(routeLine.getBounds(), { padding: [30, 30] })
          setActiveFeatures(2) // start + end markers; route is supporting line

          const retMessage = `🛣️ تم إنشاء أسرع مسار.

📍 نقطة الانطلاق: (${startLat.toFixed(6)}, ${startLon.toFixed(6)})
🎯 الوجهة: (${endLat.toFixed(6)}, ${endLon.toFixed(6)})
📏 المسافة: ${distanceKm.toFixed(2)} كم
⏱️ الزمن التقريبي: ${durationMin.toFixed(0)} دقيقة

تم عرض المسار على الخريطة مع علامات توضيحية.`
          return retMessage
        } catch (fetchError) {
          clearTimeout(timeoutId)
          if (fetchError.name === 'AbortError') {
            throw new Error('انتهت مهلة طلب المسار. يرجى المحاولة مرة أخرى.')
          }
          throw fetchError
        }
      } catch (error) {
        console.error('Routing failed:', error)
        const retMessage = `❌ فشل في حساب المسار: ${error.message}`
        return retMessage
      }
    },
    [mapRef, geoJsonLayerRef, highlightLayerRef, legendRef, setActiveFeatures]
  )

  // Route from Dubai center to a specific destination
  const routeToDestination = useCallback(
    async (endLat, endLon, startLat = 25.267078, startLon = 55.293646) => {
      if (!mapRef.current || !window.L) {
        const retMessage = '⚠️ تعذر إنشاء المسار: الخريطة غير جاهزة'
        return retMessage
      }

      const L = window.L
      try {
        // Clear existing overlays
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }
        if (legendRef.current) {
          mapRef.current.removeControl(legendRef.current)
          legendRef.current = null
        }

        // Validate coordinates
        if (
          Number.isNaN(startLat) ||
          Number.isNaN(startLon) ||
          Number.isNaN(endLat) ||
          Number.isNaN(endLon)
        ) {
          const retMessage =
            '⚠️ إحداثيات غير صحيحة. يرجى التحقق من القيم المقدمة.'
          return retMessage
        }

        // Check if coordinates are within reasonable bounds (Dubai area)
        if (
          startLat < 24.5 ||
          startLat > 26.0 ||
          startLon < 54.5 ||
          startLon > 56.5 ||
          endLat < 24.5 ||
          endLat > 26.0 ||
          endLon < 54.5 ||
          endLon > 56.5
        ) {
          const retMessage =
            '⚠️ الإحداثيات خارج نطاق دبي. يرجى التأكد من أن جميع الإحداثيات تقع في منطقة دبي.'
          return retMessage
        }

        const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`

        // Add timeout to the fetch request
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        try {
          const res = await fetch(url, { signal: controller.signal })
          clearTimeout(timeoutId)

          if (!res.ok) {
            if (res.status === 429) {
              throw new Error(
                'تم تجاوز حد الطلبات. يرجى المحاولة مرة أخرى لاحقاً.'
              )
            } else if (res.status === 400) {
              throw new Error(
                'إحداثيات غير صحيحة. يرجى التحقق من الإحداثيات المقدمة.'
              )
            } else {
              throw new Error(`فشل طلب خدمة المسارات (${res.status})`)
            }
          }

          const data = await res.json()
          if (!data.routes || data.routes.length === 0) {
            const retMessage =
              '⚠️ لم يتم العثور على مسار مناسب بين النقطتين. قد تكون الإحداثيات خارج نطاق الخدمة.'
            return retMessage
          }

          const best = data.routes[0]
          const coords = best.geometry.coordinates.map(([lon, lat]) => [
            lat,
            lon,
          ])
          const distanceKm = best.distance / 1000
          const durationMin = best.duration / 60

          const startMarker = L.circleMarker([startLat, startLon], {
            radius: 7,
            fillColor: '#2e7d32',
            color: '#fff',
            weight: 2,
            fillOpacity: 1,
          }).bindPopup('مركز دبي (نقطة الانطلاق)')

          const endMarker = L.circleMarker([endLat, endLon], {
            radius: 7,
            fillColor: '#b71c1c',
            color: '#fff',
            weight: 2,
            fillOpacity: 1,
          }).bindPopup('الوجهة')

          const routeLine = L.polyline(coords, {
            color: '#1976d2',
            weight: 6,
            opacity: 0.9,
          })

          // Create legend
          const legend = L.control({ position: 'bottomright' })
          legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend')
            div.innerHTML = `
              <h4>المسار</h4>
              <div><i style="background: #2e7d32"></i> نقطة الانطلاق (مركز دبي)</div>
              <div><i style="background: #b71c1c"></i> الوجهة</div>
              <div><i style="background: #1976d2"></i> المسار</div>
              <div><strong>المسافة:</strong> ${distanceKm.toFixed(2)} كم</div>
              <div><strong>الزمن:</strong> ${durationMin.toFixed(0)} دقيقة</div>
            `
            return div
          }

          const group = L.layerGroup([routeLine, startMarker, endMarker])
          highlightLayerRef.current = group
          legendRef.current = legend

          group.addTo(mapRef.current)
          legend.addTo(mapRef.current)

          mapRef.current.fitBounds(routeLine.getBounds(), { padding: [30, 30] })
          setActiveFeatures(2) // start + end markers; route is supporting line

          const retMessage = `🛣️ تم إنشاء أسرع مسار من مركز دبي إلى الوجهة المطلوبة.

📍 نقطة الانطلاق: مركز دبي (${startLat.toFixed(6)}, ${startLon.toFixed(6)})
🎯 الوجهة: (${endLat.toFixed(6)}, ${endLon.toFixed(6)})
📏 المسافة: ${distanceKm.toFixed(2)} كم
⏱️ الزمن التقريبي: ${durationMin.toFixed(0)} دقيقة

تم عرض المسار على الخريطة مع علامات توضيحية.`
          return retMessage
        } catch (fetchError) {
          clearTimeout(timeoutId)
          if (fetchError.name === 'AbortError') {
            throw new Error('انتهت مهلة طلب المسار. يرجى المحاولة مرة أخرى.')
          }
          throw fetchError
        }
      } catch (error) {
        console.error('Routing failed:', error)
        const retMessage = `❌ فشل في حساب المسار: ${error.message}`
        return retMessage
      }
    },
    [mapRef, geoJsonLayerRef, highlightLayerRef, legendRef, setActiveFeatures]
  )

  // Analyze density clusters
  const analyzeDensityClusters = useCallback((heatmapData) => {
    const gridSize = 0.01 // Approximately 1km grid
    const clusters = {}

    heatmapData.forEach(([lat, lon, weight]) => {
      const gridLat = Math.floor(lat / gridSize) * gridSize
      const gridLon = Math.floor(lon / gridSize) * gridSize
      const key = `${gridLat},${gridLon}`

      if (!clusters[key]) {
        clusters[key] = {
          count: 0,
          totalWeight: 0,
          lat: gridLat,
          lon: gridLon,
        }
      }
      clusters[key].count++
      clusters[key].totalWeight += weight
    })

    const clusterArray = Object.values(clusters)
    const sortedClusters = clusterArray.sort(
      (a, b) => b.totalWeight - a.totalWeight
    )

    const highDensityAreas = sortedClusters.filter(
      (cluster) => cluster.count >= 5
    ).length
    const averageDensity =
      clusterArray.reduce((sum, cluster) => sum + cluster.count, 0) /
      clusterArray.length

    const topAreas = sortedClusters
      .slice(0, 3)
      .map(
        (cluster, index) =>
          `${index + 1}. منطقة (${cluster.lat.toFixed(
            3
          )}, ${cluster.lon.toFixed(3)}) - ${cluster.count} حوادث`
      )

    return {
      highDensityAreas,
      averageDensity,
      topAreas:
        topAreas.length > 0 ? topAreas : ['لا توجد مناطق عالية الكثافة'],
    }
  }, [])

  // Enhanced function to create heatmap visualization
  const createHeatmap = useCallback(
    async (_intensity = 0.5, radius = 25, data) => {
      if (!mapRef.current || !window.L) {
        const retMessage =
          '❌ Cannot create heatmap: missing map, Leaflet, or data'
        console.log(retMessage)
        return retMessage
      }

      const L = window.L

      try {
        // Remove existing layers
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }

        // Load heatmap plugin if not available
        if (!L.heatLayer) {
          console.log('📄 Loading heatmap plugin...')
          addMessage('bot', '📄 جاري تحميل مكون الخريطة الحرارية...', {
            type: 'system',
          })

          const script = document.createElement('script')
          script.src =
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js'

          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        const { heatmapData, validIncidents } = data

        console.log(
          `🔥 Creating heatmap with ${heatmapData.length} data points`
        )

        if (heatmapData.length === 0) {
          const retMessage = '⚠️ لا توجد بيانات صالحة لإنشاء الخريطة الحرارية'
          return retMessage
        }

        // Create heatmap layer
        const heatmapLayer = L.heatLayer(heatmapData, {
          radius: radius,
          blur: 15,
          maxZoom: 18,
          max: 1.0,
          gradient: {
            0.4: 'blue',
            0.65: 'lime',
            0.8: 'yellow',
            0.95: 'orange',
            1.0: 'red',
          },
        })

        // Store as highlight layer for consistency with other functions
        highlightLayerRef.current = heatmapLayer
        heatmapLayer.addTo(mapRef.current)

        // Create legend for heatmap
        const legend = L.control({ position: 'bottomright' })
        legend.onAdd = () => {
          const div = L.DomUtil.create('div', 'heatmap-legend')
          div.style.cssText = `
          background: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-size: 12px;
          line-height: 1.4;
          max-width: 200px;
        `

          div.innerHTML = `
          <div style="font-weight: bold; margin-bottom: 8px; text-align: center; color: #333;">
            🔥 خريطة الكثافة
          </div>
          <div style="margin-bottom: 6px;">
            <div style="display: flex; align-items: center; margin-bottom: 3px;">
              <div style="width: 12px; height: 12px; background: red; border-radius: 50%; margin-left: 5px;"></div>
              <span>كثافة عالية جداً</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 3px;">
              <div style="width: 12px; height: 12px; background: orange; border-radius: 50%; margin-left: 5px;"></div>
              <span>كثافة عالية</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 3px;">
              <div style="width: 12px; height: 12px; background: yellow; border-radius: 50%; margin-left: 5px;"></div>
              <span>كثافة متوسطة</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 3px;">
              <div style="width: 12px; height: 12px; background: lime; border-radius: 50%; margin-left: 5px;"></div>
              <span>كثافة منخفضة</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 12px; height: 12px; background: blue; border-radius: 50%; margin-left: 5px;"></div>
              <span>كثافة قليلة</span>
            </div>
          </div>
          <div style="font-size: 10px; color: #666; margin-top: 8px; text-align: center; border-top: 1px solid #eee; padding-top: 6px;">
            إجمالي النقاط: ${heatmapData.length}
          </div>
        `
          return div
        }

        if (legendRef.current) {
          mapRef.current.removeControl(legendRef.current)
        }
        legendRef.current = legend
        legend.addTo(mapRef.current)

        setActiveFeatures(validIncidents.length)

        // Analyze density clusters
        const densityAnalysis = analyzeDensityClusters(heatmapData)

        console.log('✅ Heatmap created successfully')

        const summaryMessage = `🔥 تم إنشاء الخريطة الحرارية بنجاح!\n\n📊 **تحليل الكثافة:**\n• إجمالي النقاط: ${
          heatmapData.length
        }\n• المناطق عالية الكثافة: ${
          densityAnalysis.highDensityAreas
        }\n• متوسط الكثافة: ${densityAnalysis.averageDensity.toFixed(
          2
        )}\n\n🎯 **المناطق الأكثر تركزاً:**\n${densityAnalysis.topAreas.join(
          '\n'
        )}`

        return summaryMessage
      } catch (error) {
        console.error('Failed to create heatmap:', error)
        const retMessage = `❌ فشل في إنشاء الخريطة الحرارية: ${error.message}`
        return retMessage
      }
    },
    [
      mapRef,
      geoJsonLayerRef,
      highlightLayerRef,
      legendRef,
      setActiveFeatures,
      addMessage,
      analyzeDensityClusters,
    ]
  )

  // Population distribution visualization (heatmap or choropleth)
  const showPopulationDistribution = useCallback(
    async (data) => {
      if (!mapRef.current || !window.L) {
        const retMessage = '⚠️ لا توجد بيانات كافية لعرض توزيع السكان'
        return retMessage
      }

      const L = window.L
      try {
        if (geoJsonLayerRef.current) {
          mapRef.current.removeLayer(geoJsonLayerRef.current)
          geoJsonLayerRef.current = null
        }
        if (highlightLayerRef.current) {
          mapRef.current.removeLayer(highlightLayerRef.current)
          highlightLayerRef.current = null
        }

        // Try to detect population-related fields
        const populationFieldCandidates = [
          'population',
          'pop',
          'pop_total',
          'total_pop',
          'tot_pop',
          'سكان',
          'عدد_السكان',
          'الكثافة',
          'density',
        ]

        const detectPopulationValue = (props) => {
          if (!props) return null
          let val = null
          for (const key of Object.keys(props)) {
            const norm = String(key).toLowerCase()
            if (populationFieldCandidates.some((f) => norm.includes(f))) {
              const raw = props[key]
              const num =
                typeof raw === 'number'
                  ? raw
                  : parseFloat(String(raw).replace(/[,\s]/g, ''))
              if (!Number.isNaN(num) && Number.isFinite(num)) {
                val = num
                break
              }
            }
          }
          return val
        }

        // Collect centroids and weights
        const { heatmapData, polygonFeatures, hasPolygonsWithPopulation } = data

        if (heatmapData.length === 0) {
          const retMessage = '⚠️ لم أجد حقولاً تدل على عدد السكان في البيانات'
          return retMessage
        }

        // If polygons have population values, prefer choropleth; else heatmap
        if (hasPolygonsWithPopulation && polygonFeatures.length > 0) {
          // Compute breaks
          const values = polygonFeatures
            .map((f) => detectPopulationValue(f.properties || {}))
            .filter((v) => v != null)
            .sort((a, b) => a - b)
          const q = (p) => values[Math.floor((values.length - 1) * p)]
          const breaks = [q(0.1), q(0.3), q(0.5), q(0.7), q(0.9)].map(
            (v) => v || 0
          )
          const colors = ['#e3f2fd', '#90caf9', '#42a5f5', '#1e88e5', '#0d47a1']

          const styleFn = (feature) => {
            const val = detectPopulationValue(feature.properties || {})
            let color = colors[0]
            if (val >= breaks[4]) color = colors[4]
            else if (val >= breaks[3]) color = colors[3]
            else if (val >= breaks[2]) color = colors[2]
            else if (val >= breaks[1]) color = colors[1]
            return {
              color: '#ffffff',
              weight: 1,
              fillColor: color,
              fillOpacity: 0.7,
            }
          }

          const fc = {
            type: 'FeatureCollection',
            features: polygonFeatures,
          }
          const layer = L.geoJSON(fc, {
            style: styleFn,
            onEachFeature: (feature, layer) => {
              const val = detectPopulationValue(feature.properties || {})
              layer.bindPopup(
                `السكان: ${val != null ? val.toLocaleString() : 'غير متوفر'}`
              )
            },
          })
          highlightLayerRef.current = layer
          layer.addTo(mapRef.current)
          mapRef.current.fitBounds(layer.getBounds(), { padding: [20, 20] })

          // Legend
          const legend = L.control({ position: 'bottomright' })
          legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'pop-legend')
            div.style.cssText =
              'background:#fff;padding:10px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:12px;'
            div.innerHTML =
              `<div style="font-weight:bold;margin-bottom:6px;">توزيع السكان</div>` +
              breaks
                .map(
                  (b, i) =>
                    `<div style="display:flex;align-items:center;margin:2px 0;"><span style="width:12px;height:12px;background:${colors[i]};display:inline-block;margin-left:6px;border:1px solid #fff"></span><span>≥ ${Math.round(b).toLocaleString()}</span></div>`
                )
                .join('')
            return div
          }
          if (legendRef.current) mapRef.current.removeControl(legendRef.current)
          legendRef.current = legend
          legend.addTo(mapRef.current)

          setActiveFeatures(polygonFeatures.length)
          const retMessage = '📊 تم عرض خريطة تدرج لونية لتوزيع السكان.'
          return retMessage
        } else {
          // Heatmap fallback
          if (!L.heatLayer) {
            const script = document.createElement('script')
            script.src =
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js'
            await new Promise((resolve, reject) => {
              script.onload = resolve
              script.onerror = reject
              document.head.appendChild(script)
            })
          }
          const maxWeight = Math.max(...heatmapData.map((h) => h[2]))
          const scaled = heatmapData.map(([lat, lon, w]) => [
            lat,
            lon,
            Math.max(0.2, w / maxWeight),
          ])
          const heatLayer = L.heatLayer(scaled, {
            radius: 25,
            blur: 15,
            maxZoom: 18,
            max: 1.0,
          })
          highlightLayerRef.current = heatLayer
          heatLayer.addTo(mapRef.current)
          // Legend for heatmap density
          const legend = L.control({ position: 'bottomright' })
          legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'pop-heat-legend')
            div.style.cssText =
              'background:#fff;padding:10px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:12px;min-width:180px'
            div.innerHTML = `
            <div style="font-weight:bold;margin-bottom:6px;">توزيع السكان (كثافة)</div>
            <div style="height:10px;background:linear-gradient(90deg, #4a90e2, #7ed321, #f8e71c, #f5a623, #d0021b);border-radius:6px;margin:6px 0;"></div>
            <div style="display:flex;justify-content:space-between;color:#555">
              <span>منخفض</span>
              <span>مرتفع</span>
            </div>
          `
            return div
          }
          if (legendRef.current) mapRef.current.removeControl(legendRef.current)
          legendRef.current = legend
          legend.addTo(mapRef.current)
          setActiveFeatures(scaled.length)
          const retMessage = '🔥 تم عرض خريطة كثافة تقديرية لتوزيع السكان.'
          return retMessage
        }
      } catch (error) {
        console.error('Population distribution failed:', error)
        const retMessage = `❌ فشل في عرض توزيع السكان: ${error.message}`
        return retMessage
      }
    },
    [mapRef, geoJsonLayerRef, highlightLayerRef, legendRef, setActiveFeatures]
  )

  // Enhanced function to display only specific features on map
  const displayOnlyFeatures = useCallback(
    async (features, highlightColor = '#ff0000', options = {}) => {
      if (!mapRef.current || !window.L || !features.length) {
        console.log(
          '❌ Cannot display features: missing map, Leaflet, or features'
        )
        return
      }

      const L = window.L

      try {
        const append = options.append === true
        // Remove existing layers unless appending
        if (!append) {
          if (geoJsonLayerRef.current) {
            mapRef.current.removeLayer(geoJsonLayerRef.current)
            geoJsonLayerRef.current = null
          }
          if (highlightLayerRef.current) {
            mapRef.current.removeLayer(highlightLayerRef.current)
            highlightLayerRef.current = null
          }
          if (legendRef.current) {
            mapRef.current.removeControl(legendRef.current)
            legendRef.current = null
          }
        }

        // Create GeoJSON data with only the selected features
        // Handle both direct features and features with metadata
        const filteredFeatures = features
          .map((item) => {
            if (item?.feature) {
              return item.feature // item has metadata (distance, etc.)
            } else if (item?.geometry) {
              return item // item is a direct feature
            } else {
              console.warn('Invalid feature item:', item)
              return null
            }
          })
          .filter(Boolean) // Remove null items

        const filteredData = {
          type: 'FeatureCollection',
          features: filteredFeatures,
        }

        console.log(`🗺️ Displaying ${features.length} features on map`)

        // Create new layer with highlighted features
        const highlightedLayer = L.geoJSON(filteredData, {
          style: (feature) => {
            const isPolygon = feature.geometry.type.includes('Polygon')
            const colorToUse =
              feature?.properties?._highlightColor || highlightColor
            return {
              color: colorToUse,
              weight: isPolygon ? 4 : 3,
              opacity: 1,
              fillColor: colorToUse,
              fillOpacity: isPolygon ? 0.7 : 0.9,
            }
          },
          pointToLayer: (_feature, latlng) =>
            L.circleMarker(latlng, {
              radius: 12,
              fillColor: highlightColor,
              color: '#fff',
              weight: 3,
              opacity: 1,
              fillOpacity: 0.9,
            }),
          onEachFeature: (feature, layer) => {
            const props = feature.properties || {}
            let popupContent =
              '<div class="popup-content" style="max-width: 400px; font-family: Arial;">'
            popupContent += `<h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">تفاصيل الحادث</h4>`

            // Find the corresponding analysis data
            const analysisData = features.find(
              (item) => item.feature === feature || item === feature
            )
            if (analysisData) {
              const incidentDate = parseDate(analysisData.incidentDate)
              popupContent += `<div style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid ${highlightColor};">`
              if (analysisData.distance !== undefined) {
                popupContent += `<p style="margin: 3px 0; color: #666;"><strong>المسافة:</strong> ${analysisData.distance.toFixed(
                  2
                )} كم</p>`
              }
              if (incidentDate) {
                popupContent += `<p style="margin: 3px 0; color: #666;"><strong>التاريخ:</strong> ${incidentDate.toLocaleDateString(
                  'ar-EG'
                )}</p>`
              }
              popupContent += `</div>`
            }

            // Tailored property display: incidents vs crisis
            if (Object.keys(props).length > 0) {
              const source = String(feature?.sourceFile || '').toLowerCase()
              const isCrisis = source.includes('crisis')
              popupContent += '<div style="margin-top: 10px;">'

              if (isCrisis) {
                const crisisFields = [
                  'name',
                  'status',
                  'type',
                  'category',
                  'severity',
                ] // common fields
                const crisisLabels = {
                  name: 'نوع الكارثة',
                  status: 'الحالة',
                  type: 'النوع',
                  category: 'الفئة',
                  severity: 'درجة الخطورة',
                }
                crisisFields.forEach((field) => {
                  const keys = Object.keys(props)
                  const foundKey = keys.find(
                    (k) => String(k).toLowerCase() === field
                  )
                  if (foundKey && props[foundKey] !== undefined) {
                    const label = crisisLabels[field] || foundKey
                    popupContent += `<p style="margin: 5px 0; padding: 3px 0; border-bottom: 1px solid #eee;"><strong>${label}:</strong> ${props[foundKey]}</p>`
                  }
                })
              } else {
                const importantFields = [
                  'Acc_Name',
                  'Type_Ar',
                  'Severity_Ar',
                  'COMM_NAME_AR',
                  'Category_Ar',
                ]
                importantFields.forEach((field) => {
                  if (props[field]) {
                    const arabicLabels = {
                      Acc_Name: 'نوع الحادث',
                      Type_Ar: 'التصنيف',
                      Severity_Ar: 'درجة الخطورة',
                      COMM_NAME_AR: 'المنطقة',
                      Category_Ar: 'الفئة',
                    }
                    const label = arabicLabels[field] || field
                    popupContent += `<p style="margin: 5px 0; padding: 3px 0; border-bottom: 1px solid #eee;"><strong>${label}:</strong> ${props[field]}</p>`
                  }
                })
              }

              popupContent += '</div>'
            }

            popupContent += '</div>'
            layer.bindPopup(popupContent, { maxWidth: 400 })
          },
        })

        if (append && highlightLayerRef.current) {
          // If we already have a group, just add the new layer
          if (typeof highlightLayerRef.current.addLayer === 'function') {
            highlightLayerRef.current.addLayer(highlightedLayer)
          } else {
            // Promote existing layer + new one into a LayerGroup
            const existing = highlightLayerRef.current
            mapRef.current.removeLayer(existing)
            const group = L.layerGroup([existing, highlightedLayer])
            group.addTo(mapRef.current)
            highlightLayerRef.current = group
          }
        } else {
          highlightLayerRef.current = highlightedLayer
          highlightedLayer.addTo(mapRef.current)
        }

        // Fit map to show all highlighted features
        const bounds = highlightedLayer.getBounds()
        if (bounds.isValid()) {
          mapRef.current.fitBounds(bounds, { padding: [20, 20] })
        }

        setActiveFeatures(features.length)

        // Build/update legend if provided
        if (options.legendEntries && options.legendEntries.length > 0) {
          const entries = options.legendEntries
          if (legendRef.current) {
            mapRef.current.removeControl(legendRef.current)
            legendRef.current = null
          }
          const legend = L.control({ position: 'topright' })
          legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend')
            div.style.background = 'white'
            div.style.padding = '8px'
            div.style.borderRadius = '8px'
            div.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)'
            div.innerHTML =
              `<div style="font-weight:bold; margin-bottom:4px;">وسيلة الإيضاح</div>` +
              entries
                .map(
                  (e) =>
                    `<div style="display:flex;align-items:center;gap:6px;margin:2px 0;"><span style="display:inline-block;width:12px;height:12px;background:${e.color};border:2px solid #fff;border-radius:50%;"></span>${e.label}</div>`
                )
                .join('')
            return div
          }
          legend.addTo(mapRef.current)
          legendRef.current = legend
        }
        console.log(
          `✅ Successfully displayed ${features.length} incidents on map`
        )
      } catch (error) {
        console.error('Failed to display features:', error)
        addMessage('bot', `❌ فشل في عرض البيانات: ${error.message}`)
      }
    },
    [
      mapRef,
      geoJsonLayerRef,
      highlightLayerRef,
      setActiveFeatures,
      addMessage,
      legendRef,
      parseDate,
    ]
  )

  // Enhanced map action handler with high-severity analysis
  const handleMapAction = useCallback(
    async (actionObj, actionId) => {
      if (processedActionsRef.current.has(actionId)) {
        const retMessage = `"Action already processed:", ${actionId}`
        console.log(retMessage)
        return retMessage
      }

      processedActionsRef.current.add(actionId)

      const map = mapRef.current
      if (!map) {
        const retMessage = 'Map action failed: map not available'
        console.log(retMessage)
        return retMessage
      }

      console.log('🎯 Executing map action:', actionObj)

      try {
        switch (actionObj.action) {
          case 'analyze-high-severity':
            addMessage(
              'bot',
              '🚨 جاري تحليل الحوادث عالية الخطورة وتوزيعها الجغرافي...',
              { type: 'system' }
            )
            return await analyzeHighSeverityIncidents(actionObj.data)

          case 'create-heatmap': {
            const { intensity = 0.5, radius: heatRadius = 25 } = actionObj
            addMessage(
              'bot',
              '🔥 جاري إنشاء الخريطة الحرارية لتحليل كثافة الحوادث...',
              { type: 'system' }
            )
            return await createHeatmap(intensity, heatRadius, actionObj.data)
          }

          case 'find-closest-spatial': {
            const { lat, lon, limit = 5 } = actionObj
            if (lat !== undefined && lon !== undefined) {
              addMessage(
                'bot',
                `🔍 جاري البحث عن ${limit} حوادث أقرب للإحداثيات (${lat.toFixed(
                  4
                )}, ${lon.toFixed(4)})...`,
                { type: 'system' }
              )

              const { closestIncidents } = actionObj.data

              if (closestIncidents.length > 0) {
                await displayOnlyFeatures(closestIncidents, '#e74c3c')

                const summary = closestIncidents
                  .map((incident, index) => {
                    const props = incident.properties
                    const arabicName =
                      props.Acc_Name || props.Type_Ar || 'حادث مروري'
                    const area =
                      props.COMM_NAME_AR ||
                      props.COMM_NAME_EN ||
                      'منطقة غير محددة'
                    const severity = props.Severity_Ar || 'غير محدد'
                    return `${
                      index + 1
                    }. ${arabicName}\n   📍 ${area} - المسافة: ${incident.distance.toFixed(
                      2
                    )} كم\n   🚨 الخطورة: ${severity}${
                      incident.incidentDate
                        ? `\n   📅 التاريخ: ${incident.incidentDate.toLocaleDateString(
                            'ar-EG'
                          )}`
                        : ''
                    }`
                  })
                  .join('\n\n')

                const retMessage = `🎯 تم العثور على ${closestIncidents.length} حوادث أقرب مكانياً:\n\n${summary}\n\n💡 انقر على العلامات الحمراء لمزيد من التفاصيل.`
                return retMessage
              } else {
                const retMessage =
                  '⚠️ لم يتم العثور على حوادث في البيانات المحملة'
                return retMessage
              }
            }
            return 'lat or lon is not provided.'
          }

          case 'find-incidents-within-radius': {
            const { lat: cLat, lon: cLon, limit = 5 } = actionObj
            if (typeof cLat === 'number' && typeof cLon === 'number') {
              addMessage(
                'bot',
                `🔍 جاري البحث عن ${limit} حوادث أقرب للإحداثيات (${cLat.toFixed(4)}, ${cLon.toFixed(4)})...`,
                { type: 'system' }
              )

              // Filter incident features (exclude crisis features)
              const { featuresWithin } = actionObj.data
              const rawFeatures = featuresWithin.map((item) => item.feature)

              if (rawFeatures.length > 0) {
                // Extract the raw features for display

                await displayOnlyFeatures(rawFeatures, '#2980b9')

                // Create a detailed summary
                const summary = featuresWithin
                  .map((item, index) => {
                    const props = item.properties
                    const arabicName =
                      props.Acc_Name || props.Type_Ar || 'حادث مروري'
                    const area =
                      props.COMM_NAME_AR ||
                      props.COMM_NAME_EN ||
                      'منطقة غير محددة'
                    const severity = props.Severity_Ar || 'غير محدد'
                    return `${index + 1}. ${arabicName}\n   📍 ${area} - المسافة: ${item.distance.toFixed(2)} كم\n   🚨 الخطورة: ${severity}`
                  })
                  .join('\n\n')

                const retMessage = `🎯 تم العثور على ${featuresWithin.length} حوادث أقرب مكانياً:\n\n${summary}\n\n💡 انقر على العلامات الحمراء لمزيد من التفاصيل.`
                return retMessage
              } else {
                const retMessage = '⚠️ لا توجد حوادث ضمن هذا النطاق.'
                return retMessage
              }
            } else {
              const retMessage = '⚠️ نحتاج إحداثيات صحيحة لبحث النطاق.'
              return retMessage
            }
          }

          case 'find-crisis-within-radius': {
            const { lat: cLat, lon: cLon, limit = 5 } = actionObj
            if (typeof cLat === 'number' && typeof cLon === 'number') {
              addMessage(
                'bot',
                `🌊 جاري البحث عن ${limit} كوارث أقرب للإحداثيات (${cLat.toFixed(4)}, ${cLon.toFixed(4)})...`,
                { type: 'system' }
              )

              const { featuresWithin } = actionObj.data

              if (featuresWithin.length > 0) {
                // Extract the raw features for display
                const rawFeatures = featuresWithin.map((item) => item.feature)
                await displayOnlyFeatures(rawFeatures, '#e74c3c')

                // Create a detailed summary
                const summary = featuresWithin
                  .map((item, index) => {
                    const props = item.properties
                    const crisisName = props.name || 'كارثة'
                    const status = props.status || 'غير محدد'
                    return `${index + 1}. ${crisisName}\n   📍 المسافة: ${item.distance.toFixed(2)} كم\n   🚨 الحالة: ${status}`
                  })
                  .join('\n\n')

                const retMessage = `🌊 تم العثور على ${featuresWithin.length} كارثة أقرب مكانياً:\n\n${summary}\n\n💡 انقر على العلامات الحمراء لمزيد من التفاصيل.`
                return retMessage
              } else {
                const retMessage = '⚠️ لا توجد كوارث ضمن هذا النطاق.'
                return retMessage
              }
            } else {
              const retMessage = '⚠️ نحتاج إحداثيات صحيحة لبحث النطاق.'
              return retMessage
            }
          }

          case 'find-closest-temporal': {
            const { date: queryDateStr, limit: tempLimit = 5 } = actionObj
            const queryDate = parseDate(queryDateStr)

            if (queryDate) {
              addMessage(
                'bot',
                `⏰ جاري البحث عن ${tempLimit} حوادث أقرب زمنياً لتاريخ ${queryDate.toLocaleDateString(
                  'ar-EG'
                )}...`,
                { type: 'system' }
              )

              const { temporalIncidents } = actionObj.data

              if (temporalIncidents.length > 0) {
                await displayOnlyFeatures(temporalIncidents, '#9b59b6')

                const summary = temporalIncidents
                  .map((incident, index) => {
                    const daysDiff = Math.floor(
                      incident.timeDiff / (1000 * 60 * 60 * 24)
                    )
                    const props = incident.properties
                    const arabicName =
                      props.Acc_Name || props.Type_Ar || 'حادث مروري'
                    return `${
                      index + 1
                    }. ${arabicName}\n   📅 ${incident.incidentDate.toLocaleDateString(
                      'ar-EG'
                    )} (فارق ${daysDiff} يوم)`
                  })
                  .join('\n\n')

                const retMessage = `⏰ تم العثور على ${temporalIncidents.length} حوادث أقرب زمنياً:\n\n${summary}\n\n💜 العلامات البنفسجية تظهر النتائج على الخريطة.`
                return retMessage
              } else {
                const retMessage =
                  '⚠️ لم يتم العثور على حوادث بتواريخ صحيحة في البيانات'
                return retMessage
              }
            } else {
              const retMessage =
                '⚠️ لا يمكن تحليل التاريخ المعطى. استخدم صيغ مثل: 2024-01-15، 15/01/2024، أو 2024/01/15'
              return retMessage
            }
          }

          case 'filter-incidents-date-range': {
            const { startDate, endDate } = actionObj
            let start = parseDate(startDate)
            let end = parseDate(endDate)
            if (!start || !end) {
              const retMessage =
                '⚠️ تواريخ غير صالحة. استخدم صيغة مثل 2024-12-01.'
              return retMessage
            }
            // Normalize inverted ranges
            if (start > end) {
              const tmp = start
              start = end
              end = tmp
              addMessage(
                'bot',
                'ℹ️ تم تصحيح ترتيب النطاق الزمني (عكس البداية والنهاية).',
                { type: 'system' }
              )
            }
            // Include the entire end day
            end = new Date(
              end.getFullYear(),
              end.getMonth(),
              end.getDate(),
              23,
              59,
              59,
              999
            )
            addMessage(
              'bot',
              `📅 تصفية الحوادث بين ${start.toLocaleDateString('ar-EG')} و ${end.toLocaleDateString('ar-EG')}`,
              { type: 'system' }
            )
            const { items } = actionObj.data
            if (items.length > 0) {
              await displayOnlyFeatures(items, '#16a085')
              const retMessage = `✅ تم العثور على ${items.length} حادث ضمن الفترة المحددة.`
              return retMessage
            } else {
              const retMessage = '⚠️ لا توجد حوادث ضمن هذا النطاق الزمني.'
              return retMessage
            }
          }

          case 'clear': {
            // Clear all layers and show empty map
            if (geoJsonLayerRef.current) {
              mapRef.current.removeLayer(geoJsonLayerRef.current)
              geoJsonLayerRef.current = null
            }
            if (highlightLayerRef.current) {
              mapRef.current.removeLayer(highlightLayerRef.current)
              highlightLayerRef.current = null
            }
            if (legendRef.current) {
              mapRef.current.removeControl(legendRef.current)
              legendRef.current = null
            }

            setActiveFeatures(0)
            const retMessage = '🧹 تم مسح جميع النتائج من الخريطة'
            return retMessage
          }

          case 'filter-by-property': {
            const { property, value } = actionObj
            if (property && value) {
              const { matchingFeatures } = actionObj.data

              if (matchingFeatures.length > 0) {
                await displayOnlyFeatures(matchingFeatures, '#2ecc71')
                const retMessage = `🔍 تم العثور على ${matchingFeatures.length} حادث يحتوي على "${value}" - مُظلل بالأخضر على الخريطة.`
                return retMessage
              } else {
                const retMessage = `⚠️ لم يتم العثور على حوادث تحتوي على "${value}"`
                return retMessage
              }
            }
            return `property or value were not provided [property (${property}), value (${value})]`
          }

          case 'find-nearby-resources': {
            const {
              lat: resLat,
              lon: resLon,
              resourceType = 'all',
              radius: searchRadius = 5,
            } = actionObj
            if (resLat !== undefined && resLon !== undefined) {
              return await findNearbyResources(
                resLat,
                resLon,
                actionObj.data,
                resourceType,
                searchRadius
              )
            }
            return `lat or lon were not provided [lat (${resLat}), lon (${resLon})]`
          }

          case 'population-distribution':
            addMessage('bot', '📊 جاري عرض توزيع السكان...')
            return await showPopulationDistribution(actionObj.data)

          case 'route-to': {
            const { startLat, startLon, endLat, endLon } = actionObj
            if (
              typeof startLat === 'number' &&
              typeof startLon === 'number' &&
              typeof endLat === 'number' &&
              typeof endLon === 'number'
            ) {
              addMessage('bot', '🧭 جاري حساب أسرع مسار بالسيارة...')
              return await routeBetweenPoints(
                startLat,
                startLon,
                endLat,
                endLon
              )
            } else {
              const retMessage =
                '⚠️ نحتاج إلى نقطتي انطلاق ووجهة صالحتيْن لحساب المسار'
              return retMessage
            }
          }

          case 'route-to-destination': {
            const { endLat, endLon } = actionObj
            if (typeof endLat === 'number' && typeof endLon === 'number') {
              addMessage(
                'bot',
                '🧭 جاري حساب أسرع مسار من مركز دبي إلى الوجهة المطلوبة...'
              )
              return await routeToDestination(endLat, endLon)
            } else {
              const retMessage =
                '⚠️ نحتاج إلى إحداثيات صحيحة للوجهة لحساب المسار'
              return retMessage
            }
          }

          case 'top-roads-by-incidents': {
            const { sampleIncidents } = actionObj.data

            if (sampleIncidents.length > 0) {
              await displayOnlyFeatures(sampleIncidents, '#d35400')
            }
            break
          }

          case 'top-incident-types': {
            const { sampleIncidents } = actionObj.data
            if (sampleIncidents.length > 0) {
              await displayOnlyFeatures(sampleIncidents, '#27ae60')
            }
            break
          }

          case 'compare-incident-counts': {
            const { sampleIncidents } = actionObj.data
            if (sampleIncidents.length > 0) {
              await displayOnlyFeatures(sampleIncidents, '#8e44ad')
            }
            break
          }

          case 'filter-major-roads-incidents': {
            const { selected } = actionObj.data
            if (selected.length > 0) {
              await displayOnlyFeatures(selected, '#c0392b')
              const retMessage = `🚧 تم عرض ${selected.length} حادث على الطرق الرئيسية فقط.`
              addMessage('bot', retMessage)
              return retMessage
            } else {
              const retMessage =
                '⚠️ لم يتم العثور على حوادث مصنفة على طرق رئيسية في البيانات.'
              return retMessage
            }
          }

          case 'filter-by-keywords': {
            const { color = '#3498db' } = actionObj

            const { list } = actionObj.data

            if (list.length > 0) {
              await displayOnlyFeatures(list, color)
              const retMessage = `✅ تم العثور على ${list.length} حدث مطابق.`
              addMessage('bot', retMessage)
              return retMessage
            } else {
              const retMessage = '⚠️ لا توجد أحداث مطابقة للمعايير.'
              return retMessage
            }
          }

          case 'show-crisis-grouped-status': {
            const { openList, closedList, unknownList } = actionObj.data

            const legendEntries = []
            if (closedList.length > 0)
              legendEntries.push({
                color: '#7f8c8d',
                label: `مغلقة (${closedList.length})`,
              })
            if (openList.length > 0)
              legendEntries.push({
                color: '#27ae60',
                label: `مفتوحة (${openList.length})`,
              })
            if (unknownList.length > 0)
              legendEntries.push({
                color: '#f39c12',
                label: `غير معروفة (${unknownList.length})`,
              })

            // عرض جميع أنواع الكوارث معاً
            let displayedCount = 0
            let retMessage = '📊 **تصنيف الكوارث حسب الحالة:**\n\n'

            // عرض الكوارث المغلقة أولاً
            if (closedList.length > 0) {
              await displayOnlyFeatures(closedList, '#7f8c8d', {
                append: false,
                legendEntries,
              })
              retMessage += `🩶 الكوارث المغلقة: ${closedList.length}\n`
              displayedCount += closedList.length
            }

            // إضافة الكوارث المفتوحة
            if (openList.length > 0) {
              await displayOnlyFeatures(openList, '#27ae60', {
                append: true,
                legendEntries,
              })
              retMessage += `🟢 الكوارث المفتوحة: ${openList.length}\n`
              displayedCount += openList.length
            }

            if (unknownList.length > 0) {
              await displayOnlyFeatures(unknownList, '#f39c12', {
                append: true,
                legendEntries,
              })
              retMessage += `🟡 الكوارث بحالة غير معروفة: ${unknownList.length}\n`
              displayedCount += unknownList.length
            }

            retMessage += `\n📈 **الإجمالي:** ${displayedCount} كارثة`
            return retMessage
          }

          default:
            console.warn('Unhandled MAP_ACTION:', actionObj)
            return 'unknown tool call'
        }
      } catch (error) {
        const retMessage = `"Map action execution failed:", ${error}`
        console.error(retMessage)
        return retMessage
      }
    },
    [
      displayOnlyFeatures,
      parseDate,
      createHeatmap,
      analyzeHighSeverityIncidents,
      routeBetweenPoints,
      routeToDestination,
      mapRef,
      geoJsonLayerRef,
      highlightLayerRef,
      legendRef,
      processedActionsRef,
      setActiveFeatures,
      addMessage,
      findNearbyResources,
      showPopulationDistribution,
    ]
  )

  return {
    calculateDistance,
    parseDate,
    displayOnlyFeatures,
    handleMapAction,
    createHeatmap,
    analyzeDensityClusters,
    analyzeHighSeverityIncidents,
    performGeographicClustering,
    generateSeverityAnalysisReport,
    generateSafetyRecommendations,
    findNearbyResources,
    routeBetweenPoints,
    routeToDestination,
    showPopulationDistribution,
    isIncidentPointFeature,
    isCrisisPointFeature,
    isPointFeature,
  }
}
