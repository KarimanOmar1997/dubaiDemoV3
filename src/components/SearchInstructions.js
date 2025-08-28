import React from "react";
import { Navigation, Clock, Filter, MapPin, Flame } from "lucide-react";

const SearchInstructions = () => {
  return (
    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
        <Navigation className="w-4 h-4 mr-2" />
        البحث الذكي
      </div>
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3 h-3 text-red-500" />
          <span>انقر على الخريطة للبحث المكاني</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3 text-purple-500" />
          <span>اطلب البحث الزمني</span>
        </div>
        <div className="flex items-center space-x-2">
          <Flame className="w-3 h-3 text-orange-500" />
          <span>خريطة حرارية لتحليل الكثافة</span>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-3 h-3 text-blue-500" />
          <span>الاستعلام يظهر النتائج فقط</span>
        </div>
      </div>
    </div>
  );
};

export default SearchInstructions;