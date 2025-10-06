import { Clock, Filter, Flame, MapPin, Navigation } from 'lucide-react'
import React from 'react'

const SearchInstructions = () => {
  return (
    <div className="absolute top-4 right-4 z-[1000] max-w-xs rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm">
      <div className="mb-2 flex items-center font-medium text-gray-700 text-sm">
        <Navigation className="mr-2 h-4 w-4" />
        البحث الذكي
      </div>
      <div className="space-y-2 text-gray-600 text-xs">
        <div className="flex items-center space-x-2">
          <MapPin className="h-3 w-3 text-red-500" />
          <span>انقر على الخريطة للبحث المكاني</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-3 w-3 text-purple-500" />
          <span>اطلب البحث الزمني</span>
        </div>
        <div className="flex items-center space-x-2">
          <Flame className="h-3 w-3 text-orange-500" />
          <span>خريطة حرارية لتحليل الكثافة</span>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-3 w-3 text-blue-500" />
          <span>الاستعلام يظهر النتائج فقط</span>
        </div>
      </div>
    </div>
  )
}

export default SearchInstructions
