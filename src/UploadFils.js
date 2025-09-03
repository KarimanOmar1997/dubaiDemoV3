import React, { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  MapPin,
  Layers,
  CheckCircle,
  AlertCircle,
  Loader2,
  FolderOpen,
  Map,
  BarChart3,
  ArrowLeft,
  Save,
  Server,
} from "lucide-react";

const GeoJSONFileManager = ({
  onNavigateToMap,
  uploadedFiles = [],
  onFilesUpdate,
}) => {
  const [files, setFiles] = useState(uploadedFiles);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filterType, setFilterType] = useState("all"); // 'all', 'valid', 'error'
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedFiles, setSavedFiles] = useState(new Set()); // Track which files are saved to public
  const fileInputRef = useRef(null);

  // Download file to local public folder (user must manually place it)
  // Replace the simulated saveToPublicFolder function with:
  const saveToPublicFolder = async (file) => {
    setIsSaving(true);

    try {
      const response = await fetch("http://172.189.56.93:3001/api/save-to-public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          data: file.data,
        }),
      });

      const result = await response.json();

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
        );

        setFiles(updatedFiles);
        onFilesUpdate?.(updatedFiles);
        setSavedFiles((prev) => new Set([...prev, file.id]));

        alert(`File saved successfully!\nPublic URL: ${result.publicUrl}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Error saving file to public folder");
    } finally {
      setIsSaving(false);
    }
  };

  // Navigation handlers
  const handleBackToMap = () => {
    // Navigate to root path
    window.location.href = "/";
  };

  const handleOpenMapViewer = () => {
    // In a real app, you might pass the files as URL parameters or store in session
    window.location.href = "/";
  };

  // File processing and validation
  const processFiles = useCallback(
    async (fileList) => {
      const validFiles = Array.from(fileList).filter(
        (file) =>
          file.name.toLowerCase().endsWith(".geojson") ||
          file.name.toLowerCase().endsWith(".json")
      );

      if (validFiles.length === 0) {
        alert("Please select valid GeoJSON files (.geojson or .json)");
        return;
      }

      setIsProcessing(true);
      setProcessingProgress(0);

      const newFiles = [];

      try {
        for (let i = 0; i < validFiles.length; i++) {
          const file = validFiles[i];
          const progress = ((i + 1) / validFiles.length) * 100;
          setProcessingProgress(progress);

          try {
            const text = await file.text();
            const geojsonData = JSON.parse(text);

            // Validate GeoJSON structure
            const validation = validateGeoJSON(geojsonData);

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
            };

            newFiles.push(fileInfo);
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
            };
            newFiles.push(fileInfo);
          }
        }

        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesUpdate?.(updatedFiles);
      } finally {
        setIsProcessing(false);
        setProcessingProgress(0);
      }
    },
    [files, onFilesUpdate]
  );

  // GeoJSON validation
  const validateGeoJSON = (data) => {
    const errors = [];
    const warnings = [];

    if (!data.type) {
      errors.push('Missing required "type" property');
    } else if (data.type !== "FeatureCollection" && data.type !== "Feature") {
      errors.push(
        `Invalid type: ${data.type}. Must be "FeatureCollection" or "Feature"`
      );
    }

    if (data.type === "FeatureCollection") {
      if (!data.features || !Array.isArray(data.features)) {
        errors.push('FeatureCollection must have a "features" array');
      } else if (data.features.length === 0) {
        warnings.push("FeatureCollection is empty (no features)");
      }
    }

    if (data.features) {
      data.features.forEach((feature, index) => {
        if (!feature.type || feature.type !== "Feature") {
          errors.push(`Feature ${index + 1}: Invalid or missing type`);
        }
        if (!feature.geometry) {
          warnings.push(`Feature ${index + 1}: Missing geometry`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  };

  // Calculate bounds
  const calculateBounds = (geojsonData) => {
    if (!geojsonData.features || geojsonData.features.length === 0) return null;

    let minLng = Infinity,
      minLat = Infinity;
    let maxLng = -Infinity,
      maxLat = -Infinity;

    const processCoords = (coords) => {
      if (typeof coords[0] === "number") {
        minLng = Math.min(minLng, coords[0]);
        maxLng = Math.max(maxLng, coords[0]);
        minLat = Math.min(minLat, coords[1]);
        maxLat = Math.max(maxLat, coords[1]);
      } else {
        coords.forEach(processCoords);
      }
    };

    geojsonData.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.coordinates) {
        processCoords(feature.geometry.coordinates);
      }
    });

    if (minLng === Infinity) return null;

    return { minLng, minLat, maxLng, maxLat };
  };

  // Get geometry types
  const getGeometryTypes = (geojsonData) => {
    if (!geojsonData.features) return [];

    const types = new Set();
    geojsonData.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type) {
        types.add(feature.geometry.type);
      }
    });

    return Array.from(types);
  };

  // Get property keys
  const getPropertyKeys = (geojsonData) => {
    if (!geojsonData.features) return [];

    const keys = new Set();
    geojsonData.features.forEach((feature) => {
      if (feature.properties) {
        Object.keys(feature.properties).forEach((key) => keys.add(key));
      }
    });

    return Array.from(keys).slice(0, 10); // Limit to first 10 properties
  };

  // Event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
  };

  const deleteFile = (fileId) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesUpdate?.(updatedFiles);
    setSavedFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  };

  const downloadFile = (file) => {
    if (!file.data) return;

    const blob = new Blob([JSON.stringify(file.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter files
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "valid" && file.isValid) ||
      (filterType === "error" && !file.isValid);
    return matchesSearch && matchesFilter;
  });

  const totalFeatures = files.reduce((sum, file) => sum + file.featureCount, 0);
  const validFiles = files.filter((f) => f.isValid).length;
  const errorFiles = files.filter((f) => !f.isValid).length;
  const publicFiles = files.filter((f) => f.isPublic).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToMap}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Map</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    GeoJSON File Manager
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage and organize your geographic data files
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">
                  {files.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valid Files</p>
                <p className="text-2xl font-bold text-green-600">
                  {validFiles}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Files</p>
                <p className="text-2xl font-bold text-red-600">{errorFiles}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Public Files
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {publicFiles}
                </p>
              </div>
              <Server className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Features
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalFeatures.toLocaleString()}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Upload New Files
            </h2>
            <p className="text-sm text-gray-500">
              Upload GeoJSON files and download them for manual placement in the
              public folder
            </p>
          </div>

          <div className="p-6">
            {isProcessing && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Processing files...
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(processingProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Upload className="w-8 h-8 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drag and drop your GeoJSON files here
                  </h3>
                  <p className="text-gray-500 mb-4">
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
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Choose Files"
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Supported formats: .geojson, .json (Max 10MB per file)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterType === "all"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All Files ({files.length})
                </button>
                <button
                  onClick={() => setFilterType("valid")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterType === "valid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Valid ({validFiles})
                </button>
                <button
                  onClick={() => setFilterType("error")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterType === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
        {filteredFiles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-12 text-center">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {files.length === 0
                  ? "No files uploaded yet"
                  : "No files match your search"}
              </h3>
              <p className="text-gray-500">
                {files.length === 0
                  ? "Upload your first GeoJSON file to get started"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`border rounded-lg p-4 ${
                      file.isValid
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            file.isValid ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <FileText
                            className={`w-5 h-5 ${
                              file.isValid ? "text-green-600" : "text-red-600"
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-sm font-medium text-gray-900 truncate"
                            title={file.name}
                          >
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)} •{" "}
                            {formatDate(file.uploadDate)}
                          </p>
                          {file.publicPath && (
                            <div className="flex items-center space-x-1 mt-1">
                              <Server className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-blue-600">
                                Public
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">
                                {file.savedDate
                                  ? formatDate(file.savedDate)
                                  : "Saved"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        {file.isValid && !savedFiles.has(file.id) && (
                          <button
                            onClick={() => saveToPublicFolder(file)}
                            disabled={isSaving}
                            className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors"
                            title="Download for public folder"
                          >
                            {isSaving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        {file.isValid && (
                          <button
                            onClick={() => downloadFile(file)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded"
                            title="Download file"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Features:</span>
                        <span className="text-xs font-medium">
                          {file.featureCount.toLocaleString()}
                        </span>
                      </div>

                      {file.geometryTypes.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Types:</span>
                          <span className="text-xs font-medium">
                            {file.geometryTypes.join(", ")}
                          </span>
                        </div>
                      )}

                      {file.bounds && (
                        <div className="text-xs text-gray-500">
                          <div className="flex justify-between">
                            <span>Bounds:</span>
                            <span>
                              {file.bounds.minLat.toFixed(3)},{" "}
                              {file.bounds.minLng.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <span>
                              {file.bounds.maxLat.toFixed(3)},{" "}
                              {file.bounds.maxLng.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      )}

                      {file.publicPath && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                          <div className="font-medium mb-1">Public Access:</div>
                          <div className="text-blue-500 font-mono">
                            {file.publicPath}
                          </div>
                          {file.publicUrl && (
                            <div className="text-blue-500 font-mono mt-1">
                              {file.publicUrl}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="mt-3 pt-3 border-t">
                      {file.isValid ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            Valid GeoJSON
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Validation Errors
                            </span>
                          </div>
                          {file.errors.slice(0, 2).map((error, index) => (
                            <p key={index} className="text-xs text-red-600">
                              • {error}
                            </p>
                          ))}
                          {file.errors.length > 2 && (
                            <p className="text-xs text-red-500">
                              ...and {file.errors.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Properties Preview */}
                    {file.properties.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500 mb-1">
                          Properties:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {file.properties.slice(0, 3).map((prop, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                            >
                              {prop}
                            </span>
                          ))}
                          {file.properties.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
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
          </div>
        )}

        {/* Action Buttons */}
        {files.some((f) => f.isValid) && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleOpenMapViewer}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
            >
              <Map className="w-5 h-5" />
              <span>
                Open in Map Viewer ({files.filter((f) => f.isValid).length}{" "}
                files)
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoJSONFileManager;
