// server.js - GeoJSON File Manager Backend Service
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ensure public/geojson directory exists
const publicGeojsonDir = path.join(__dirname, 'public', 'geojson');
if (!fs.existsSync(publicGeojsonDir)) {
  fs.mkdirSync(publicGeojsonDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicGeojsonDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename or add timestamp if duplicate
    const originalName = file.originalname;
    const filePath = path.join(publicGeojsonDir, originalName);
    
    if (fs.existsSync(filePath)) {
      const timestamp = Date.now();
      const ext = path.extname(originalName);
      const name = path.basename(originalName, ext);
      cb(null, `${name}_${timestamp}${ext}`);
    } else {
      cb(null, originalName);
    }
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.geojson', '.json'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only .geojson and .json files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper function to validate GeoJSON
const validateGeoJSON = (data) => {
  const errors = [];
  const warnings = [];

  try {
    if (!data.type) {
      errors.push('Missing required "type" property');
    } else if (data.type !== 'FeatureCollection' && data.type !== 'Feature') {
      errors.push(`Invalid type: ${data.type}. Must be "FeatureCollection" or "Feature"`);
    }

    if (data.type === 'FeatureCollection') {
      if (!data.features || !Array.isArray(data.features)) {
        errors.push('FeatureCollection must have a "features" array');
      } else if (data.features.length === 0) {
        warnings.push('FeatureCollection is empty (no features)');
      }
    }

    if (data.features) {
      data.features.forEach((feature, index) => {
        if (!feature.type || feature.type !== 'Feature') {
          errors.push(`Feature ${index + 1}: Invalid or missing type`);
        }
        if (!feature.geometry) {
          warnings.push(`Feature ${index + 1}: Missing geometry`);
        }
      });
    }
  } catch (error) {
    errors.push(`Validation error: ${error.message}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Helper function to calculate bounds
const calculateBounds = (geojsonData) => {
  if (!geojsonData.features || geojsonData.features.length === 0) return null;

  let minLng = Infinity, minLat = Infinity;
  let maxLng = -Infinity, maxLat = -Infinity;

  const processCoords = (coords) => {
    if (typeof coords[0] === 'number') {
      minLng = Math.min(minLng, coords[0]);
      maxLng = Math.max(maxLng, coords[0]);
      minLat = Math.min(minLat, coords[1]);
      maxLat = Math.max(maxLat, coords[1]);
    } else {
      coords.forEach(processCoords);
    }
  };

  geojsonData.features.forEach(feature => {
    if (feature.geometry && feature.geometry.coordinates) {
      processCoords(feature.geometry.coordinates);
    }
  });

  if (minLng === Infinity) return null;

  return { minLng, minLat, maxLng, maxLat };
};

// Helper function to get geometry types
const getGeometryTypes = (geojsonData) => {
  if (!geojsonData.features) return [];
  
  const types = new Set();
  geojsonData.features.forEach(feature => {
    if (feature.geometry && feature.geometry.type) {
      types.add(feature.geometry.type);
    }
  });
  
  return Array.from(types);
};

// Helper function to get property keys
const getPropertyKeys = (geojsonData) => {
  if (!geojsonData.features) return [];
  
  const keys = new Set();
  geojsonData.features.forEach(feature => {
    if (feature.properties) {
      Object.keys(feature.properties).forEach(key => keys.add(key));
    }
  });
  
  return Array.from(keys).slice(0, 10);
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GeoJSON Backend Service is running' });
});

// Get all files in public/geojson directory
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(publicGeojsonDir);
    const fileList = files
      .filter(file => file.endsWith('.geojson') || file.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(publicGeojsonDir, filename);
        const stats = fs.statSync(filePath);
        const publicPath = `/public/geojson/${filename}`;
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const geojsonData = JSON.parse(content);
          const validation = validateGeoJSON(geojsonData);
          
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
            featureCount: geojsonData.features ? geojsonData.features.length : 0,
            bounds: calculateBounds(geojsonData),
            geometryTypes: getGeometryTypes(geojsonData),
            properties: getPropertyKeys(geojsonData),
            data: geojsonData
          };
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
            properties: []
          };
        }
      });
    
    res.json({ files: fileList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read public directory', details: error.message });
  }
});

// Upload single file
app.post('/api/upload', upload.single('geojson'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const filename = req.file.filename;
    const publicPath = `/public/geojson/${filename}`;
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;

    // Read and validate the uploaded file
    const content = fs.readFileSync(filePath, 'utf8');
    const geojsonData = JSON.parse(content);
    const validation = validateGeoJSON(geojsonData);

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
      properties: getPropertyKeys(geojsonData)
    };

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileInfo
    });

  } catch (error) {
    // Clean up file if validation failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(400).json({
      success: false,
      error: 'Invalid GeoJSON file',
      details: error.message
    });
  }
});

// Upload multiple files
app.post('/api/upload-multiple', upload.array('geojson', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const results = [];
    const errors = [];

    req.files.forEach((file) => {
      try {
        const filePath = file.path;
        const filename = file.filename;
        const publicPath = `/public/geojson/${filename}`;
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;

        // Read and validate the uploaded file
        const content = fs.readFileSync(filePath, 'utf8');
        const geojsonData = JSON.parse(content);
        const validation = validateGeoJSON(geojsonData);

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
          properties: getPropertyKeys(geojsonData)
        };

        results.push(fileInfo);
      } catch (error) {
        // Clean up file if validation failed
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        errors.push({
          filename: file.originalname,
          error: error.message
        });
      }
    });

    res.json({
      success: true,
      message: `${results.length} files uploaded successfully`,
      files: results,
      errors: errors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: error.message
    });
  }
});

// Save existing file data to public folder
app.post('/api/save-to-public', (req, res) => {
  try {
    const { filename, data } = req.body;
    
    if (!filename || !data) {
      return res.status(400).json({ error: 'Filename and data are required' });
    }

    // Validate GeoJSON data
    const validation = validateGeoJSON(data);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid GeoJSON data',
        details: validation.errors
      });
    }

    // Create safe filename
    const safeFilename = filename;
    // const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(publicGeojsonDir, safeFilename);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      const timestamp = Date.now();
      const ext = path.extname(safeFilename);
      const name = path.basename(safeFilename, ext);
      const newFilename = `${name}_${timestamp}${ext}`;
      const newFilePath = path.join(publicGeojsonDir, newFilename);
      
      fs.writeFileSync(newFilePath, JSON.stringify(data, null, 2));
      
      const publicPath = `/public/geojson/${newFilename}`;
      const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;
      
      return res.json({
        success: true,
        message: 'File saved to public folder (renamed to avoid conflict)',
        filename: newFilename,
        publicPath,
        publicUrl
      });
    }

    // Save file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    const publicPath = `/public/geojson/${safeFilename}`;
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;

    res.json({
      success: true,
      message: 'File saved to public folder successfully',
      filename: safeFilename,
      publicPath,
      publicUrl
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save file',
      details: error.message
    });
  }
});

// Delete file from public folder
app.delete('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(publicGeojsonDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete file',
      details: error.message
    });
  }
});

// Get file details
app.get('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(publicGeojsonDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const geojsonData = JSON.parse(content);
    const validation = validateGeoJSON(geojsonData);
    
    const publicPath = `/public/geojson/${filename}`;
    const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;

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
      data: geojsonData
    };

    res.json(fileInfo);

  } catch (error) {
    res.status(500).json({
      error: 'Failed to read file',
      details: error.message
    });
  }
});

// Bulk upload endpoint
app.post('/api/bulk-upload', (req, res) => {
  try {
    const { files } = req.body;
    
    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'Files array is required' });
    }

    const results = [];
    const errors = [];

    files.forEach((fileData, index) => {
      try {
        const { name, data } = fileData;
        
        if (!name || !data) {
          errors.push({ index, error: 'Name and data are required' });
          return;
        }

        // Validate GeoJSON
        const validation = validateGeoJSON(data);
        if (!validation.isValid) {
          errors.push({
            index,
            filename: name,
            error: 'Invalid GeoJSON',
            details: validation.errors
          });
          return;
        }

        // Create safe filename
        const safeFilename = name;
        // const safeFilename = name.replace(/[^a-zA-Z0-9.-]/g, '_');
        let finalFilename = safeFilename;
        let filePath = path.join(publicGeojsonDir, finalFilename);
        
        // Handle duplicate filenames
        let counter = 1;
        while (fs.existsSync(filePath)) {
          const ext = path.extname(safeFilename);
          const nameWithoutExt = path.basename(safeFilename, ext);
          finalFilename = `${nameWithoutExt}_${counter}${ext}`;
          filePath = path.join(publicGeojsonDir, finalFilename);
          counter++;
        }

        // Save file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        const publicPath = `/public/geojson/${finalFilename}`;
        const publicUrl = `${req.protocol}://${req.get('host')}${publicPath}`;

        results.push({
          originalName: name,
          filename: finalFilename,
          publicPath,
          publicUrl,
          size: Buffer.byteLength(JSON.stringify(data, null, 2)),
          featureCount: data.features ? data.features.length : 0
        });

      } catch (error) {
        errors.push({
          index,
          filename: fileData.name || `file_${index}`,
          error: error.message
        });
      }
    });

    res.json({
      success: true,
      message: `${results.length} files saved successfully`,
      results,
      errors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Bulk upload failed',
      details: error.message
    });
  }
});

// Download file endpoint
app.get('/api/download/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(publicGeojsonDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, filename);

  } catch (error) {
    res.status(500).json({
      error: 'Download failed',
      details: error.message
    });
  }
});

// Get directory stats
app.get('/api/stats', (req, res) => {
  try {
    const files = fs.readdirSync(publicGeojsonDir);
    const geojsonFiles = files.filter(file => file.endsWith('.geojson') || file.endsWith('.json'));
    
    let totalFeatures = 0;
    let validFiles = 0;
    let errorFiles = 0;
    let totalSize = 0;

    geojsonFiles.forEach(filename => {
      try {
        const filePath = path.join(publicGeojsonDir, filename);
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        const geojsonData = JSON.parse(content);
        const validation = validateGeoJSON(geojsonData);
        
        totalSize += stats.size;
        
        if (validation.isValid) {
          validFiles++;
          totalFeatures += geojsonData.features ? geojsonData.features.length : 0;
        } else {
          errorFiles++;
        }
      } catch (error) {
        errorFiles++;
      }
    });

    res.json({
      totalFiles: geojsonFiles.length,
      validFiles,
      errorFiles,
      totalFeatures,
      totalSize,
      publicFolder: publicGeojsonDir
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to get stats',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: 'Internal server error', details: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🗺️  GeoJSON Backend Service running on port ${PORT}`);
  console.log(`📁 Public folder: ${publicGeojsonDir}`);
  console.log(`🌐 API endpoints:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/files - List all files`);
  console.log(`   POST /api/upload - Upload single file`);
  console.log(`   POST /api/upload-multiple - Upload multiple files`);
  console.log(`   POST /api/save-to-public - Save data to public folder`);
  console.log(`   GET  /api/files/:filename - Get file details`);
  console.log(`   DELETE /api/files/:filename - Delete file`);
  console.log(`   GET  /api/download/:filename - Download file`);
  console.log(`   GET  /api/stats - Get directory statistics`);
  console.log(`🔗 Files accessible at: http://localhost:${PORT}/public/geojson/`);
});

module.exports = app;