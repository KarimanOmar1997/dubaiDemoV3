# API Documentation - GeoAnalyzer Backend

## Overview

The GeoAnalyzer backend provides a RESTful API for managing GeoJSON files and serving geospatial data. Built with Express.js, it handles file uploads, validation, and serves data to the frontend application.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "details": "Detailed error message"
}
```

## Endpoints

### Health Check

#### GET /api/health

Check if the API server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "GeoJSON Backend Service is running"
}
```

---

### File Management

#### GET /api/files

Retrieve a list of all GeoJSON files in the public directory.

**Response:**
```json
{
  "files": [
    {
      "id": "filename.geojson",
      "name": "filename.geojson",
      "size": 1024,
      "uploadDate": "2024-01-01T00:00:00.000Z",
      "savedDate": "2024-01-01T00:00:00.000Z",
      "publicPath": "/public/geojson/filename.geojson",
      "publicUrl": "http://localhost:3001/public/geojson/filename.geojson",
      "isPublic": true,
      "isValid": true,
      "errors": [],
      "warnings": [],
      "featureCount": 100,
      "bounds": {
        "minLng": 55.0,
        "minLat": 25.0,
        "maxLng": 56.0,
        "maxLat": 26.0
      },
      "geometryTypes": ["Point", "Polygon"],
      "properties": ["name", "type", "severity"],
      "data": { ... }
    }
  ]
}
```

#### POST /api/upload

Upload a single GeoJSON file.

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `geojson`
- File types: `.geojson`, `.json`
- Max size: 10MB

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "id": "filename.geojson",
    "name": "filename.geojson",
    "size": 1024,
    "uploadDate": "2024-01-01T00:00:00.000Z",
    "publicPath": "/public/geojson/filename.geojson",
    "publicUrl": "http://localhost:3001/public/geojson/filename.geojson",
    "isValid": true,
    "errors": [],
    "warnings": [],
    "featureCount": 100
  }
}
```

#### POST /api/upload-multiple

Upload multiple GeoJSON files.

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `geojson` (array)
- Max files: 10
- File types: `.geojson`, `.json`
- Max size per file: 10MB

**Response:**
```json
{
  "success": true,
  "message": "3 files uploaded successfully",
  "files": [ ... ],
  "errors": [
    {
      "filename": "invalid.json",
      "error": "Invalid GeoJSON format"
    }
  ]
}
```

#### GET /api/files/:filename

Get details of a specific file.

**Parameters:**
- `filename` (string): Name of the file

**Response:**
```json
{
  "id": "filename.geojson",
  "name": "filename.geojson",
  "size": 1024,
  "uploadDate": "2024-01-01T00:00:00.000Z",
  "modifiedDate": "2024-01-01T00:00:00.000Z",
  "publicPath": "/public/geojson/filename.geojson",
  "publicUrl": "http://localhost:3001/public/geojson/filename.geojson",
  "isValid": true,
  "errors": [],
  "warnings": [],
  "featureCount": 100,
  "bounds": { ... },
  "geometryTypes": ["Point"],
  "properties": ["name", "type"],
  "data": { ... }
}
```

#### DELETE /api/files/:filename

Delete a specific file.

**Parameters:**
- `filename` (string): Name of the file to delete

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

#### POST /api/save-to-public

Save GeoJSON data to the public folder.

**Request Body:**
```json
{
  "filename": "data.geojson",
  "data": {
    "type": "FeatureCollection",
    "features": [ ... ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "File saved to public folder successfully",
  "filename": "data.geojson",
  "publicPath": "/public/geojson/data.geojson",
  "publicUrl": "http://localhost:3001/public/geojson/data.geojson"
}
```

#### GET /api/download/:filename

Download a specific file.

**Parameters:**
- `filename` (string): Name of the file to download

**Response:**
- File download stream

#### POST /api/bulk-upload

Upload multiple files via JSON payload.

**Request Body:**
```json
{
  "files": [
    {
      "name": "file1.geojson",
      "data": { ... }
    },
    {
      "name": "file2.geojson",
      "data": { ... }
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "2 files saved successfully",
  "results": [
    {
      "originalName": "file1.geojson",
      "filename": "file1.geojson",
      "publicPath": "/public/geojson/file1.geojson",
      "publicUrl": "http://localhost:3001/public/geojson/file1.geojson",
      "size": 1024,
      "featureCount": 50
    }
  ],
  "errors": []
}
```

#### GET /api/stats

Get directory statistics.

**Response:**
```json
{
  "totalFiles": 5,
  "validFiles": 4,
  "errorFiles": 1,
  "totalFeatures": 1500,
  "totalSize": 5242880,
  "publicFolder": "/path/to/public/geojson"
}
```

---

## Data Validation

### GeoJSON Validation Rules

The API validates uploaded GeoJSON files according to the following rules:

1. **Required Properties:**
   - `type`: Must be "FeatureCollection" or "Feature"
   - `features`: Required for FeatureCollection (must be array)

2. **Feature Validation:**
   - Each feature must have `type: "Feature"`
   - Geometry is optional but recommended

3. **Error Types:**
   - Missing required properties
   - Invalid type values
   - Malformed JSON structure

### Validation Response

```json
{
  "isValid": true,
  "errors": [
    "Missing required \"type\" property",
    "Feature 1: Invalid or missing type"
  ],
  "warnings": [
    "FeatureCollection is empty (no features)",
    "Feature 1: Missing geometry"
  ]
}
```

---

## File Processing

### Bounds Calculation

The API automatically calculates geographical bounds for valid GeoJSON files:

```json
{
  "bounds": {
    "minLng": 55.123456,
    "minLat": 25.123456,
    "maxLng": 55.987654,
    "maxLat": 25.987654
  }
}
```

### Geometry Type Detection

Supported geometry types:
- Point
- LineString
- Polygon
- MultiPoint
- MultiLineString
- MultiPolygon
- GeometryCollection

### Property Extraction

The API extracts up to 10 unique property keys from all features:

```json
{
  "properties": [
    "name",
    "type",
    "severity",
    "timestamp",
    "description"
  ]
}
```

---

## Error Handling

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors, missing parameters)
- `404` - Not Found (file not found)
- `500` - Internal Server Error

### Common Error Scenarios

#### File Upload Errors

```json
{
  "success": false,
  "error": "File too large. Maximum size is 10MB."
}
```

#### Validation Errors

```json
{
  "success": false,
  "error": "Invalid GeoJSON data",
  "details": [
    "Missing required \"type\" property",
    "FeatureCollection must have a \"features\" array"
  ]
}
```

#### File Not Found

```json
{
  "success": false,
  "error": "File not found"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## CORS Configuration

The API is configured to accept requests from any origin:

```javascript
app.use(cors());
```

For production, configure specific origins:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-domain.com']
}));
```

---

## File Storage

### Directory Structure

```
geojson-backend/
├── public/
│   └── geojson/
│       ├── file1.geojson
│       ├── file2.geojson
│       └── ...
└── server.js
```

### File Naming

- Original filenames are preserved when possible
- Duplicate filenames get timestamp suffix: `filename_1640995200000.geojson`
- Invalid characters are handled by the filesystem

### Storage Limits

- Max file size: 10MB per file
- No limit on total number of files
- No automatic cleanup (manual management required)

---

## Security Considerations

### Current Implementation

- No authentication required
- No input sanitization beyond GeoJSON validation
- Files are publicly accessible via HTTP

### Recommended Improvements

1. **Authentication:** Implement API key or JWT authentication
2. **Input Validation:** Sanitize filenames and content
3. **File Scanning:** Scan uploaded files for malware
4. **Access Control:** Implement user-based file access
5. **HTTPS:** Use SSL/TLS in production
6. **Rate Limiting:** Prevent abuse

---

## Development

### Running the Server

```bash
cd geojson-backend
npm install
npm start
```

### Environment Variables

```env
PORT=3001
NODE_ENV=development
```

### Testing

```bash
# Health check
curl http://localhost:3001/api/health

# List files
curl http://localhost:3001/api/files

# Upload file
curl -X POST -F "geojson=@sample.geojson" http://localhost:3001/api/upload
```

---

## Changelog

### Version 1.0.0
- Initial API implementation
- File upload and management
- GeoJSON validation
- Public file serving
- Statistics endpoint
