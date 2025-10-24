import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { LoaderIcon, AlertTriangleIcon } from "./IconComponents";

// --- API Key Configuration ---
// IMPORTANT: Do not hardcode API keys in the source code.
// This component loads the Google Maps API key from an environment
// variable named 'GOOGLE_MAPS_API_KEY'.
//
// To use the map feature, you must set this environment variable.
// For example, in a terminal session:
// export GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
import { geminiApiKey } from "@/lib/constant";

const containerStyle = { width: "100%", height: "200px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

interface MapProps {
  destination: string;
  pins: { lat: number; lng: number }[];
  onPinsChange: (pins: { lat: number; lng: number }[]) => void;
  searchRadius: number; // in km
}

const MapComponent: React.FC<MapProps> = ({
  destination,
  pins,
  onPinsChange,
  searchRadius,
}) => {
  if (!geminiApiKey) {
    return (
      <div
        role="alert"
        className="relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 border-destructive/50 text-destructive bg-destructive/10"
      >
        <AlertTriangleIcon className="h-4 w-4" />
        <h5 className="mb-1 font-medium leading-none tracking-tight">
          API Key Missing
        </h5>
        <div className="text-sm [&_p]:leading-relaxed">
          Google Maps API Key is not configured.
        </div>
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: geminiApiKey,
    libraries: ["places", "geocoding"],
  });

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && map && destination) {
      const geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode(
        { address: destination, componentRestrictions: { country: "IN" } },
        (results: any, status: any) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            map.panTo(location);
            map.setZoom(10);
          } else {
            console.warn(`Geocode failed for "${destination}": ${status}`);
            map.panTo(defaultCenter);
            map.setZoom(5);
          }
        },
      );
    }
  }, [destination, isLoaded, map]);

  const handleMapClick = useCallback(
    (e: any) => {
      if (e.latLng) {
        const newPin = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        onPinsChange([...pins, newPin]);
      }
    },
    [pins, onPinsChange],
  );

  const handleMarkerClick = (clickedPinIndex: number) => {
    const newPins = pins.filter((_, index) => index !== clickedPinIndex);
    onPinsChange(newPins);
  };

  const onLoad = useCallback(function callback(mapInstance: any) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg text-muted-foreground">
        Error loading map.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
        <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading Map...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, borderRadius: "0.5rem" }}
      center={defaultCenter}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
      }}
    >
      {pins.map((pin, index) => (
        <React.Fragment key={index}>
          <MarkerF position={pin} onClick={() => handleMarkerClick(index)} />
          {searchRadius > 0 && (
            <CircleF
              center={pin}
              radius={searchRadius * 1000} // Convert km to meters
              options={{
                strokeColor: "#8a2be2",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#8a2be2",
                fillOpacity: 0.2,
                clickable: false,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
