import React from "react";
import { Loader2 } from "lucide-react";
import StatusPanel from "./StatusPanel";
import SearchInstructions from "./SearchInstructions";
import SampleDataInfo from "./SampleDataInfo";

const MapPanel = ({
  mapDiv,
  leafletLoaded,
  allFeaturesData,
  handleMapAction,
  availableFiles,
  activeFeatures,
  dataProcessingStatus,
  mapStats
}) => {
  return (
    <div className="w-3/5 relative">
      <div ref={mapDiv} className="w-full h-full min-h-[500px] bg-gray-200">
        {!leafletLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
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
  );
};

export default MapPanel;