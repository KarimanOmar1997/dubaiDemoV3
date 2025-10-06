// server.js - GeoJSON File Manager Backend Service
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('node:fs')
const path = require('node:path')
const { OllamaLLM } = require('./LLMs/Ollama.js')
const { llmActions } = require('./llm_actions.js')
const { log } = require('node:console')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')))

// Ensure public/geojson directory exists
const publicGeojsonDir = path.join(__dirname, 'public', 'geojson')
if (!fs.existsSync(publicGeojsonDir)) {
  fs.mkdirSync(publicGeojsonDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, publicGeojsonDir)
  },
  filename: (_req, file, cb) => {
    // Keep original filename or add timestamp if duplicate
    const originalName = file.originalname
    const filePath = path.join(publicGeojsonDir, originalName)

    if (fs.existsSync(filePath)) {
      const timestamp = Date.now()
      const ext = path.extname(originalName)
      const name = path.basename(originalName, ext)
      cb(null, `${name}_${timestamp}${ext}`)
    } else {
      cb(null, originalName)
    }
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['.geojson', '.json']
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Only .geojson and .json files are allowed'), false)
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Helper function to validate GeoJSON
const validateGeoJSON = (data) => {
  const errors = []
  const warnings = []

  try {
    if (!data.type) {
      errors.push('Missing required "type" property')
    } else if (data.type !== 'FeatureCollection' && data.type !== 'Feature') {
      errors.push(
        `Invalid type: ${data.type}. Must be "FeatureCollection" or "Feature"`
      )
    }

    if (data.type === 'FeatureCollection') {
      if (!data.features || !Array.isArray(data.features)) {
        errors.push('FeatureCollection must have a "features" array')
      } else if (data.features.length === 0) {
        warnings.push('FeatureCollection is empty (no features)')
      }
    }

    if (data.features) {
      data.features.forEach((feature, index) => {
        if (!feature.type || feature.type !== 'Feature') {
          errors.push(`Feature ${index + 1}: Invalid or missing type`)
        }
        if (!feature.geometry) {
          warnings.push(`Feature ${index + 1}: Missing geometry`)
        }
      })
    }
  } catch (error) {
    errors.push(`Validation error: ${error.message}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

// Helper function to calculate bounds
const calculateBounds = (geojsonData) => {
  if (!geojsonData.features || geojsonData.features.length === 0) return null

  let minLng = Infinity,
    minLat = Infinity
  let maxLng = -Infinity,
    maxLat = -Infinity

  const processCoords = (coords) => {
    if (typeof coords[0] === 'number') {
      minLng = Math.min(minLng, coords[0])
      maxLng = Math.max(maxLng, coords[0])
      minLat = Math.min(minLat, coords[1])
      maxLat = Math.max(maxLat, coords[1])
    } else {
      coords.forEach(processCoords)
    }
  }

  geojsonData.features.forEach((feature) => {
    if (feature.geometry?.coordinates) {
      processCoords(feature.geometry.coordinates)
    }
  })

  if (minLng === Infinity) return null

  return { minLng, minLat, maxLng, maxLat }
}

// Helper function to get geometry types
const getGeometryTypes = (geojsonData) => {
  if (!geojsonData.features) return []

  const types = new Set()
  geojsonData.features.forEach((feature) => {
    if (feature.geometry?.type) {
      types.add(feature.geometry.type)
    }
  })

  return Array.from(types)
}

// Helper function to get property keys
const getPropertyKeys = (geojsonData) => {
  if (!geojsonData.features) return []

  const keys = new Set()
  geojsonData.features.forEach((feature) => {
    if (feature.properties) {
      Object.keys(feature.properties).forEach((key) => keys.add(key))
    }
  })

  return Array.from(keys).slice(0, 10)
}

// Routes

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'GeoJSON Backend Service is running' })
})

// Get all files in public/geojson directory
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(publicGeojsonDir)
    const fileList = files
      .filter((file) => file.endsWith('.geojson') || file.endsWith('.json'))
      .map((filename) => {
        const filePath = path.join(publicGeojsonDir, filename)
        const stats = fs.statSync(filePath)
        const publicPath = `/public/geojson/${filename}`
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

        try {
          const content = fs.readFileSync(filePath, 'utf8')
          const geojsonData = JSON.parse(content)
          const validation = validateGeoJSON(geojsonData)

          return {
            id: filename,
            name: filename,
            size: stats.size,
            uploadDate: stats.mtime,
            savedDate: stats.mtime,
            publicPath,
            publicUrl,
            isPublic: true,
            isValid: validation.isValid,
            errors: validation.errors,
            warnings: validation.warnings,
            featureCount: geojsonData.features
              ? geojsonData.features.length
              : 0,
            bounds: calculateBounds(geojsonData),
            geometryTypes: getGeometryTypes(geojsonData),
            properties: getPropertyKeys(geojsonData),
            data: geojsonData,
          }
        } catch (error) {
          return {
            id: filename,
            name: filename,
            size: stats.size,
            uploadDate: stats.mtime,
            savedDate: stats.mtime,
            publicPath,
            publicUrl,
            isPublic: true,
            isValid: false,
            errors: [`Invalid JSON: ${error.message}`],
            warnings: [],
            featureCount: 0,
            bounds: null,
            geometryTypes: [],
            properties: [],
          }
        }
      })

    res.json({ files: fileList })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to read public directory',
      details: error.message,
    })
  }
})

// Upload single file
app.post('/api/upload', upload.single('geojson'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const filePath = req.file.path
    const filename = req.file.filename
    const publicPath = `/public/geojson/${filename}`
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

    // Read and validate the uploaded file
    const content = fs.readFileSync(filePath, 'utf8')
    const geojsonData = JSON.parse(content)
    const validation = validateGeoJSON(geojsonData)

    const fileInfo = {
      id: filename,
      name: filename,
      size: req.file.size,
      uploadDate: new Date(),
      savedDate: new Date(),
      publicPath,
      publicUrl,
      isPublic: true,
      isValid: validation.isValid,
      errors: validation.errors,
      warnings: validation.warnings,
      featureCount: geojsonData.features ? geojsonData.features.length : 0,
      bounds: calculateBounds(geojsonData),
      geometryTypes: getGeometryTypes(geojsonData),
      properties: getPropertyKeys(geojsonData),
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileInfo,
    })
  } catch (error) {
    // Clean up file if validation failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(400).json({
      success: false,
      error: 'Invalid GeoJSON file',
      details: error.message,
    })
  }
})

// Upload multiple files
app.post('/api/upload-multiple', upload.array('geojson', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const results = []
    const errors = []

    req.files.forEach((file) => {
      try {
        const filePath = file.path
        const filename = file.filename
        const publicPath = `/public/geojson/${filename}`
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

        // Read and validate the uploaded file
        const content = fs.readFileSync(filePath, 'utf8')
        const geojsonData = JSON.parse(content)
        const validation = validateGeoJSON(geojsonData)

        const fileInfo = {
          id: filename,
          name: filename,
          size: file.size,
          uploadDate: new Date(),
          savedDate: new Date(),
          publicPath,
          publicUrl,
          isPublic: true,
          isValid: validation.isValid,
          errors: validation.errors,
          warnings: validation.warnings,
          featureCount: geojsonData.features ? geojsonData.features.length : 0,
          bounds: calculateBounds(geojsonData),
          geometryTypes: getGeometryTypes(geojsonData),
          properties: getPropertyKeys(geojsonData),
        }

        results.push(fileInfo)
      } catch (error) {
        // Clean up file if validation failed
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
        errors.push({
          filename: file.originalname,
          error: error.message,
        })
      }
    })

    res.json({
      success: true,
      message: `${results.length} files uploaded successfully`,
      files: results,
      errors: errors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: error.message,
    })
  }
})

// Save existing file data to public folder
app.post('/api/save-to-public', (req, res) => {
  try {
    const { filename, data } = req.body

    if (!filename || !data) {
      return res.status(400).json({ error: 'Filename and data are required' })
    }

    // Validate GeoJSON data
    const validation = validateGeoJSON(data)
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid GeoJSON data',
        details: validation.errors,
      })
    }

    // Create safe filename
    const safeFilename = filename
    // const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(publicGeojsonDir, safeFilename)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      const timestamp = Date.now()
      const ext = path.extname(safeFilename)
      const name = path.basename(safeFilename, ext)
      const newFilename = `${name}_${timestamp}${ext}`
      const newFilePath = path.join(publicGeojsonDir, newFilename)

      fs.writeFileSync(newFilePath, JSON.stringify(data, null, 2))

      const publicPath = `/public/geojson/${newFilename}`
      const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

      return res.json({
        success: true,
        message: 'File saved to public folder (renamed to avoid conflict)',
        filename: newFilename,
        publicPath,
        publicUrl,
      })
    }

    // Save file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    const publicPath = `/public/geojson/${safeFilename}`
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

    res.json({
      success: true,
      message: 'File saved to public folder successfully',
      filename: safeFilename,
      publicPath,
      publicUrl,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save file',
      details: error.message,
    })
  }
})

// Delete file from public folder
app.delete('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(publicGeojsonDir, filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    fs.unlinkSync(filePath)

    res.json({
      success: true,
      message: 'File deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete file',
      details: error.message,
    })
  }
})

// Get file details
app.get('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params
    log('Fetching details for file:', filename)
    const filePath = path.join(publicGeojsonDir, filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    const stats = fs.statSync(filePath)
    const content = fs.readFileSync(filePath, 'utf8')
    const geojsonData = JSON.parse(content)
    const validation = validateGeoJSON(geojsonData)

    const publicPath = `/public/geojson/${filename}`
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

    const fileInfo = {
      id: filename,
      name: filename,
      size: stats.size,
      uploadDate: stats.birthtime,
      modifiedDate: stats.mtime,
      publicPath,
      publicUrl,
      isPublic: true,
      isValid: validation.isValid,
      errors: validation.errors,
      warnings: validation.warnings,
      featureCount: geojsonData.features ? geojsonData.features.length : 0,
      bounds: calculateBounds(geojsonData),
      geometryTypes: getGeometryTypes(geojsonData),
      properties: getPropertyKeys(geojsonData),
      data: geojsonData,
    }

    res.json(fileInfo)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to read file',
      details: error.message,
    })
  }
})

function readFile(filename) {
  const filePath = path.join(publicGeojsonDir, filename)

  if (!fs.existsSync(filePath)) {
    return { error: 'File not found' }
  }

  const stats = fs.statSync(filePath)
  const content = fs.readFileSync(filePath, 'utf8')
  const geojsonData = JSON.parse(content)
  const validation = validateGeoJSON(geojsonData)

  const publicPath = `/public/geojson/${filename}`

  const fileInfo = {
    id: filename,
    name: filename,
    size: stats.size,
    uploadDate: stats.birthtime,
    modifiedDate: stats.mtime,
    publicPath,
    isPublic: true,
    isValid: validation.isValid,
    errors: validation.errors,
    warnings: validation.warnings,
    featureCount: geojsonData.features ? geojsonData.features.length : 0,
    bounds: calculateBounds(geojsonData),
    geometryTypes: getGeometryTypes(geojsonData),
    properties: getPropertyKeys(geojsonData),
    data: geojsonData,
  }
  return { data: fileInfo }
}

function getPopulationGeoJSON() {
  try {
    const filename = 'population_FeaturesToJSON.geojson'
    return readFile(filename)
  } catch (error) {
    return {
      error: 'Failed to read file',
      details: error.message,
    }
  }
}

function getCrisisGeoJSON({ status, crisis, lat, lon, radius }) {
  const filename = 'crisis_FeaturesToJSON.geojson'
  const { data, error } = readFile(filename)
  if (error) {
    return { error }
  }
  function match(status, crisis, properties) {
    const { name: name_p, status: status_p } = properties
    let ret = true
    if (status && status === 'open') {
      ret = status_p === 'مفتوح'
    } else if (status && status === 'close') {
      ret = status_p === 'مغلق' && status_p === 'مقفول'
    }
    if (ret && crisis && crisis === 'fire') {
      ret = name_p === 'حريق'
    } else if (ret && crisis && crisis === 'flood') {
      ret = name_p === 'فيضان' || name_p === 'سيول'
    }
    return ret
  }
  function spatialFilter(lat, lon, radius, geometry) {
    if (!lat || !lon) {
      return true
    }
    if (
      !geometry ||
      !geometry.coordinates ||
      geometry.coordinates.length !== 2
    ) {
      return false
    }

    const [geomLon, geomLat] = geometry.coordinates
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
    const distance = calculateDistance(lat, lon, geomLat, geomLon)
    radius = radius || 5.0
    return distance <= radius
  }
  data.data.features = data.data.features.filter(
    (d) =>
      match(status, crisis, d.properties) &&
      spatialFilter(lat, lon, radius, d.geometry)
  )
  return { data }
}

function getResourcesGeoJSON() {
  try {
    const filename = 'resources_FeaturesToJSON.geojson'
    return readFile(filename)
  } catch (error) {
    return {
      error: 'Failed to read file',
      details: error.message,
    }
  }
}

function getMajorRoadsGeoJSON() {
  try {
    const filename = 'MajorRoads_Exp_FeaturesToJSO.geojson'
    return readFile(filename)
  } catch (error) {
    return {
      error: 'Failed to read file',
      details: error.message,
    }
  }
}

function getTrafficIncidentsGeoJSON() {
  try {
    const filename = 'TrafficIncidents_ExportFeatures.geojson'
    return readFile(filename)
  } catch (error) {
    return {
      error: 'Failed to read file',
      details: error.message,
    }
  }
}

app.get('/api/file/population', (req, res) => {
  const { data, error, details } = getPopulationGeoJSON()
  if (error) {
    if (details) {
      return res.status(500).json({ error, details })
    }
    return res.status(404).json({ error })
  }
  const publicUrl = `${req.protocol}://${req.get('host')}${data.publicPath}`
  data.publicUrl = publicUrl
  res.json({ data })
})

// Bulk upload endpoint
app.post('/api/bulk-upload', (req, res) => {
  try {
    const { files } = req.body

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'Files array is required' })
    }

    const results = []
    const errors = []

    files.forEach((fileData, index) => {
      try {
        const { name, data } = fileData

        if (!name || !data) {
          errors.push({ index, error: 'Name and data are required' })
          return
        }

        // Validate GeoJSON
        const validation = validateGeoJSON(data)
        if (!validation.isValid) {
          errors.push({
            index,
            filename: name,
            error: 'Invalid GeoJSON',
            details: validation.errors,
          })
          return
        }

        // Create safe filename
        const safeFilename = name
        // const safeFilename = name.replace(/[^a-zA-Z0-9.-]/g, '_');
        let finalFilename = safeFilename
        let filePath = path.join(publicGeojsonDir, finalFilename)

        // Handle duplicate filenames
        let counter = 1
        while (fs.existsSync(filePath)) {
          const ext = path.extname(safeFilename)
          const nameWithoutExt = path.basename(safeFilename, ext)
          finalFilename = `${nameWithoutExt}_${counter}${ext}`
          filePath = path.join(publicGeojsonDir, finalFilename)
          counter++
        }

        // Save file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

        const publicPath = `/public/geojson/${finalFilename}`
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`

        results.push({
          originalName: name,
          filename: finalFilename,
          publicPath,
          publicUrl,
          size: Buffer.byteLength(JSON.stringify(data, null, 2)),
          featureCount: data.features ? data.features.length : 0,
        })
      } catch (error) {
        errors.push({
          index,
          filename: fileData.name || `file_${index}`,
          error: error.message,
        })
      }
    })

    res.json({
      success: true,
      message: `${results.length} files saved successfully`,
      results,
      errors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Bulk upload failed',
      details: error.message,
    })
  }
})

// Download file endpoint
app.get('/api/download/:filename', (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(publicGeojsonDir, filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    res.download(filePath, filename)
  } catch (error) {
    res.status(500).json({
      error: 'Download failed',
      details: error.message,
    })
  }
})

// Get directory stats
app.get('/api/stats', (_req, res) => {
  try {
    const files = fs.readdirSync(publicGeojsonDir)
    const geojsonFiles = files.filter(
      (file) => file.endsWith('.geojson') || file.endsWith('.json')
    )

    let totalFeatures = 0
    let validFiles = 0
    let errorFiles = 0
    let totalSize = 0

    geojsonFiles.forEach((filename) => {
      try {
        const filePath = path.join(publicGeojsonDir, filename)
        const stats = fs.statSync(filePath)
        const content = fs.readFileSync(filePath, 'utf8')
        const geojsonData = JSON.parse(content)
        const validation = validateGeoJSON(geojsonData)

        totalSize += stats.size

        if (validation.isValid) {
          validFiles++
          totalFeatures += geojsonData.features
            ? geojsonData.features.length
            : 0
        } else {
          errorFiles++
        }
      } catch (_error) {
        errorFiles++
      }
    })

    res.json({
      totalFiles: geojsonFiles.length,
      validFiles,
      errorFiles,
      totalFeatures,
      totalSize,
      publicFolder: publicGeojsonDir,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get stats',
      details: error.message,
    })
  }
})

async function getData(messages) {
  function getDataLLM() {
    const apiUrl = process.env.OLLAMA_ENDPOINT
    const model = process.env.OLLAMA_MODEL
    const sysPrompt = `You are a helpful assistant that use different tools to retrieve geojson data.
  
      When calling any of the available tools, you will only get the result of the tool call, not the actual data.
      In case of success, the data gets passed directly to the user.
      If there is some confusion, ask for clarification.
      `
    const temperature = 0
    const tools = [
      {
        type: 'function',
        function: {
          name: 'GetPopulation',
          description: 'Return the population data',
        },
      },
      {
        type: 'function',
        function: {
          name: 'getCrisis',
          description:
            'Return crisis data including floods, fires, and emergencies',
          parameters: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'The status of the returned data',
                enum: ['open', 'close'],
              },
              crisis: {
                type: 'string',
                description: 'The crises to filter by',
                enum: ['fire', 'flood'],
              },
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
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'getResources',
          description:
            'Return resource data including hospitals, schools, and other facilities',
        },
      },
      {
        type: 'function',
        function: {
          name: 'getMajorRoads',
          description:
            'Return major roads data including highways and main streets',
        },
      },
      {
        type: 'function',
        function: {
          name: 'getTrafficIncidents',
          description:
            'Return traffic incidents data including accidents and road closures',
        },
      },
    ]

    return new OllamaLLM(apiUrl, model, sysPrompt, temperature, tools)
  }

  function handleToolCall(action, args) {
    if (action === 'GetPopulation') {
      const { data, error } = getPopulationGeoJSON()
      if (!data) {
        return { result: error || 'Something went wrong' }
      }
      return {
        result: `Data ${action} returned to the user successfully`,
        data,
      }
    } else if (action === 'getCrisis') {
      const { data, error } = getCrisisGeoJSON(args)
      if (!data) {
        return { result: error || 'Something went wrong' }
      }
      return {
        result: `Data ${action} returned to the user successfully`,
        data,
      }
    } else if (action === 'getResources') {
      const { data, error } = getResourcesGeoJSON()
      if (!data) {
        return { result: error || 'Something went wrong' }
      }
      return {
        result: `Data ${action} returned to the user successfully`,
        data,
      }
    } else if (action === 'getMajorRoads') {
      const { data, error } = getMajorRoadsGeoJSON()
      if (!data) {
        return { result: error || 'Something went wrong' }
      }
      return {
        result: `Data ${action} returned to the user successfully`,
        data,
      }
    } else if (action === 'getTrafficIncidents') {
      const { data, error } = getTrafficIncidentsGeoJSON()
      if (!data) {
        return { result: error || 'Something went wrong' }
      }
      return {
        result: `Data ${action} returned to the user successfully`,
        data,
      }
    }
    return { result: 'No data available' }
  }
  const dataLLM = getDataLLM()
  const { message, tool_calls, think } = await dataLLM.chat(messages)
  if (tool_calls) {
    const allData = []
    for (const toolCall of tool_calls) {
      console.log('Executing tool call:', toolCall)
      const { name: action, arguments: args } = toolCall.function
      console.log('Tool call name:', action, 'Arguments:', args)
      const { result, data } = handleToolCall(action, args)
      console.log('Tool call result:', result)
      messages.push({
        role: 'assistant',
        content: `I have to call ${action} with arguments: ${JSON.stringify(args)}`,
        tool_calls: [toolCall],
      })
      messages.push({
        role: 'tool',
        content: result,
      })
      if (data) {
        allData.push(data)
      }
    }
    return { message, think, data: allData }
  }
  return { message, think }
}

async function getTools(messages, tools) {
  if (!tools || tools.length === 0) {
    return { success: false, data: { reason: 'No tools were provided.' } }
  }
  function getToolsLLM(tools) {
    const apiUrl = process.env.OLLAMA_ENDPOINT
    const model = process.env.OLLAMA_MODEL
    const sysPrompt = `You are a helpful assistant that help the user in choosing the right tools for their task.
  
      Don't make up tools, only use the ones that are available.
      Don't use any tools unless it was explicitly requested by the user.
      If the user is asking for data you must assume that it is already retrieved as there is another assistant that is in charge of retrieving the data.
      If you need to call a tool, you must call it.
      In case of on call is needed, you must use the NoOp tool.
      In case of calling a tool, you should never use NoOp.
      `
    const temperature = 0.7
    const defaultTool = {
      type: 'function',
      function: {
        name: 'NoOp',
        description: 'No operation, do nothing',
      },
    }
    return new OllamaLLM(apiUrl, model, sysPrompt, temperature, [
      ...tools,
      defaultTool,
    ])
  }
  const toolsLLM = getToolsLLM(tools)
  const { message, tool_calls, think } = await toolsLLM.chat(messages)
  function clean_tools(tool_calls) {
    const seen = new Set()
    return tool_calls.filter((call) => {
      if (call.function.name === 'NoOp') return false
      const key = call.function.name + JSON.stringify(call.function.arguments)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
  const clean_tool_calls = clean_tools(tool_calls || [])
  if (!clean_tool_calls || clean_tool_calls.length === 0) {
    return {
      success: false,
      data: {
        message,
        think,
        reason: 'No tools were selected, No operation is needed.',
      },
    }
  }
  return {
    success: true,
    data: { message, tool_calls: clean_tool_calls, think },
  }
}

async function getResponse(messages) {
  function getResponseLLM() {
    const apiUrl = process.env.OLLAMA_ENDPOINT
    const model = process.env.OLLAMA_MODEL
    const sysPrompt = `
You are **GeoAI**, a highly capable AI assistant specialized in geospatial data analysis and visualization.  
Your primary role is to interact with and control a map using the tools available to you.  
You can generate, update, and analyze visualizations such as heatmaps, choropleth maps, scatter plots, or overlays.  

### Interaction Guidelines:
- Always clarify the user's intent before executing complex map operations.  
- If data or coordinates are missing, ask the user to provide them.  
- In case of using default values, inform the user about the assumptions made.  
- Provide concise, clear, and actionable responses to the user.  
- Avoid unnecessary technical jargon.
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
`
    const temperature = 0.7
    const tools = [
      {
        type: 'function',
        function: {
          name: 'route-to',
          description: 'Find the fastest driving route between two coordinates',
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
          description: 'Create a heatmap of the available incidents on the map',
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
    return new OllamaLLM(apiUrl, model, sysPrompt, temperature, tools)
  }
  const responseLLM = getResponseLLM()
  const { message, tool_calls, think } = await responseLLM.chat(messages)
  if (tool_calls) {
    for (const toolCall of tool_calls) {
      console.log('Executing tool call:', toolCall)
      const { name: action, arguments: args } = toolCall.function
      console.log('Tool call name:', action, 'Arguments:', args)
      function getFiles() {
        const files = fs.readdirSync(publicGeojsonDir)
        const fileList = files
          .filter((file) => file.endsWith('.geojson') || file.endsWith('.json'))
          .map((filename) => {
            const filePath = path.join(publicGeojsonDir, filename)
            const stats = fs.statSync(filePath)
            const publicPath = `/public/geojson/${filename}`

            const content = fs.readFileSync(filePath, 'utf8')
            const geojsonData = JSON.parse(content)
            const validation = validateGeoJSON(geojsonData)

            return {
              id: filename,
              name: filename,
              size: stats.size,
              uploadDate: stats.mtime,
              savedDate: stats.mtime,
              publicPath,
              isPublic: true,
              isValid: validation.isValid,
              errors: validation.errors,
              warnings: validation.warnings,
              featureCount: geojsonData.features
                ? geojsonData.features.length
                : 0,
              bounds: calculateBounds(geojsonData),
              geometryTypes: getGeometryTypes(geojsonData),
              properties: getPropertyKeys(geojsonData),
              data: geojsonData,
            }
          })
        const allFeatures = []

        for (const file of fileList) {
          if (file?.data?.features && Array.isArray(file.data.features)) {
            const fileFeatures = file.data.features.map((feature, index) => ({
              ...feature,
              sourceFile: file.name || 'غير معروف',
              featureIndex: index,
            }))

            allFeatures.push(...fileFeatures)
          } else {
            console.warn('⚠️ ملف بدون بيانات أو ميزات:', file.name)
          }
        }
        return allFeatures
      }
      const { handleAction } = llmActions({ allFeaturesData: getFiles() })
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
      const area1 = args?.area1
      const area2 = args?.area2
      const { result, data } = await handleAction(
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
          endLat,
          endLon,
          startLat,
          startLon,
          area1,
          area2,
        },
        `ID_${Date.now()}`
      )
      toolCall.data = data
      console.log('Tool call result:', result)
      messages.push({
        role: 'assistant',
        content: `I have to call ${action} with arguments: ${JSON.stringify(args)}`,
        tool_calls: [toolCall],
      })
      messages.push({
        role: 'tool',
        content: result,
      })
    }
    return { ...(await getResponse(messages)), tool_calls }
  }
  return { message, tool_calls, think }
}

app.post('/api/test-llm', async (req, res) => {
  const { prompt, tools } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }
  const messages = [
    {
      role: 'user',
      content: prompt,
    },
  ]
  const [dataResponse, toolsResponse] = await Promise.all([
    getData(messages),
    getTools(messages, tools),
  ])
  res.json({ success: true, data: dataResponse, tools: toolsResponse })
})

app.post('/api/ai-request', async (req, res) => {
  const { prompt, tools } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }
  const messages = [
    {
      role: 'user',
      content: prompt,
    },
  ]
  const [dataResponse, toolsResponse, llmResponse] = await Promise.all([
    getData(messages),
    getTools(messages, tools),
    getResponse(messages),
  ])
  res.json({
    success: true,
    data: dataResponse,
    tools: toolsResponse,
    llm: llmResponse,
  })
})

app.post('/api/ai-request-v2', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }
  const messages = [
    {
      role: 'user',
      content: prompt,
    },
  ]
  const { message, tool_calls, think } = await getResponse(messages)
  res.json({ success: true, message, tool_calls, think })
})

// Error handling middleware
app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: 'File too large. Maximum size is 10MB.' })
    }
    return res.status(400).json({ error: error.message })
  }

  res
    .status(500)
    .json({ error: 'Internal server error', details: error.message })
})

// Start server
app.listen(PORT, () => {
  console.log(`🗺️  GeoJSON Backend Service running on port ${PORT}`)
  console.log(`📁 Public folder: ${publicGeojsonDir}`)
  console.log(`🌐 API endpoints:`)
  console.log(`   GET  /api/health - Health check`)
  console.log(`   GET  /api/files - List all files`)
  console.log(`   POST /api/upload - Upload single file`)
  console.log(`   POST /api/upload-multiple - Upload multiple files`)
  console.log(`   POST /api/save-to-public - Save data to public folder`)
  console.log(`   GET  /api/files/:filename - Get file details`)
  console.log(`   DELETE /api/files/:filename - Delete file`)
  console.log(`   GET  /api/download/:filename - Download file`)
  console.log(`   GET  /api/stats - Get directory statistics`)
  console.log(
    `🔗 Files accessible at: http://localhost:${PORT}/public/geojson/`
  )
})

module.exports = app
