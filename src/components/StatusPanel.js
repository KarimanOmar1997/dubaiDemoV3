import React from "react";
import { FileText } from "lucide-react";

const StatusPanel = ({ availableFiles, activeFeatures, dataProcessingStatus, mapStats }) => {
  return (
    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-[1000] max-w-sm">
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FileText className="w-4 h-4 mr-2" />
        حالة البيانات
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>إجمالي:</span>
          <span className="font-medium">{mapStats.features.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>الملفات المحملة:</span>
          <span className="font-medium">{availableFiles.length}</span>
        </div>
        <div className="flex justify-between">
          <span>المعروض حالياً:</span>
          <span className="font-medium text-red-600">{activeFeatures}</span>
        </div>
        <div className={`text-xs p-2 rounded ${
          dataProcessingStatus === 'completed' ? 'bg-green-50 text-green-700' :
          dataProcessingStatus === 'loading' ? 'bg-blue-50 text-blue-700' :
          'bg-gray-50 text-gray-700'
        }`}>
          الحالة: {dataProcessingStatus === "completed" ? "مكتمل" : dataProcessingStatus === "loading" ? "جاري التحميل" : "متوقف"}
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;