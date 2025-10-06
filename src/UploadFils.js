import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Download,
  FileText,
  FolderOpen,
  Layers,
  Loader2,
  Map as MapIcon,
  MapPin,
  Save,
  Server,
  Trash2,
  Upload,
} from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'

// Get property keys
const getPropertyKeys = (geojsonData) => {
  if (!geojsonData.features) return []

  const keys = new Set()
  geojsonData.features.forEach((feature) => {
    if (feature.properties) {
      Object.keys(feature.properties).forEach((key) => keys.add(key))
    }
  })

  return Array.from(keys).slice(0, 10) // Limit to first 10 properties
}

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

const GeoJSONFileManager = ({ uploadedFiles = [], onFilesUpdate }) => {
  const [files, setFiles] = useState(uploadedFiles)
  const [dragOver, setDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all') // 'all', 'valid', 'error'
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [savedFiles, setSavedFiles] = useState(new Set()) // Track which files are saved to public
  const fileInputRef = useRef(null)

  // GeoJSON validation
  const validateGeoJSON = useCallback((data) => {
    const errors = []
    const warnings = []

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

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }, [])

  // Calculate bounds

  // Get geometry types
  const getGeometryTypes = useCallback((geojsonData) => {
    if (!geojsonData.features) return []

    const types = new Set()
    geojsonData.features.forEach((feature) => {
      if (feature.geometry?.type) {
        types.add(feature.geometry.type)
      }
    })

    return Array.from(types)
  }, [])

  // Download file to local public folder (user must manually place it)
  // Replace the simulated saveToPublicFolder function with:
  const saveToPublicFolder = async (file) => {
    setIsSaving(true)

    try {
      const response = await fetch('http://localhost:3001/api/save-to-public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          data: file.data,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update file with public info
        const updatedFiles = files.map((f) =>
          f.id === file.id
            ? {
                ...f,
                publicPath: result.publicPath,
                publicUrl: result.publicUrl,
                isPublic: true,
                savedDate: new Date(),
              }
            : f
        )

        setFiles(updatedFiles)
        onFilesUpdate?.(updatedFiles)
        setSavedFiles((prev) => new Set([...prev, file.id]))

        alert(`File saved successfully!\nPublic URL: ${result.publicUrl}`)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error saving file:', error)
      alert('Error saving file to public folder')
    } finally {
      setIsSaving(false)
    }
  }

  // Navigation handlers
  const handleBackToMap = () => {
    // Navigate to root path
    window.location.href = '/'
  }

  const handleOpenMapViewer = () => {
    // In a real app, you might pass the files as URL parameters or store in session
    window.location.href = '/'
  }

  // File processing and validation
  const processFiles = useCallback(
    async (fileList) => {
      const validFiles = Array.from(fileList).filter(
        (file) =>
          file.name.toLowerCase().endsWith('.geojson') ||
          file.name.toLowerCase().endsWith('.json')
      )

      if (validFiles.length === 0) {
        alert('Please select valid GeoJSON files (.geojson or .json)')
        return
      }

      setIsProcessing(true)
      setProcessingProgress(0)

      const newFiles = []

      try {
        for (let i = 0; i < validFiles.length; i++) {
          const file = validFiles[i]
          const progress = ((i + 1) / validFiles.length) * 100
          setProcessingProgress(progress)

          try {
            const text = await file.text()
            const geojsonData = JSON.parse(text)

            // Validate GeoJSON structure
            const validation = validateGeoJSON(geojsonData)

            const fileInfo = {
              id: Date.now() + i,
              name: file.name,
              size: file.size,
              uploadDate: new Date(),
              data: geojsonData,
              featureCount: geojsonData.features
                ? geojsonData.features.length
                : 0,
              isValid: validation.isValid,
              errors: validation.errors,
              warnings: validation.warnings,
              bounds: calculateBounds(geojsonData),
              geometryTypes: getGeometryTypes(geojsonData),
              properties: getPropertyKeys(geojsonData),
              isPublic: false,
              publicPath: null,
            }

            newFiles.push(fileInfo)
          } catch (error) {
            const fileInfo = {
              id: Date.now() + i,
              name: file.name,
              size: file.size,
              uploadDate: new Date(),
              data: null,
              featureCount: 0,
              isValid: false,
              errors: [`Invalid JSON: ${error.message}`],
              warnings: [],
              bounds: null,
              geometryTypes: [],
              properties: [],
              isPublic: false,
              publicPath: null,
            }
            newFiles.push(fileInfo)
          }
        }

        const updatedFiles = [...files, ...newFiles]
        setFiles(updatedFiles)
        onFilesUpdate?.(updatedFiles)
      } finally {
        setIsProcessing(false)
        setProcessingProgress(0)
      }
    },
    [files, onFilesUpdate, getGeometryTypes, validateGeoJSON]
  )

  // Event handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileSelect = (e) => {
    processFiles(e.target.files)
  }

  const deleteFile = (fileId) => {
    const updatedFiles = files.filter((f) => f.id !== fileId)
    setFiles(updatedFiles)
    onFilesUpdate?.(updatedFiles)
    setSavedFiles((prev) => {
      const newSet = new Set(prev)
      newSet.delete(fileId)
      return newSet
    })
  }

  const downloadFile = (file) => {
    if (!file.data) return

    const blob = new Blob([JSON.stringify(file.data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // Filter files
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'valid' && file.isValid) ||
      (filterType === 'error' && !file.isValid)
    return matchesSearch && matchesFilter
  })

  const totalFeatures = files.reduce((sum, file) => sum + file.featureCount, 0)
  const validFiles = files.filter((f) => f.isValid).length
  const errorFiles = files.filter((f) => !f.isValid).length
  const publicFiles = files.filter((f) => f.isPublic).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleBackToMap}
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Map</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-xl">
                    GeoJSON File Manager
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Manage and organize your geographic data files
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`rounded px-3 py-1 text-sm ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded px-3 py-1 text-sm ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600 text-sm">Total Files</p>
                <p className="font-bold text-2xl text-gray-900">
                  {files.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600 text-sm">Valid Files</p>
                <p className="font-bold text-2xl text-green-600">
                  {validFiles}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600 text-sm">Error Files</p>
                <p className="font-bold text-2xl text-red-600">{errorFiles}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Public Files
                </p>
                <p className="font-bold text-2xl text-blue-600">
                  {publicFiles}
                </p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Total Features
                </p>
                <p className="font-bold text-2xl text-purple-600">
                  {totalFeatures.toLocaleString()}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mb-8 rounded-xl border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="font-semibold text-gray-900 text-lg">
              Upload New Files
            </h2>
            <p className="text-gray-500 text-sm">
              Upload GeoJSON files and download them for manual placement in the
              public folder
            </p>
          </div>

          <div className="p-6">
            {isProcessing && (
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700 text-sm">
                    Processing files...
                  </span>
                  <span className="text-gray-500 text-sm">
                    {Math.round(processingProgress)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div
              role="none"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-gray-100 p-4">
                    <Upload className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    Drag and drop your GeoJSON files here
                  </h3>
                  <p className="mb-4 text-gray-500">
                    Files will be downloaded for you to manually place in the
                    public folder
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".geojson,.json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isProcessing
                      ? <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      : 'Choose Files'}
                  </button>
                </div>
                <p className="text-gray-400 text-xs">
                  Supported formats: .geojson, .json (Max 10MB per file)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 rounded-xl border bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`rounded-lg px-4 py-2 font-medium text-sm ${
                    filterType === 'all'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Files ({files.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('valid')}
                  className={`rounded-lg px-4 py-2 font-medium text-sm ${
                    filterType === 'valid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Valid ({validFiles})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('error')}
                  className={`rounded-lg px-4 py-2 font-medium text-sm ${
                    filterType === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Errors ({errorFiles})
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute top-2.5 left-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Search Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Files Grid/List */}
        {filteredFiles.length === 0
          ? <div className="rounded-xl border bg-white shadow-sm">
              <div className="p-12 text-center">
                <FolderOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 font-medium text-gray-900 text-lg">
                  {files.length === 0
                    ? 'No files uploaded yet'
                    : 'No files match your search'}
                </h3>
                <p className="text-gray-500">
                  {files.length === 0
                    ? 'Upload your first GeoJSON file to get started'
                    : 'Try adjusting your search or filter criteria'}
                </p>
              </div>
            </div>
          : <div className="rounded-xl border bg-white shadow-sm">
              <div className="p-6">
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`rounded-lg border p-4 ${
                        file.isValid
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`rounded-lg p-2 ${
                              file.isValid ? 'bg-green-100' : 'bg-red-100'
                            }`}
                          >
                            <FileText
                              className={`h-5 w-5 ${
                                file.isValid ? 'text-green-600' : 'text-red-600'
                              }`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className="truncate font-medium text-gray-900 text-sm"
                              title={file.name}
                            >
                              {file.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {formatFileSize(file.size)} •{' '}
                              {formatDate(file.uploadDate)}
                            </p>
                            {file.publicPath && (
                              <div className="mt-1 flex items-center space-x-1">
                                <Server className="h-3 w-3 text-blue-500" />
                                <span className="text-blue-600 text-xs">
                                  Public
                                </span>
                                <span className="text-gray-400 text-xs">•</span>
                                <span className="text-gray-500 text-xs">
                                  {file.savedDate
                                    ? formatDate(file.savedDate)
                                    : 'Saved'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {file.isValid && !savedFiles.has(file.id) && (
                            <button
                              type="button"
                              onClick={() => saveToPublicFolder(file)}
                              disabled={isSaving}
                              className="rounded p-1 text-gray-400 transition-colors hover:text-green-600"
                              title="Download for public folder"
                            >
                              {isSaving
                                ? <Loader2 className="h-4 w-4 animate-spin" />
                                : <Save className="h-4 w-4" />}
                            </button>
                          )}
                          {file.isValid && (
                            <button
                              type="button"
                              onClick={() => downloadFile(file)}
                              className="rounded p-1 text-gray-400 hover:text-blue-600"
                              title="Download file"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteFile(file.id)}
                            className="rounded p-1 text-gray-400 hover:text-red-600"
                            title="Delete file"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* File Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">
                            Features:
                          </span>
                          <span className="font-medium text-xs">
                            {file.featureCount.toLocaleString()}
                          </span>
                        </div>

                        {file.geometryTypes.length > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">
                              Types:
                            </span>
                            <span className="font-medium text-xs">
                              {file.geometryTypes.join(', ')}
                            </span>
                          </div>
                        )}

                        {file.bounds && (
                          <div className="text-gray-500 text-xs">
                            <div className="flex justify-between">
                              <span>Bounds:</span>
                              <span>
                                {file.bounds.minLat.toFixed(3)},{' '}
                                {file.bounds.minLng.toFixed(3)}
                              </span>
                            </div>
                            <div className="flex justify-end">
                              <span>
                                {file.bounds.maxLat.toFixed(3)},{' '}
                                {file.bounds.maxLng.toFixed(3)}
                              </span>
                            </div>
                          </div>
                        )}

                        {file.publicPath && (
                          <div className="rounded bg-blue-50 p-2 text-blue-600 text-xs">
                            <div className="mb-1 font-medium">
                              Public Access:
                            </div>
                            <div className="font-mono text-blue-500">
                              {file.publicPath}
                            </div>
                            {file.publicUrl && (
                              <div className="mt-1 font-mono text-blue-500">
                                {file.publicUrl}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="mt-3 border-t pt-3">
                        {file.isValid
                          ? <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-medium text-xs">
                                Valid GeoJSON
                              </span>
                            </div>
                          : <div className="space-y-1">
                              <div className="flex items-center space-x-1 text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span className="font-medium text-xs">
                                  Validation Errors
                                </span>
                              </div>
                              {file.errors.slice(0, 2).map((error, index) => (
                                <p key={index} className="text-red-600 text-xs">
                                  • {error}
                                </p>
                              ))}
                              {file.errors.length > 2 && (
                                <p className="text-red-500 text-xs">
                                  ...and {file.errors.length - 2} more
                                </p>
                              )}
                            </div>}
                      </div>

                      {/* Properties Preview */}
                      {file.properties.length > 0 && (
                        <div className="mt-3 border-t pt-3">
                          <p className="mb-1 text-gray-500 text-xs">
                            Properties:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {file.properties.slice(0, 3).map((prop, index) => (
                              <span
                                key={index}
                                className="rounded bg-gray-200 px-2 py-1 text-gray-700 text-xs"
                              >
                                {prop}
                              </span>
                            ))}
                            {file.properties.length > 3 && (
                              <span className="rounded bg-gray-100 px-2 py-1 text-gray-500 text-xs">
                                +{file.properties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>}

        {/* Action Buttons */}
        {files.some((f) => f.isValid) && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleOpenMapViewer}
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-600"
            >
              <MapIcon className="h-5 w-5" />
              <span>
                Open in Map Viewer ({files.filter((f) => f.isValid).length}{' '}
                files)
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeoJSONFileManager
