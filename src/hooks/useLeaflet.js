import { useState, useEffect } from "react";

export const useLeaflet = (setConnectionStatus) => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    const loadLeaflet = async () => {
      if (window.L) {
        setLeafletLoaded(true);
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => setLeafletLoaded(true);
      script.onerror = () => {
        console.error("Failed to load Leaflet");
        setConnectionStatus("error");
      };
      document.head.appendChild(script);
    };

    loadLeaflet();
  }, [setConnectionStatus]);

  return { leafletLoaded };
};