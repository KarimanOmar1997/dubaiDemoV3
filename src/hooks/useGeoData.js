import { useState, useCallback } from "react";

export const useGeoData = () => {
  const [availableFiles, setAvailableFiles] = useState([]);
  const [allFeaturesData, setAllFeaturesData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [dataProcessingStatus, setDataProcessingStatus] = useState("idle");
  const [activeFeatures, setActiveFeatures] = useState(0);

  const loadGeoJSONFiles = useCallback(async () => {
    try {
      console.log("🔄 بدء تحميل البيانات من الخادم...");
      setConnectionStatus("loading");
      setDataProcessingStatus("loading");
      
      const response = await fetch('http://172.189.56.93:3001/api/files');
      console.log("📡 استجابة الخادم:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`فشل في جلب البيانات: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("📊 بيانات الخادم:", result);
      
      // التحقق من هيكل البيانات
      if (!result || !result.files) {
        console.error("❌ تنسيق البيانات غير متوقع - لا توجد خاصية files");
        throw new Error("تنسيق البيانات غير صحيح - لم يتم العثور على خاصية files");
      }
      
      const data = result.files;
      console.log("📁 عدد الملفات المستلمة:", data.length);
      
      if (!data || !Array.isArray(data)) {
        throw new Error("تنسيق البيانات غير صحيح - لم يتم العثور على مصفوفة files");
      }

      const allFeatures = [];
      const loadedFiles = [];

      for (const file of data) {
        console.log("📄 معالجة الملف:", file.name || "غير معروف");
        
        if (file.data && file.data.features && Array.isArray(file.data.features)) {
          console.log("📍 عدد الميزات في الملف:", file.data.features.length);
          
          const fileFeatures = file.data.features.map((feature, index) => ({
            ...feature,
            sourceFile: file.name || "غير معروف",
            featureIndex: index
          }));
          
          allFeatures.push(...fileFeatures);
          
          loadedFiles.push({
            id: file.id || `file-${Date.now()}`,
            name: file.name || "غير معروف",
            data: file.data,
            featureCount: file.data.features.length,
            bounds: file.bounds || null,
            properties: file.properties || []
          });
        } else {
          console.warn("⚠️ ملف بدون بيانات أو ميزات:", file.name);
        }
      }

      console.log("📊 إجمالي الميزات المحملة:", allFeatures.length);
      
      if (allFeatures.length === 0) {
        throw new Error("لم يتم العثور على بيانات في الملفات");
      }

      setAvailableFiles(loadedFiles);
      setAllFeaturesData(allFeatures);
      setConnectionStatus("connected");
      setDataProcessingStatus("completed");
      
      console.log("✅ تم تحميل البيانات بنجاح");
      
    } catch (err) {
      console.error("❌ فشل في تحميل البيانات:", err);
      setConnectionStatus("error");
      setDataProcessingStatus("error");
    }
  }, []);

  return {
    availableFiles,
    allFeaturesData,
    connectionStatus,
    setConnectionStatus,
    dataProcessingStatus,
    setDataProcessingStatus,
    activeFeatures,
    setActiveFeatures,
    loadGeoJSONFiles,
    setAvailableFiles,
    setAllFeaturesData
  };
};