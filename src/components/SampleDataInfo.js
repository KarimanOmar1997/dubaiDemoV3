import { AlertCircle } from 'lucide-react'
import React from 'react'

const SampleDataInfo = ({ allFeaturesData, dataProcessingStatus }) => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] max-w-xs rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800 shadow-lg">
      <div className="flex items-center font-medium text-sm">
        <AlertCircle className="mr-2 h-4 w-4" />
        حالة البيانات
      </div>
      <div className="mt-1 text-xs">
        {dataProcessingStatus === 'loading' && 'جاري تحميل البيانات...'}
        {dataProcessingStatus === 'completed' && (
          <>
            تم تحميل {allFeaturesData.length} حوادث تجريبية في منطقة دبي لاختبار
            وظائف البحث المكاني والزمني.
          </>
        )}
        {dataProcessingStatus === 'error' && 'فشل في تحميل البيانات'}
        {dataProcessingStatus === 'idle' && 'لم يتم تحميل البيانات بعد'}
      </div>
    </div>
  )
}

export default SampleDataInfo
