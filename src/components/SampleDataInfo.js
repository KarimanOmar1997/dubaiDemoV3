import React from "react";
import { AlertCircle } from "lucide-react";

const SampleDataInfo = ({ allFeaturesData, dataProcessingStatus }) => {
  return (
    <div className="absolute bottom-4 left-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg shadow-lg p-3 z-[1000] max-w-xs">
      <div className="text-sm font-medium flex items-center">
        <AlertCircle className="w-4 h-4 mr-2" />
        حالة البيانات
      </div>
      <div className="text-xs mt-1">
        {dataProcessingStatus === "loading" && "جاري تحميل البيانات..."}
        {dataProcessingStatus === "completed" && (
          <>تم تحميل {allFeaturesData.length} حوادث تجريبية في منطقة دبي لاختبار وظائف البحث المكاني والزمني.
</>
        )}
        {dataProcessingStatus === "error" && "فشل في تحميل البيانات"}
        {dataProcessingStatus === "idle" && "لم يتم تحميل البيانات بعد"}
      </div>
    </div>
  );
};

export default SampleDataInfo;