import { Loader2 } from 'lucide-react'
import React from 'react'
import SampleDataInfo from './SampleDataInfo'
import SearchInstructions from './SearchInstructions'
import StatusPanel from './StatusPanel'

const MapPanel = ({
  mapDiv,
  leafletLoaded,
  allFeaturesData,
  availableFiles,
  activeFeatures,
  dataProcessingStatus,
  mapStats,
}) => {
  return (
    <div className="relative w-3/5">
      <div ref={mapDiv} className="h-full min-h-[500px] w-full bg-gray-200">
        {!leafletLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">جاري تحميل الخريطة...</p>
            </div>
          </div>
        )}
      </div>

      <StatusPanel
        availableFiles={availableFiles}
        activeFeatures={activeFeatures}
        dataProcessingStatus={dataProcessingStatus}
        mapStats={mapStats}
      />

      <SearchInstructions />

      <SampleDataInfo
        allFeaturesData={allFeaturesData}
        dataProcessingStatus={dataProcessingStatus}
      />
    </div>
  )
}

export default MapPanel
