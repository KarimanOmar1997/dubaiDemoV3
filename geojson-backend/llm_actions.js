export const llmActions = ({ allFeaturesData }) => {
  // Add this function after the existing helper functions (around line 600)

  // NEW: Analyze incidents near critical infrastructure
  const analyzeCriticalInfrastructure = async (
    radius = 2.0,
    facilityType = 'all',
    limit = 10
  ) => {
    try {
      console.log(
        `🏛️ بدء تحليل المنشآت الحيوية - النوع: ${facilityType}, النطاق: ${radius} كم`
      )

      // Define critical infrastructure with realistic UAE coordinates
      const criticalFacilities = [
        // Ministries and Government Buildings
        {
          name: 'وزارة الداخلية',
          type: 'ministry',
          coordinates: [25.274987, 55.292249],
          category: 'وزارة',
          importance: 'عالية جداً',
        },
        // {
        //   name: 'وزارة الدفاع',
        //   type: 'ministry',
        //   coordinates: [25.254816, 55.364504],
        //   category: 'وزارة',
        //   importance: 'عالية جداً',
        // },
        {
          name: 'وزارة الصحة ووقاية المجتمع',
          type: 'ministry',
          coordinates: [25.267141, 55.302707],
          category: 'وزارة',
          importance: 'عالية جداً',
        },

        // Major Hospitals
        {
          name: 'مستشفى دبي',
          type: 'hospital',
          coordinates: [25.267676, 55.294233],
          category: 'مستشفى حكومي',
          importance: 'عالية جداً',
        },
        {
          name: 'مستشفى راشد',
          type: 'hospital',
          coordinates: [25.250124, 55.303453],
          category: 'مستشفى حكومي',
          importance: 'عالية جداً',
        },
        {
          name: 'المدينة الطبية',
          type: 'hospital',
          coordinates: [25.112112, 55.200375],
          category: 'مجمع طبي',
          importance: 'عالية جداً',
        },

        // Military and Security
        {
          name: 'قاعدة الضبعة الجوية',
          type: 'military',
          coordinates: [25.380885, 56.222221],
          category: 'قاعدة عسكرية',
          importance: 'عالية جداً',
        },
        {
          name: 'قيادة شرطة دبي',
          type: 'military',
          coordinates: [25.258952, 55.288334],
          category: 'مؤسسة أمنية',
          importance: 'عالية جداً',
        },

        // Critical Infrastructure
        {
          name: 'مطار دبي الدولي',
          type: 'airport',
          coordinates: [25.252776, 55.364441],
          category: 'مطار دولي',
          importance: 'عالية جداً',
        },
        {
          name: 'ميناء جبل علي',
          type: 'port',
          coordinates: [25.012226, 55.113094],
          category: 'ميناء تجاري',
          importance: 'عالية جداً',
        },
        {
          name: 'محطة كهرباء جبل علي',
          type: 'infrastructure',
          coordinates: [25.070169, 55.069408],
          category: 'محطة طاقة',
          importance: 'عالية جداً',
        },
      ]

      // Filter facilities by type if specified
      const selectedFacilities =
        facilityType === 'all'
          ? criticalFacilities
          : criticalFacilities.filter((f) => f.type === facilityType)

      console.log(`🔍 تحليل ${selectedFacilities.length} منشأة حيوية`)

      // Analyze incidents near each facility
      const facilityAnalysis = []
      let totalIncidentsFound = 0

      for (const facility of selectedFacilities) {
        console.log(`📍 تحليل الحوادث بالقرب من: ${facility.name}`)

        // Find incidents within radius of this facility
        const nearbyIncidents = allFeaturesData
          .filter(isIncidentPointFeature)
          .map((feature) => {
            if (feature.geometry?.type !== 'Point') return null
            const [lon, lat] = feature.geometry.coordinates
            const distance = calculateDistance(
              facility.coordinates[0],
              facility.coordinates[1],
              lat,
              lon
            )

            if (distance <= radius) {
              return {
                feature,
                coordinates: [lat, lon],
                distance,
                properties: feature.properties || {},
                facilityName: facility.name,
                facilityType: facility.type,
              }
            }
            return null
          })
          .filter((item) => item !== null)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, limit)

        if (nearbyIncidents.length > 0) {
          // Analyze incident severity distribution
          const severityAnalysis = nearbyIncidents.reduce(
            (acc, incident) => {
              const props = incident.properties
              const severity = (props.Severity_Ar || '').toLowerCase()

              if (severity.includes('قاتل') || severity.includes('وفاة')) {
                acc.fatal++
              } else if (severity.includes('شديد')) {
                acc.severe++
              } else if (severity.includes('خطير')) {
                acc.dangerous++
              } else {
                acc.moderate++
              }
              return acc
            },
            { fatal: 0, severe: 0, dangerous: 0, moderate: 0 }
          )

          facilityAnalysis.push({
            facility,
            incidentCount: nearbyIncidents.length,
            incidents: nearbyIncidents,
            averageDistance:
              nearbyIncidents.reduce((sum, inc) => sum + inc.distance, 0) /
              nearbyIncidents.length,
            severityAnalysis,
            riskLevel: calculateRiskLevel(
              nearbyIncidents.length,
              severityAnalysis
            ),
          })

          totalIncidentsFound += nearbyIncidents.length
        }
      }

      // Sort facilities by risk level and incident count
      facilityAnalysis.sort((a, b) => {
        const riskOrder = { 'عالية جداً': 4, عالية: 3, متوسطة: 2, منخفضة: 1 }
        const aRisk = riskOrder[a.riskLevel] || 0
        const bRisk = riskOrder[b.riskLevel] || 0

        if (aRisk !== bRisk) return bRisk - aRisk
        return b.incidentCount - a.incidentCount
      })

      // Generate comprehensive report
      let analysisReport = `🏛️ **تحليل شامل للمنشآت الحيوية**\n*نطاق البحث: ${radius} كم حول كل منشأة*\n\n`

      analysisReport += `📊 **نظرة عامة:**\n`
      analysisReport += `• إجمالي المنشآت المحللة: ${selectedFacilities.length}\n`
      analysisReport += `• المنشآت ذات الحوادث القريبة: ${facilityAnalysis.length}\n`
      analysisReport += `• إجمالي الحوادث المكتشفة: ${totalIncidentsFound}\n\n`

      if (facilityAnalysis.length === 0) {
        analysisReport += `✅ **نتيجة إيجابية:** لم يتم العثور على حوادث ضمن نطاق ${radius} كم من أي منشأة حيوية.\n`
        analysisReport += `💡 هذا يشير إلى مستوى أمان جيد حول المنشآت الحيوية.`

        return {
          result: analysisReport,
          data: {
            facilities: selectedFacilities,
            analysis: [],
            totalIncidents: 0,
            riskSummary: { high: 0, medium: 0, low: 0 },
          },
        }
      }

      // Risk level summary
      const riskSummary = facilityAnalysis.reduce(
        (acc, analysis) => {
          switch (analysis.riskLevel) {
            case 'عالية جداً':
            case 'عالية':
              acc.high++
              break
            case 'متوسطة':
              acc.medium++
              break
            default:
              acc.low++
          }
          return acc
        },
        { high: 0, medium: 0, low: 0 }
      )

      analysisReport += `🚨 **تقييم المخاطر:**\n`
      analysisReport += `• منشآت عالية المخاطر: ${riskSummary.high}\n`
      analysisReport += `• منشآت متوسطة المخاطر: ${riskSummary.medium}\n`
      analysisReport += `• منشآت منخفضة المخاطر: ${riskSummary.low}\n\n`

      analysisReport += `🏆 **أكثر المنشآت تأثراً:**\n\n`

      facilityAnalysis.slice(0, 5).forEach((analysis, index) => {
        const facility = analysis.facility
        analysisReport += `${index + 1}. **${facility.name}** (${facility.category})\n`
        analysisReport += `   📍 مستوى المخاطر: ${analysis.riskLevel}\n`
        analysisReport += `   🚨 عدد الحوادث: ${analysis.incidentCount}\n`
        analysisReport += `   📏 متوسط المسافة: ${analysis.averageDistance.toFixed(2)} كم\n`

        const severity = analysis.severityAnalysis
        if (severity.fatal > 0) {
          analysisReport += `   💀 حوادث قاتلة: ${severity.fatal}\n`
        }
        if (severity.severe > 0) {
          analysisReport += `   🔴 حوادث شديدة: ${severity.severe}\n`
        }
        if (severity.dangerous > 0) {
          analysisReport += `   🟠 حوادث خطيرة: ${severity.dangerous}\n`
        }
        analysisReport += `\n`
      })

      // Generate recommendations
      analysisReport += `💡 **التوصيات الأمنية:**\n`

      if (riskSummary.high > 0) {
        analysisReport += `1. 🚨 تعزيز الأمن حول المنشآت عالية المخاطر\n`
        analysisReport += `2. 🚔 زيادة دوريات الشرطة في المناطق المحيطة\n`
      }

      analysisReport += `3. 🛡️ تطوير خطط الطوارئ المحددة لكل منشأة\n`
      analysisReport += `4. 📊 مراقبة مستمرة للأنشطة المشبوهة\n`
      analysisReport += `5. 🚧 تحسين البنية التحتية للسلامة المرورية\n`

      if (totalIncidentsFound > 50) {
        analysisReport += `6. ⚠️ إعادة تقييم شاملة لبروتوكولات الأمن\n`
      }

      console.log('✅ تم إكمال تحليل المنشآت الحيوية')

      // Prepare all incidents for visualization
      const allIncidents = facilityAnalysis.flatMap(
        (analysis) => analysis.incidents
      )

      return {
        result: analysisReport,
        data: {
          facilities: selectedFacilities,
          analysis: facilityAnalysis,
          allIncidents,
          totalIncidents: totalIncidentsFound,
          riskSummary,
        },
      }
    } catch (error) {
      console.error('فشل في تحليل المنشآت الحيوية:', error)
      const retMessage = `❌ فشل في تحليل المنشآت الحيوية: ${error.message}`
      return { result: retMessage, data: null }
    }
  }

  // Helper function to calculate risk level based on incidents
  const calculateRiskLevel = (incidentCount, severityAnalysis) => {
    const { fatal, severe, dangerous } = severityAnalysis

    // High risk: any fatal incidents or many severe incidents
    if (fatal > 0 || severe > 3 || incidentCount > 15) {
      return 'عالية جداً'
    }

    // Medium-high risk: severe incidents or many dangerous incidents
    if (severe > 0 || dangerous > 5 || incidentCount > 8) {
      return 'عالية'
    }

    // Medium risk: some dangerous incidents or moderate count
    if (dangerous > 0 || incidentCount > 3) {
      return 'متوسطة'
    }

    // Low risk: few incidents, mostly minor
    return 'منخفضة'
  }
  // Enhanced function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
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
  }

  // Helper: restrict to accident Point features from incidents file only
  const isIncidentPointFeature = (feature) => {
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
  }

  // Helper: any point feature (incidents or crisis, resources, etc.)
  const isPointFeature = (feature) => {
    return !!feature && feature.geometry?.type === 'Point'
  }

  // Helper: restrict to crisis Point features only
  const isCrisisPointFeature = (feature) => {
    if (!feature || feature?.geometry?.type !== 'Point') return false
    const source = String(feature?.sourceFile || '').toLowerCase()
    if (!source) return false

    // Check for crisis-related keywords in source file name
    const isCrisisFile =
      source.includes('crisis') ||
      source.includes('crisisfeaturestojson') || // More specific match
      source.includes('disaster') ||
      source.includes('كوارث') ||
      source.includes('كارثة') ||
      source.includes('طوارئ') ||
      source.includes('emergency')

    return isCrisisFile
  }

  // 1. Update your useMapActions.js - Add this function to the hook
  const findNearbyResources = async (
    lat,
    lon,
    resourceType = 'all',
    radius = 5
  ) => {
    if (!allFeaturesData.length) {
      console.log('❌ Cannot find resources: missing map, Leaflet, or data')
      return { result: 'Something went wrong', data: null }
    }

    try {
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
      const foundResources = {}
      const allResources = []

      // Initialize resource categories
      Object.keys(resourceKeywords).forEach((type) => {
        foundResources[type] = []
      })

      allFeaturesData.forEach((feature) => {
        let featureLat = null,
          featureLon = null

        // Extract coordinates
        if (feature.geometry) {
          switch (feature.geometry.type) {
            case 'Point':
              ;[featureLon, featureLat] = feature.geometry.coordinates
              break
            case 'Polygon':
            case 'MultiPolygon': {
              const coords =
                feature.geometry.type === 'Polygon'
                  ? feature.geometry.coordinates[0]
                  : feature.geometry.coordinates[0][0]
              featureLat =
                coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length
              featureLon =
                coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length
              break
            }
            default:
              break
          }
        }

        if (featureLat !== null && featureLon !== null) {
          const distance = calculateDistance(lat, lon, featureLat, featureLon)

          if (distance <= radius) {
            const props = feature.properties || {}

            // Check all text properties for resource keywords
            const allText = Object.values(props)
              .filter((val) => typeof val === 'string')
              .join(' ')
              .toLowerCase()

            // Categorize by resource type
            Object.entries(resourceKeywords).forEach(([type, config]) => {
              const hasKeyword = config.keywords.some((keyword) =>
                allText.includes(keyword.toLowerCase())
              )

              if (
                hasKeyword &&
                (resourceType === 'all' || type.includes(resourceType))
              ) {
                foundResources[type].push({
                  feature,
                  coordinates: [featureLat, featureLon],
                  distance,
                  properties: props,
                  type: type,
                })
              }
            })
          }
        }
      })

      // Sort each category by distance and combine
      Object.keys(foundResources).forEach((type) => {
        foundResources[type].sort((a, b) => a.distance - b.distance)
        allResources.push(...foundResources[type])
      })

      if (allResources.length === 0) {
        const retMessage = `❌ لم يتم العثور على موارد في نطاق ${radius} كم من الموقع المحدد`
        return { result: retMessage, data: null }
      }

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

      console.log('✅ Resources search completed')
      return { result: summaryReport, data: { foundResources, allResources } }
    } catch (error) {
      console.error('Failed to find nearby resources:', error)
      const retMessage = `❌ فشل في البحث عن الموارد: ${error.message}`
      return { result: retMessage, data: null }
    }
  }

  // Enhanced function to parse dates from various formats
  const parseDate = (dateStr) => {
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
  }

  // NEW: Analyze high-severity incidents and their geographic distribution
  const analyzeHighSeverityIncidents = async () => {
    if (!allFeaturesData.length) {
      const retMessage = '❌ Cannot find any data'
      console.log(retMessage)
      return { result: retMessage, data: null }
    }

    try {
      // Restrict to accident points from incidents file only
      const incidentPointFeatures = allFeaturesData.filter((feature) => {
        const isPoint = feature?.geometry?.type === 'Point'
        const source = String(feature?.sourceFile || '').toLowerCase()
        const fromIncidentsFile =
          source.includes('trafficincidents') ||
          source.includes('traffic') ||
          source.includes('incident') ||
          source.includes('accident') ||
          source.includes('حوادث')
        return isPoint && fromIncidentsFile
      })

      // Filter high-severity incidents (points only from incidents file)
      const highSeverityIncidents = incidentPointFeatures.filter((feature) => {
        const props = feature.properties || {}

        // Check various severity indicators
        const severity = (
          props.Severity_Ar ||
          props.Severity ||
          ''
        ).toLowerCase()
        const type = (props.Type_Ar || props.Type || '').toLowerCase()
        const accName = (props.Acc_Name || '').toLowerCase()

        // High severity keywords in Arabic and English
        const highSeverityKeywords = [
          'خطير',
          'شديد',
          'قاتل',
          'وفاة',
          'قتل',
          'جسيم',
          'بليغ',
          'severe',
          'fatal',
          'critical',
          'death',
          'serious',
          'major',
        ]

        return highSeverityKeywords.some(
          (keyword) =>
            severity.includes(keyword) ||
            type.includes(keyword) ||
            accName.includes(keyword)
        )
      })

      console.log(
        `🔥 Found ${highSeverityIncidents.length} high-severity incidents`
      )

      if (highSeverityIncidents.length === 0) {
        const retMessage =
          '⚠️ لم يتم العثور على حوادث ذات خطورة عالية في البيانات المحملة'
        return { result: retMessage, data: null }
      }

      // Geographic clustering analysis
      const clusters = performGeographicClustering(highSeverityIncidents)

      // Create individual markers for high-severity incidents
      const processedIncidents = []

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

          if (
            (props.Severity_Ar || '').toLowerCase().includes('قاتل') ||
            (props.Type_Ar || '').toLowerCase().includes('وفاة')
          ) {
            severityLevel = 'fatal'
          } else if (props.Severity_Ar?.toLowerCase().includes('شديد')) {
            severityLevel = 'severe'
          } else if (props.Severity_Ar?.toLowerCase().includes('خطير')) {
            severityLevel = 'serious'
          }

          processedIncidents.push({
            feature,
            coordinates: [lat, lon],
            severityLevel,
            properties: props,
          })
        }
      })

      // Generate detailed analysis report
      const analysisReport = generateSeverityAnalysisReport(
        clusters,
        processedIncidents
      )

      console.log('✅ High-severity analysis completed')

      const retMessage = `🚨 **تحليل الحوادث عالية الخطورة مكتمل!**\n\n📊 **الإحصائيات:**\n• إجمالي الحوادث عالية الخطورة: ${
        highSeverityIncidents.length
      }\n• نسبة الحوادث الخطيرة: ${(
        (highSeverityIncidents.length / allFeaturesData.length) * 100
      ).toFixed(1)}%\n\n🔴 **توزيع حسب الخطورة:**\n• قاتلة: ${
        processedIncidents.filter((i) => i.severityLevel === 'fatal').length
      }\n• شديدة: ${
        processedIncidents.filter((i) => i.severityLevel === 'severe').length
      }\n• خطيرة: ${
        processedIncidents.filter((i) => i.severityLevel === 'serious').length
      }\n• متوسطة-عالية: ${
        processedIncidents.filter((i) => i.severityLevel === 'moderate').length
      }\n\n🏆 **أكثر المناطق خطورة:**\n${
        analysisReport.topDangerousAreas
      }\n\n📈 **توزيع أنواع الحوادث:**\n${
        analysisReport.severityDistribution
      }\n\n🎯 **التوصيات:**\n${
        analysisReport.recommendations
      }\n\n💡 انقر على النقاط للحصول على تفاصيل كل حادث.`
      return { result: retMessage, data: { highSeverityIncidents } }
    } catch (error) {
      console.error('Failed to analyze high-severity incidents:', error)
      const retMessage = `❌ فشل في تحليل الحوادث عالية الخطورة: ${error.message}`
      return { result: retMessage, data: null }
    }
  }

  // NEW: Geographic clustering for high-severity analysis
  const performGeographicClustering = (incidents) => {
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
  }

  // NEW: Generate detailed severity analysis report
  const generateSeverityAnalysisReport = (clusters, incidents) => {
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
  }

  // NEW: Generate safety recommendations
  const generateSafetyRecommendations = (clusters, severityStats) => {
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
  }

  // Create and display fastest driving route between two points using OSRM
  const routeBetweenPoints = async (startLat, startLon, endLat, endLon) => {
    try {
      // Validate coordinates
      if (
        Number.isNaN(startLat) ||
        Number.isNaN(startLon) ||
        Number.isNaN(endLat) ||
        Number.isNaN(endLon)
      ) {
        const retMessage = '⚠️ إحداثيات غير صحيحة. يرجى التحقق من القيم المقدمة.'
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
          return { result: retMessage, data: null }
        }

        const best = data.routes[0]
        const distanceKm = best.distance / 1000
        const durationMin = best.duration / 60

        const retMessage = `🛣️ تم إنشاء أسرع مسار.

📍 نقطة الانطلاق: (${startLat.toFixed(6)}, ${startLon.toFixed(6)})
🎯 الوجهة: (${endLat.toFixed(6)}, ${endLon.toFixed(6)})
📏 المسافة: ${distanceKm.toFixed(2)} كم
⏱️ الزمن التقريبي: ${durationMin.toFixed(0)} دقيقة

تم عرض المسار على الخريطة مع علامات توضيحية.`
        return { result: retMessage, data: null }
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
      return { result: retMessage, data: null }
    }
  }

  // Route from Dubai center to a specific destination
  const routeToDestination = async (
    endLat,
    endLon,
    startLat = 25.267078,
    startLon = 55.293646
  ) => {
    try {
      // Validate coordinates
      if (
        Number.isNaN(startLat) ||
        Number.isNaN(startLon) ||
        Number.isNaN(endLat) ||
        Number.isNaN(endLon)
      ) {
        const retMessage = '⚠️ إحداثيات غير صحيحة. يرجى التحقق من القيم المقدمة.'
        return { result: retMessage, data: null }
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
        return { result: retMessage, data: null }
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

          return { result: retMessage, data: null }
        }

        const best = data.routes[0]
        const distanceKm = best.distance / 1000
        const durationMin = best.duration / 60
        const retMessage = `🛣️ تم إنشاء أسرع مسار من مركز دبي إلى الوجهة المطلوبة.

📍 نقطة الانطلاق: مركز دبي (${startLat.toFixed(6)}, ${startLon.toFixed(6)})
🎯 الوجهة: (${endLat.toFixed(6)}, ${endLon.toFixed(6)})
📏 المسافة: ${distanceKm.toFixed(2)} كم
⏱️ الزمن التقريبي: ${durationMin.toFixed(0)} دقيقة

تم عرض المسار على الخريطة مع علامات توضيحية.`

        return { result: retMessage, data: null }
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
      return { result: retMessage, data: null }
    }
  }

  // Analyze density clusters
  const analyzeDensityClusters = (heatmapData) => {
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
  }

  // Enhanced function to create heatmap visualization
  const createHeatmap = async (_intensity = 0.5, _radius = 25) => {
    if (!allFeaturesData.length) {
      const retMessage =
        '❌ Cannot create heatmap: missing map, Leaflet, or data'
      console.log(retMessage)
      return { result: retMessage, data: null }
    }

    // Prepare heatmap data points
    const heatmapData = []
    const validIncidents = []

    allFeaturesData.filter(isIncidentPointFeature).forEach((feature) => {
      let lat = null,
        lon = null

      if (feature.geometry?.type === 'Point') {
        ;[lon, lat] = feature.geometry.coordinates
      }

      if (lat !== null && lon !== null) {
        // Add intensity based on incident severity or type
        let weight = 1
        const props = feature.properties || {}

        // Adjust weight based on severity or type
        if (props.Severity_Ar) {
          const severity = props.Severity_Ar.toLowerCase()
          if (severity.includes('خطير') || severity.includes('شديد')) weight = 3
          else if (severity.includes('متوسط')) weight = 2
          else weight = 1
        } else if (props.Type_Ar) {
          const type = props.Type_Ar.toLowerCase()
          if (type.includes('وفاة') || type.includes('قتل')) weight = 4
          else if (type.includes('إصابة')) weight = 2
          else weight = 1
        }

        heatmapData.push([lat, lon, weight])
        validIncidents.push(feature)
      }
    })

    console.log(`🔥 Creating heatmap with ${heatmapData.length} data points`)

    if (heatmapData.length === 0) {
      const retMessage = '⚠️ لا توجد بيانات صالحة لإنشاء الخريطة الحرارية'
      return { result: retMessage, data: null }
    }

    // Analyze density clusters
    const densityAnalysis = analyzeDensityClusters(heatmapData)

    console.log('✅ Heatmap created successfully')

    const summaryMessage = `🔥 تم إنشاء الخريطة الحرارية بنجاح!\n\n📊 **تحليل الكثافة:**\n• إجمالي النقاط: ${
      heatmapData.length
    }\n• المناطق عالية الكثافة: ${
      densityAnalysis.highDensityAreas
    }\n• متوسط الكثافة: ${densityAnalysis.averageDensity.toFixed(
      2
    )}\n\n🎯 **المناطق الأكثر تركزاً:**\n${densityAnalysis.topAreas.join('\n')}`
    console.log('Data from heatmap:', heatmapData.length, validIncidents.length)
    return { result: summaryMessage, data: { heatmapData, validIncidents } }
  }

  // Population distribution visualization (heatmap or choropleth)
  const showPopulationDistribution = async () => {
    if (!allFeaturesData.length) {
      const retMessage = '⚠️ لا توجد بيانات كافية لعرض توزيع السكان'
      return retMessage
    }

    try {
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
      const heatmapData = []
      const polygonFeatures = []
      let hasPolygonsWithPopulation = false

      allFeaturesData.forEach((feature) => {
        const props = feature.properties || {}
        const popVal = detectPopulationValue(props)
        if (popVal == null) return

        if (feature.geometry) {
          if (feature.geometry.type === 'Point') {
            const [lon, lat] = feature.geometry.coordinates
            heatmapData.push([lat, lon, Math.max(1, popVal)])
          } else if (
            feature.geometry.type === 'Polygon' ||
            feature.geometry.type === 'MultiPolygon'
          ) {
            hasPolygonsWithPopulation = true
            polygonFeatures.push(feature)
            // Centroid for heat fallback
            const coords =
              feature.geometry.type === 'Polygon'
                ? feature.geometry.coordinates[0]
                : feature.geometry.coordinates[0][0]
            const lat = coords.reduce((s, c) => s + c[1], 0) / coords.length
            const lon = coords.reduce((s, c) => s + c[0], 0) / coords.length
            heatmapData.push([lat, lon, Math.max(1, popVal)])
          }
        }
      })

      if (heatmapData.length === 0) {
        const retMessage = '⚠️ لم أجد حقولاً تدل على عدد السكان في البيانات'
        return { result: retMessage, data: null }
      }

      // If polygons have population values, prefer choropleth; else heatmap
      if (hasPolygonsWithPopulation && polygonFeatures.length > 0) {
        const retMessage = '📊 تم عرض خريطة تدرج لونية لتوزيع السكان.'
        return {
          result: retMessage,
          data: { heatmapData, polygonFeatures, hasPolygonsWithPopulation },
        }
      } else {
        const retMessage = '🔥 تم عرض خريطة كثافة تقديرية لتوزيع السكان.'
        return {
          result: retMessage,
          data: { heatmapData, polygonFeatures, hasPolygonsWithPopulation },
        }
      }
    } catch (error) {
      console.error('Population distribution failed:', error)
      const retMessage = `❌ فشل في عرض توزيع السكان: ${error.message}`
      return { result: retMessage, data: null }
    }
  }

  // Enhanced function to find closest incidents
  const findClosestIncidents = (
    queryLat,
    queryLon,
    queryDate = null,
    limit = 5
  ) => {
    console.log(
      `🔍 Finding closest incidents to (${queryLat}, ${queryLon}) from ${allFeaturesData.length} features`
    )

    if (!allFeaturesData.length) {
      console.log('❌ No features data available')
      return []
    }

    const incidents = allFeaturesData
      .filter(isIncidentPointFeature)
      .map((feature) => {
        let lat = null,
          lon = null,
          distance = Infinity

        // Extract coordinates for points only
        if (feature.geometry?.type === 'Point') {
          ;[lon, lat] = feature.geometry.coordinates
        }

        if (lat !== null && lon !== null) {
          distance = calculateDistance(queryLat, queryLon, lat, lon)
        }

        // Extract date information from properties
        let incidentDate = null
        const props = feature.properties || {}

        // Look for common date fields
        const dateFields = [
          'date',
          'incident_date',
          'timestamp',
          'created_at',
          'occurred_at',
          'report_date',
          'Acc_Time',
        ]
        for (const field of dateFields) {
          if (props[field]) {
            incidentDate = parseDate(props[field])
            if (incidentDate) break
          }
        }

        let timeDiff = Infinity
        if (queryDate && incidentDate) {
          timeDiff = Math.abs(queryDate.getTime() - incidentDate.getTime())
        }

        return {
          feature,
          coordinates: [lat, lon],
          distance,
          incidentDate,
          timeDiff,
          properties: props,
        }
      })
      .filter((item) => item.distance !== Infinity)

    // Sort by distance first, then by time if dates are available
    incidents.sort((a, b) => {
      if (queryDate && a.incidentDate && b.incidentDate) {
        // If we have a query date and both incidents have dates, prioritize time
        const timeDiffA = a.timeDiff
        const timeDiffB = b.timeDiff
        return timeDiffA - timeDiffB
      }
      // Otherwise sort by distance
      return a.distance - b.distance
    })

    console.log(
      `✅ Found ${incidents.length} incidents, returning top ${limit}`
    )
    return incidents.slice(0, limit)
  }
  const getLocationCoordinates = async (locationName) => {
    if (!locationName || typeof locationName !== 'string') {
      const retMessage = '⚠️ يرجى تقديم اسم موقع صحيح للبحث'
      return { result: retMessage }
    }

    // Clean and prepare the location name
    const cleanLocationName = locationName.trim()
    const enhancedName = `${cleanLocationName}, UAE`

    // Nominatim API endpoint with proper parameters
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enhancedName)}&limit=5&addressdetails=1&accept-language=en`
    console.log(`🔍 Searching for location: ${nominatimUrl}`)
    // Add timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    const response = await fetch(nominatimUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Dubai Demo App/1.0 (contact@example.com)', // Required by Nominatim
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('تم تجاوز حد الطلبات. يرجى المحاولة مرة أخرى لاحقاً.')
      } else {
        throw new Error(`فشل في الاتصال بخدمة الخرائط (${response.status})`)
      }
    }

    const results = await response.json()
    console.log(results)

    if (!results || results.length === 0) {
      const retMessage = `❌ لم يتم العثور على موقع بالاسم "${cleanLocationName}". جرب استخدام أسماء أكثر تحديداً.`
      return { result: retMessage }
    }

    // Filter results to prioritize Dubai/UAE locations
    const uaeResults = results.filter(
      (result) =>
        result.display_name.toLowerCase().includes('uae') ||
        result.display_name.toLowerCase().includes('dubai') ||
        result.display_name.toLowerCase().includes('emirates')
    )

    const bestResults = uaeResults.length > 0 ? uaeResults : results
    const topResult = bestResults[0]

    const lat = parseFloat(topResult.lat)
    const lon = parseFloat(topResult.lon)

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      throw new Error('إحداثيات غير صالحة من الخدمة')
    }

    // Create a summary of all found results
    const resultsSummary = bestResults
      .slice(1, 3)
      .map((result, index) => {
        const displayName = result.display_name
        const resultLat = parseFloat(result.lat)
        const resultLon = parseFloat(result.lon)
        return `${index}. ${displayName}\n   📍 (${resultLat.toFixed(6)}, ${resultLon.toFixed(6)})`
      })
      .join('\n\n')

    const retMessage = `📍 **تم العثور على الموقع بنجاح!**\n\n🎯 **الموقع الرئيسي:**\n${topResult.display_name}\n📊 **الإحداثيات:** ${lat.toFixed(6)}, ${lon.toFixed(6)}\n\n${bestResults.length > 1 ? `🔍 **نتائج أخرى محتملة:**\n${resultsSummary}` : ''}.`

    return { result: retMessage }
  }

  // Enhanced map action handler with high-severity analysis
  async function handleAction(actionObj, _actionId) {
    switch (actionObj.action) {
      case 'analyze-high-severity':
        return await analyzeHighSeverityIncidents()

      case 'create-heatmap': {
        const { intensity = 0.5, radius: heatRadius = 25 } = actionObj
        return await createHeatmap(intensity, heatRadius)
      }
      case 'find-closest-spatial': {
        const { lat, lon, limit = 5 } = actionObj
        if (lat !== undefined && lon !== undefined) {
          const closestIncidents = findClosestIncidents(lat, lon, null, limit)

          if (closestIncidents.length > 0) {
            const summary = closestIncidents
              .map((incident, index) => {
                const props = incident.properties
                const arabicName =
                  props.Acc_Name || props.Type_Ar || 'حادث مروري'
                const area =
                  props.COMM_NAME_AR || props.COMM_NAME_EN || 'منطقة غير محددة'
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
            return { result: retMessage, data: { closestIncidents } }
          } else {
            const retMessage = '⚠️ لم يتم العثور على حوادث في البيانات المحملة'
            return { result: retMessage, data: null }
          }
        }
        return 'lat or lon is not provided.'
      }
      case 'find-incidents-within-radius': {
        const { lat: cLat, lon: cLon, radius = 3, limit = 5 } = actionObj
        if (typeof cLat === 'number' && typeof cLon === 'number') {
          console.log('🔍 Total features available:', allFeaturesData.length)

          // Filter incident features (exclude crisis features)
          const incidentFeatures = allFeaturesData.filter(
            isIncidentPointFeature
          )
          console.log('🚨 Incident features found:', incidentFeatures.length)

          if (incidentFeatures.length === 0) {
            console.log('⚠️ No incident features found. Available source files:')
            const sourceFiles = [
              ...new Set(allFeaturesData.map((f) => f.sourceFile)),
            ]
            console.log('📁 Source files:', sourceFiles)

            // Show first few features for debugging
            const sampleFeatures = allFeaturesData.slice(0, 3)
            console.log(
              '📊 Sample features:',
              sampleFeatures.map((f) => ({
                sourceFile: f.sourceFile,
                geometry: f.geometry?.type,
                properties: Object.keys(f.properties || {}),
              }))
            )
          }

          const featuresWithin = incidentFeatures
            .map((feature) => {
              if (feature.geometry?.type !== 'Point') return null
              const [flon, flat] = feature.geometry.coordinates
              const dist = calculateDistance(cLat, cLon, flat, flon)
              return {
                feature,
                coordinates: [flat, flon],
                distance: dist,
                properties: feature.properties || {},
              }
            })
            .filter((it) => it && it.distance <= radius)
            .sort((a, b) => a.distance - b.distance) // Sort by distance
            .slice(0, limit) // Limit results

          if (featuresWithin.length > 0) {
            // Create a detailed summary
            const summary = featuresWithin
              .map((item, index) => {
                const props = item.properties
                const arabicName =
                  props.Acc_Name || props.Type_Ar || 'حادث مروري'
                const area =
                  props.COMM_NAME_AR || props.COMM_NAME_EN || 'منطقة غير محددة'
                const severity = props.Severity_Ar || 'غير محدد'
                return `${index + 1}. ${arabicName}\n   📍 ${area} - المسافة: ${item.distance.toFixed(2)} كم\n   🚨 الخطورة: ${severity}`
              })
              .join('\n\n')

            const retMessage = `🎯 تم العثور على ${featuresWithin.length} حوادث أقرب مكانياً:\n\n${summary}\n\n💡 انقر على العلامات الحمراء لمزيد من التفاصيل.`
            return { result: retMessage, data: { featuresWithin } }
          } else {
            const retMessage = '⚠️ لا توجد حوادث ضمن هذا النطاق.'
            return { result: retMessage, data: null }
          }
        } else {
          const retMessage = '⚠️ نحتاج إحداثيات صحيحة لبحث النطاق.'
          return { result: retMessage, data: null }
        }
      }

      case 'find-crisis-within-radius': {
        const { lat: cLat, lon: cLon, radius = 3, limit = 5 } = actionObj
        if (typeof cLat === 'number' && typeof cLon === 'number') {
          console.log('🔍 Total features available:', allFeaturesData.length)

          // Filter crisis features only
          const crisisFeatures = allFeaturesData.filter(isCrisisPointFeature)
          console.log('🌊 Crisis features found:', crisisFeatures.length)

          if (crisisFeatures.length === 0) {
            console.log('⚠️ No crisis features found. Available source files:')
            const sourceFiles = [
              ...new Set(allFeaturesData.map((f) => f.sourceFile)),
            ]
            console.log('📁 Source files:', sourceFiles)
          }

          const featuresWithin = crisisFeatures
            .map((feature) => {
              if (feature.geometry?.type !== 'Point') return null
              const [flon, flat] = feature.geometry.coordinates
              const dist = calculateDistance(cLat, cLon, flat, flon)
              return {
                feature,
                coordinates: [flat, flon],
                distance: dist,
                properties: feature.properties || {},
              }
            })
            .filter((it) => it && it.distance <= radius)
            .sort((a, b) => a.distance - b.distance) // Sort by distance
            .slice(0, limit) // Limit results

          if (featuresWithin.length > 0) {
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
            return { result: retMessage, data: { featuresWithin } }
          } else {
            const retMessage = '⚠️ لا توجد كوارث ضمن هذا النطاق.'
            return { result: retMessage, data: null }
          }
        } else {
          const retMessage = '⚠️ نحتاج إحداثيات صحيحة لبحث النطاق.'
          return { result: retMessage, data: null }
        }
      }

      case 'find-closest-temporal': {
        const { date: queryDateStr, limit: tempLimit = 5 } = actionObj
        const queryDate = parseDate(queryDateStr)

        if (queryDate) {
          const temporalIncidents = allFeaturesData
            .filter(isIncidentPointFeature)
            .map((feature) => {
              const props = feature.properties || {}
              let incidentDate = null

              const dateFields = [
                'date',
                'incident_date',
                'timestamp',
                'created_at',
                'occurred_at',
                'report_date',
                'Acc_Time',
              ]
              for (const field of dateFields) {
                if (props[field]) {
                  incidentDate = parseDate(props[field])
                  if (incidentDate) break
                }
              }

              if (!incidentDate) return null

              let lat = null,
                lon = null
              if (feature.geometry?.type === 'Point') {
                ;[lon, lat] = feature.geometry.coordinates
              }

              return {
                feature,
                coordinates: [lat, lon],
                incidentDate,
                timeDiff: Math.abs(
                  queryDate.getTime() - incidentDate.getTime()
                ),
                properties: props,
              }
            })
            .filter((item) => item !== null)
            .sort((a, b) => a.timeDiff - b.timeDiff)
            .slice(0, tempLimit)

          if (temporalIncidents.length > 0) {
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
            return { result: retMessage, data: { temporalIncidents } }
          } else {
            const retMessage =
              '⚠️ لم يتم العثور على حوادث بتواريخ صحيحة في البيانات'
            return { result: retMessage, data: null }
          }
        } else {
          const retMessage =
            '⚠️ لا يمكن تحليل التاريخ المعطى. استخدم صيغ مثل: 2024-01-15، 15/01/2024، أو 2024/01/15'
          return { result: retMessage, data: null }
        }
      }
      case 'filter-incidents-date-range': {
        const { startDate, endDate } = actionObj
        let start = parseDate(startDate)
        let end = parseDate(endDate)
        if (!start || !end) {
          const retMessage = '⚠️ تواريخ غير صالحة. استخدم صيغة مثل 2024-12-01.'
          return { result: retMessage, data: null }
        }
        // Normalize inverted ranges
        if (start > end) {
          const tmp = start
          start = end
          end = tmp
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
        const items = allFeaturesData
          .filter(isIncidentPointFeature)
          .map((feature) => {
            const props = feature.properties || {}
            const dateFields = [
              'date',
              'incident_date',
              'timestamp',
              'created_at',
              'occurred_at',
              'report_date',
              'Acc_Time',
            ]
            let d = null
            for (const f of dateFields) {
              if (props[f]) {
                d = parseDate(props[f])
                if (d) break
              }
            }
            if (!d) return null
            if (d >= start && d <= end) {
              if (feature.geometry?.type === 'Point') {
                const [lon, lat] = feature.geometry.coordinates
                return {
                  feature,
                  coordinates: [lat, lon],
                  distance: 0,
                  incidentDate: d,
                  properties: props,
                }
              }
            }
            return null
          })
          .filter((x) => x !== null)

        if (items.length > 0) {
          const retMessage = `✅ تم العثور على ${items.length} حادث ضمن الفترة المحددة.`
          return { result: retMessage, data: { items } }
        } else {
          const retMessage = '⚠️ لا توجد حوادث ضمن هذا النطاق الزمني.'
          return { result: retMessage, data: null }
        }
      }
      case 'clear': {
        const retMessage = '🧹 تم مسح جميع النتائج من الخريطة'
        return { result: retMessage, data: null }
      }

      case 'filter-by-property': {
        const { property, value, limit: filterLimit = 10 } = actionObj
        if (property && value) {
          const matchingFeatures = allFeaturesData
            .filter(isIncidentPointFeature)
            .filter((feature) => {
              const props = feature.properties || {}
              return Object.values(props).some((propValue) =>
                String(propValue)
                  .toLowerCase()
                  .includes(String(value).toLowerCase())
              )
            })
            .slice(0, filterLimit)
            .map((feature) => ({
              feature,
              coordinates: [
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ],
              distance: 0,
              properties: feature.properties || {},
            }))

          if (matchingFeatures.length > 0) {
            const retMessage = `🔍 تم العثور على ${matchingFeatures.length} حادث يحتوي على "${value}" - مُظلل بالأخضر على الخريطة.`
            return { result: retMessage, data: { matchingFeatures } }
          } else {
            const retMessage = `⚠️ لم يتم العثور على حوادث تحتوي على "${value}"`
            return { result: retMessage, data: null }
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
            resourceType,
            searchRadius
          )
        }
        return {
          resilt: `lat or lon were not provided [lat (${resLat}), lon (${resLon})]`,
          data: null,
        }
      }

      case 'population-distribution':
        return await showPopulationDistribution()

      case 'route-to': {
        const { startLat, startLon, endLat, endLon } = actionObj
        if (
          typeof startLat === 'number' &&
          typeof startLon === 'number' &&
          typeof endLat === 'number' &&
          typeof endLon === 'number'
        ) {
          return await routeBetweenPoints(startLat, startLon, endLat, endLon)
        } else {
          const retMessage =
            '⚠️ نحتاج إلى نقطتي انطلاق ووجهة صالحتيْن لحساب المسار'
          return { result: retMessage, data: null }
        }
      }

      case 'route-to-destination': {
        const { endLat, endLon } = actionObj
        if (typeof endLat === 'number' && typeof endLon === 'number') {
          return await routeToDestination(endLat, endLon)
        } else {
          const retMessage = '⚠️ نحتاج إلى إحداثيات صحيحة للوجهة لحساب المسار'
          return { result: retMessage, data: null }
        }
      }

      case 'top-roads-by-incidents': {
        const { limit: topN = 10 } = actionObj
        // Common road-related fields spotted in dataset
        const roadFields = [
          'Street_Name_Ar',
          'Street_Name',
          'Route_Name_AR',
          'Route_Name',
          'ROAD_NAME_AR',
          'ROAD_NAME',
          'STREET_NAME',
          'ST_Name',
        ]
        const counts = new Map()
        const examplesByRoad = new Map()

        allFeaturesData.filter(isIncidentPointFeature).forEach((feature) => {
          const props = feature.properties || {}
          let road = null
          for (const f of roadFields) {
            if (props[f]) {
              road = String(props[f]).trim()
              break
            }
          }
          if (!road || road === 'null' || road === '') return
          counts.set(road, (counts.get(road) || 0) + 1)
          if (!examplesByRoad.has(road)) examplesByRoad.set(road, [])
          if (examplesByRoad.get(road).length < 3) {
            examplesByRoad.get(road).push(feature)
          }
        })

        const sorted = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, topN)

        if (sorted.length === 0) {
          const retMessage = '⚠️ لا توجد بيانات طرق كافية لحساب الترتيب.'
          return { result: retMessage, data: null }
        }

        // Prepare summary message
        const summary = sorted
          .map(([road, count], idx) => `${idx + 1}. ${road}: ${count} حادث`)
          .join('\n')
        const retMessage = `🏅 أعلى ${sorted.length} طرق تسجيلاً للحوادث:\n\n${summary}`

        // Collect sample incidents to display on map
        const sampleIncidents = []
        for (const [road] of sorted) {
          const feats = (examplesByRoad.get(road) || []).map((feature) => {
            const [lon, lat] = feature.geometry.coordinates
            return {
              feature,
              coordinates: [lat, lon],
              distance: 0,
              properties: feature.properties || {},
            }
          })
          sampleIncidents.push(...feats)
        }

        return { result: retMessage, data: { sampleIncidents } }
      }

      case 'top-incident-types': {
        const { limit: topN = 10 } = actionObj
        const typeFields = ['Acc_Name', 'Type_Ar', 'Type'] // common fields
        const counts = new Map()
        const examplesByType = new Map()

        allFeaturesData.filter(isIncidentPointFeature).forEach((feature) => {
          const props = feature.properties || {}
          let t = null
          for (const f of typeFields) {
            if (props[f]) {
              t = String(props[f]).trim()
              break
            }
          }
          if (!t || t === 'null' || t === '') return
          counts.set(t, (counts.get(t) || 0) + 1)
          if (!examplesByType.has(t)) examplesByType.set(t, [])
          if (examplesByType.get(t).length < 3) {
            examplesByType.get(t).push(feature)
          }
        })

        const sorted = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, topN)

        if (sorted.length === 0) {
          const retMessage =
            '⚠️ لا توجد بيانات كافية لتحديد الأنواع الأكثر تكراراً.'
          return { result: retMessage, data: null }
        }

        const summary = sorted
          .map(([name, count], idx) => `${idx + 1}. ${name}: ${count}`)
          .join('\n')
        const retMessage = `📊 أكثر أنواع الحوادث تكراراً:\n\n${summary}`
        // Display sample incidents from top categories on the map
        const sampleIncidents = []
        for (const [typeName] of sorted) {
          const feats = (examplesByType.get(typeName) || []).map((feature) => {
            const [lon, lat] = feature.geometry.coordinates
            return {
              feature,
              coordinates: [lat, lon],
              distance: 0,
              properties: feature.properties || {},
            }
          })
          sampleIncidents.push(...feats)
        }
        return { result: retMessage, data: { sampleIncidents } }
      }

      case 'compare-incident-counts': {
        const { area1, area2 } = actionObj
        const areaFields = [
          'COMM_NAME_AR',
          'COMM_NAME_EN',
          'COMM_FULL_NAME_AR',
          'COMM_FULL_NAME_EN',
          'Area',
          'AREA',
        ]

        const normalize = (s) =>
          String(s || '')
            .toLowerCase()
            .trim()
        const target1 = normalize(area1)
        const target2 = normalize(area2)

        let count1 = 0,
          count2 = 0
        const sample1 = [],
          sample2 = []

        allFeaturesData.filter(isIncidentPointFeature).forEach((feature) => {
          const props = feature.properties || {}
          let areaVal = null
          for (const f of areaFields) {
            if (props[f]) {
              areaVal = props[f]
              break
            }
          }
          if (!areaVal) return
          const norm = normalize(areaVal)
          if (norm.includes(target1)) {
            count1 += 1
            if (sample1.length < 3) sample1.push(feature)
          } else if (norm.includes(target2)) {
            count2 += 1
            if (sample2.length < 3) sample2.push(feature)
          }
        })
        const sampleIncidents = [...sample1, ...sample2].map((feature) => {
          const [lon, lat] = feature.geometry.coordinates
          return {
            feature,
            coordinates: [lat, lon],
            distance: 0,
            properties: feature.properties || {},
          }
        })
        const retMessage = `📊 مقارنة عدد الحوادث:\n- ${area1}: ${count1}\n- ${area2}: ${count2}`
        return { result: retMessage, data: { sampleIncidents } }
      }

      case 'filter-major-roads-incidents': {
        // Detect major road classification from common fields
        const classFields = [
          'Street_Class_Ar',
          'Street_Class',
          'ROAD_CLASS',
          'Road_Class',
        ]
        const majorPatterns = [
          /شرياني|سريعة|رئيسي|رئيسية/i, // Arabic: arterial, highways, main
          /arterial|highway|primary|major|main/i,
        ]

        const matchesMajor = (val) =>
          majorPatterns.some((re) => re.test(String(val || '')))

        const selected = allFeaturesData
          .filter(isIncidentPointFeature)
          .map((feature) => {
            const props = feature.properties || {}
            let klass = null
            for (const f of classFields) {
              if (props[f]) {
                klass = props[f]
                break
              }
            }
            if (!klass || !matchesMajor(klass)) return null
            const [lon, lat] = feature.geometry.coordinates
            return {
              feature,
              coordinates: [lat, lon],
              distance: 0,
              properties: props,
            }
          })
          .filter((x) => x !== null)

        if (selected.length > 0) {
          const retMessage = `🚧 تم عرض ${selected.length} حادث على الطرق الرئيسية فقط.`
          return { result: retMessage, data: { selected } }
        } else {
          const retMessage =
            '⚠️ لم يتم العثور على حوادث مصنفة على طرق رئيسية في البيانات.'
          return { result: retMessage, data: null }
        }
      }

      case 'filter-by-keywords': {
        const { keywords = [], status = null, dataset = null } = actionObj

        const genericDisasterTerms = ['كارثة', 'كوارث', 'disaster', 'crisis']
        const effectiveKeywords = keywords.some((k) =>
          genericDisasterTerms.includes(String(k).toLowerCase())
        )
          ? []
          : keywords

        const list = allFeaturesData
          .filter((feature) => {
            if (!isPointFeature(feature)) return false
            if (!dataset) return true
            const src = String(feature.sourceFile || '').toLowerCase()
            if (dataset === 'crisis') {
              return (
                src.includes('crisis') ||
                (src.includes('resources') === false &&
                  src.includes('traffic') === false)
              )
            }
            return true
          })
          .map((feature) => {
            const props = feature.properties || {}
            const propValues = Object.values(props).map((v) =>
              String(v || '').toLowerCase()
            )

            // keyword match across any property value
            const matchKeyword =
              effectiveKeywords.length === 0 ||
              effectiveKeywords.some((k) => {
                const kk = String(k).toLowerCase()
                return propValues.some((pv) => pv.includes(kk))
              })

            // status match (open/closed) - search common fields if status requested
            let statusVal = ''
            if (status) {
              const statusFields = [
                'Status',
                'STATUS',
                'case_status',
                'Case_Status',
                'حالة',
                'الحالة',
              ]
              for (const f of statusFields) {
                if (props[f] !== undefined) {
                  statusVal = String(props[f]).toLowerCase()
                  break
                }
              }
            }
            const matchStatus = !status
              ? true
              : status === 'open'
                ? /open|ongoing|active|مفتوح|مفتوحة|جارية|نشطة/.test(statusVal)
                : /closed|resolved|completed|closed case|مغلق|مغلقة|مقفول|منتهية|انتهت/.test(
                    statusVal
                  )

            if (!(matchKeyword && matchStatus)) return null
            if (feature.geometry?.type !== 'Point') return null
            const [lon, lat] = feature.geometry.coordinates
            return {
              feature,
              coordinates: [lat, lon],
              distance: 0,
              properties: props,
            }
          })
          .filter((x) => x !== null)

        if (list.length > 0) {
          const retMessage = `✅ تم العثور على ${list.length} حدث مطابق.`
          return { result: retMessage, data: { list } }
        } else {
          const retMessage = '⚠️ لا توجد أحداث مطابقة للمعايير.'
          return { result: retMessage, data: null }
        }
      }

      case 'show-crisis-grouped-status': {
        // Split crisis features into open vs closed by status-like fields
        const statusFields = [
          'status',
          'Status',
          'STATUS',
          'case_status',
          'Case_Status',
          'الحالة',
          'حالة',
        ]

        console.log('🔍 تحليل الكوارث - الحقول المستخدمة:', statusFields)
        console.log('📊 إجمالي البيانات المتاحة:', allFeaturesData.length)

        const toStatus = (props) => {
          // البحث في جميع الحقول الممكنة للحالة
          let val = statusFields
            .map((f) => props[f])
            .find((v) => v !== undefined)

          // إذا لم نجد في الحقول المحددة، نبحث في جميع الخصائص
          if (!val) {
            for (const [key, value] of Object.entries(props || {})) {
              const keyLower = key.toLowerCase()
              const valueStr = String(value || '').toLowerCase()

              // البحث عن كلمات مفتاحية في أسماء الحقول
              if (
                keyLower.includes('status') ||
                keyLower.includes('حالة') ||
                keyLower.includes('state')
              ) {
                val = value
                break
              }

              // البحث عن كلمات مفتاحية في القيم
              if (
                valueStr.includes('open') ||
                valueStr.includes('مفتوح') ||
                valueStr.includes('جاري') ||
                valueStr.includes('closed') ||
                valueStr.includes('مغلق') ||
                valueStr.includes('منتهي')
              ) {
                val = value
                break
              }
            }
          }

          const s = String(val || '').toLowerCase()
          console.log('🔍 قيمة الحالة:', val, '->', s)

          // تسجيل تفصيلي للتشخيص
          const isOpen =
            /open|ongoing|active|مفتوح|مفتوحة|جارية|نشطة|قيد التنفيذ|قيد المعالجة/.test(
              s
            )
          const isClosed =
            /closed|resolved|completed|closed case|مغلق|مغلقة|مقفول|منتهية|انتهت|مكتمل|تم الحل/.test(
              s
            )
          console.log('🔍 تحليل الحالة:', { val, s, isOpen, isClosed })

          if (
            /open|ongoing|active|مفتوح|مفتوحة|جارية|نشطة|قيد التنفيذ|قيد المعالجة/.test(
              s
            )
          )
            return 'open'
          if (
            /closed|resolved|completed|closed case|مغلق|مغلقة|مقفول|منتهية|انتهت|مكتمل|تم الحل/.test(
              s
            )
          )
            return 'closed'
          return 'unknown'
        }

        const crisisFeatures = allFeaturesData.filter((f) => {
          const src = String(f.sourceFile || '').toLowerCase()
          return (
            f.geometry?.type === 'Point' &&
            (src.includes('crisis') ||
              (!src.includes('traffic') && !src.includes('resources')))
          )
        })

        console.log('🔍 الكوارث المفلترة:', crisisFeatures.length)
        console.log(
          '🔍 عينات من الكوارث:',
          crisisFeatures.slice(0, 5).map((f) => ({
            sourceFile: f.sourceFile,
            properties: f.properties,
            status: toStatus(f.properties || {}),
            allPropertyKeys: Object.keys(f.properties || {}),
          }))
        )

        // تحليل جميع الحقول المتاحة في البيانات
        const allPropertyKeys = new Set()
        crisisFeatures.forEach((f) => {
          Object.keys(f.properties || {}).forEach((key) =>
            allPropertyKeys.add(key)
          )
        })
        console.log(
          '🔍 جميع الحقول المتاحة في بيانات الكوارث:',
          Array.from(allPropertyKeys)
        )

        const openList = []
        const closedList = []
        const unknownList = []

        crisisFeatures.forEach((feature) => {
          const s = toStatus(feature.properties || {})
          const [lon, lat] = feature.geometry.coordinates
          const item = {
            feature,
            coordinates: [lat, lon],
            distance: 0,
            properties: feature.properties || {},
          }
          if (s === 'open') openList.push(item)
          else if (s === 'closed') closedList.push(item)
          else unknownList.push(item)
        })

        console.log('📊 نتائج التصنيف:', {
          open: openList.length,
          closed: closedList.length,
          unknown: unknownList.length,
        })

        // تسجيل تفاصيل كل مجموعة
        if (openList.length > 0) {
          console.log(
            '🟢 الكوارث المفتوحة:',
            openList.map((item) => ({
              name: item.properties.name,
              status: item.properties.status,
              coordinates: item.coordinates,
            }))
          )
        }

        if (closedList.length > 0) {
          console.log(
            '🩶 الكوارث المغلقة:',
            closedList.map((item) => ({
              name: item.properties.name,
              status: item.properties.status,
              coordinates: item.coordinates,
            }))
          )
        }

        if (unknownList.length > 0) {
          console.log(
            '🟡 الكوارث غير المعروفة:',
            unknownList.map((item) => ({
              name: item.properties.name,
              status: item.properties.status,
              allProperties: item.properties,
              coordinates: item.coordinates,
            }))
          )
        }

        // Display closed then open, with different colors
        if (openList.length + closedList.length === 0) {
          if (unknownList.length > 0) {
            const retMessage = `⚠️ لا توجد كوارث تحمل حالة مفتوحة أو مغلقة. يوجد ${unknownList.length} كارثة بحالة غير معروفة.`
            console.log(
              '🔍 الكوارث بحالة غير معروفة:',
              unknownList.slice(0, 3).map((f) => ({
                sourceFile: f.feature.sourceFile,
                properties: f.feature.properties,
              }))
            )
            return retMessage
          } else {
            const retMessage = '⚠️ لا توجد كوارث تحمل حالة مفتوحة أو مغلقة.'
            return retMessage
          }
        }

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
          closedList.forEach((i) => {
            i.feature.properties = {
              ...(i.feature.properties || {}),
              _highlightColor: '#7f8c8d',
            }
          })
          retMessage += `🩶 الكوارث المغلقة: ${closedList.length}\n`
          displayedCount += closedList.length
        }

        // إضافة الكوارث المفتوحة
        if (openList.length > 0) {
          openList.forEach((i) => {
            i.feature.properties = {
              ...(i.feature.properties || {}),
              _highlightColor: '#27ae60',
            }
          })
          retMessage += `🟢 الكوارث المفتوحة: ${openList.length}\n`
          displayedCount += openList.length
        }

        // إضافة الكوارث غير المعروفة
        if (unknownList.length > 0) {
          unknownList.forEach((i) => {
            i.feature.properties = {
              ...(i.feature.properties || {}),
              _highlightColor: '#f39c12',
            }
          })
          retMessage += `🟡 الكوارث بحالة غير معروفة: ${unknownList.length}\n`
          displayedCount += unknownList.length
        }

        retMessage += `\n📈 **الإجمالي:** ${displayedCount} كارثة`
        return {
          result: retMessage,
          data: { openList, closedList, unknownList },
        }
      }
      case 'get-location': {
        const { locationName } = actionObj
        if (locationName && typeof locationName === 'string') {
          return await getLocationCoordinates(locationName)
        } else {
          const retMessage = '⚠️ لم يتم تقديم اسم الموقع للبحث'
          return { result: retMessage }
        }
      }

      // NEW: Comprehensive risk analysis for UAE
      case 'analyze-comprehensive-risks': {
        const { timeRange, includeHeatmap, riskTypes } = actionObj
        const { result } = await analyzeComprehensiveRisks(
          timeRange,
          includeHeatmap,
          riskTypes
        )
        const { data } = await createHeatmap()
        return { result, data }
        // const crisisFeatures = allFeaturesData.filter(isCrisisPointFeature)

        // if (crisisFeatures.length === 0) {
        //   console.log('⚠️ No crisis features found. Available source files:')
        //   const sourceFiles = [
        //     ...new Set(allFeaturesData.map((f) => f.sourceFile)),
        //   ]
        //   console.log('📁 Source files:', sourceFiles)
        // }

        // const featuresWithin = crisisFeatures.map((feature) => {
        //   if (feature.geometry?.type !== 'Point') return null
        //   const [flon, flat] = feature.geometry.coordinates
        //   return {
        //     feature,
        //     coordinates: [flat, flon],
        //     distance: 0,
        //     properties: feature.properties || {},
        //   }
        // })
        // return { result, data: { featuresWithin } }
      }
      // Add this case to the handleAction switch statement (around line 2210)

      case 'analyze-critical-infrastructure': {
        const { radius = 2.0, facilityType = 'all', limit = 10 } = actionObj
        return await analyzeCriticalInfrastructure(radius, facilityType, limit)
      }

      default:
        console.warn('Unhandled MAP_ACTION:', actionObj)
        return { result: `unknown tool call ${actionObj.type}`, data: null }
    }
  }

  return {
    handleAction,
  }
}

// NEW: Comprehensive risk analysis for UAE
const analyzeComprehensiveRisks = async () => {
  try {
    // Mock data for comprehensive risk analysis
    const mockRiskData = {
      natural: {
        name: 'المخاطر الطبيعية',
        risks: [
          {
            type: 'فيضانات',
            count: 4,
            severity: 'عالية',
            frequency: 'موسمية',
            peakMonths: ['ديسمبر', 'يناير', 'فبراير'],
          },
          {
            type: 'حرائق طبيعية',
            count: 2,
            severity: 'عالية',
            frequency: 'صيفية',
            peakMonths: ['يونيو', 'يوليو', 'أغسطس'],
          },
        ],
      },
      human: {
        name: 'المخاطر البشرية',
        risks: [
          {
            type: 'حوادث مرورية',
            count: 1341,
            severity: 'عالية جداً',
            frequency: 'يومية',
            peakMonths: ['جميع الأشهر'],
          },
          {
            type: 'حرائق مباني',
            count: 187,
            severity: 'عالية',
            frequency: 'شهرية',
            peakMonths: ['يوليو', 'أغسطس'],
          },
          {
            type: 'تسربات مياه',
            count: 98,
            severity: 'منخفضة',
            frequency: 'شهرية',
            peakMonths: ['جميع الأشهر'],
          },
        ],
      },
      industrial: {
        name: 'المخاطر الصناعية',
        risks: [
          {
            type: 'تلوث بيئي',
            count: 134,
            severity: 'متوسطة',
            frequency: 'شهرية',
            peakMonths: ['جميع الأشهر'],
          },
          {
            type: 'أعطال مصانع',
            count: 78,
            severity: 'منخفضة',
            frequency: 'شهرية',
            peakMonths: ['يوليو', 'أغسطس'],
          },
        ],
      },
    }

    // Mock geographic distribution by emirate
    const emiratesDistribution = {
      دبي: {
        total: 1023,
        natural: 3,
        human: 789,
        industrial: 234,
      },
      أبوظبي: {
        total: 1159,
        natural: 1,
        human: 890,
        industrial: 267,
      },
      الفجيرة: {
        total: 94,
        natural: 2,
        human: 67,
        industrial: 23,
      },
    }

    // Generate comprehensive analysis report
    let analysisReport = `📊 **تحليل شامل للمخاطر في دولة الإمارات العربية المتحدة**\n*الفترة: السنوات الخمس الأخيرة (2021-2025)*\n\n`

    // 1. Risk Classification
    analysisReport += `## 1️⃣ تصنيف المخاطر حسب النوع:\n\n`

    let totalRisks = 0
    const categoryTotals = {}

    Object.entries(mockRiskData).forEach(([category, data]) => {
      const categoryTotal = data.risks.reduce(
        (sum, risk) => sum + risk.count,
        0
      )
      categoryTotals[category] = categoryTotal
      totalRisks += categoryTotal

      analysisReport += `### 🔸 ${data.name}: ${categoryTotal} حادث\n`
      data.risks.forEach((risk) => {
        analysisReport += `   • ${risk.type}: ${risk.count} (خطورة: ${risk.severity})\n`
      })
      analysisReport += `\n`
    })

    // 2. Geographic Distribution
    analysisReport += `## 2️⃣ التوزيع الجغرافي حسب الإمارات:\n\n`

    const sortedEmirates = Object.entries(emiratesDistribution).sort(
      ([, a], [, b]) => b.total - a.total
    )

    sortedEmirates.forEach(([emirate, data], index) => {
      const percentage = ((data.total / totalRisks) * 100).toFixed(1)
      analysisReport += `${index + 1}. **${emirate}**: ${data.total} (${percentage}%)\n`
      analysisReport += `   - طبيعية: ${data.natural} | بشرية: ${data.human} | صناعية: ${data.industrial}\n\n`
    })

    // 3. Frequency and Seasonality Patterns
    analysisReport += `## 3️⃣ دورية وتكرار المخاطر:\n\n`

    const frequencyCategories = {
      يومية: [],
      أسبوعية: [],
      شهرية: [],
      موسمية: [],
      'ربع سنوية': [],
      سنوية: [],
      'غير منتظمة': [],
    }

    Object.values(mockRiskData).forEach((category) => {
      category.risks.forEach((risk) => {
        if (frequencyCategories[risk.frequency]) {
          frequencyCategories[risk.frequency].push(
            `${risk.type} (${risk.count})`
          )
        }
      })
    })

    Object.entries(frequencyCategories).forEach(([frequency, risks]) => {
      if (risks.length > 0) {
        analysisReport += `### 📅 ${frequency}:\n`
        risks.forEach((risk) => {
          analysisReport += `   • ${risk}\n`
        })
        analysisReport += `\n`
      }
    })

    // 4. Seasonal Analysis
    analysisReport += `## 4️⃣ التحليل الموسمي:\n\n`

    const seasonalData = {
      'الشتاء (ديسمبر-فبراير)': ['فيضانات'],
      'الصيف (يونيو-أغسطس)': ['حرائق طبيعية', 'حرائق مباني', 'أعطال مصانع'],
    }

    Object.entries(seasonalData).forEach(([season, risks]) => {
      analysisReport += `### 🌡️ ${season}:\n`
      risks.forEach((risk) => {
        analysisReport += `   • ${risk}\n`
      })
      analysisReport += `\n`
    })

    analysisReport += `\n## 📈 الإحصائيات الإجمالية:\n`
    analysisReport += `• إجمالي المخاطر المسجلة: **${totalRisks.toLocaleString()}**\n`
    analysisReport += `• أكثر الفئات خطورة: **المخاطر البشرية** (${categoryTotals.human})\n`
    analysisReport += `• أكثر الإمارات تضرراً: **${sortedEmirates[0][0]}** (${sortedEmirates[0][1].total})\n`
    analysisReport += `• نمط التكرار الأعلى: **يومية** (حوادث مرورية)\n\n`

    analysisReport += `💡 **التوصيات:**\n`
    analysisReport += `1. تكثيف الرقابة المرورية لتقليل الحوادث\n`
    analysisReport += `2. تحسين أنظمة الإنذار المبكر للفيضانات\n`
    analysisReport += `3. تطوير بروتوكولات السلامة الصناعية\n`
    analysisReport += `4. تعزيز الأمن السيبراني للحماية من الهجمات الإلكترونية`

    console.log('✅ تم إكمال التحليل الشامل للمخاطر')

    return {
      result: analysisReport,
      data: {
        mockRiskData,
        emiratesDistribution,
        totalRisks,
        categoryTotals,
      },
    }
  } catch (error) {
    console.error('فشل في التحليل الشامل للمخاطر:', error)
    const retMessage = `❌ فشل في إجراء التحليل الشامل للمخاطر: ${error.message}`
    return { result: retMessage, data: null }
  }
}
