import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Activity } from '../types';
import { LoaderIcon } from './IconComponents';

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const containerStyle = { width: '100%', height: '100%' };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

interface ItineraryMapProps {
  activities: Activity[];
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ activities }) => {
  if (!MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center h-full bg-destructive/10 text-destructive-foreground rounded-lg p-4 text-center">
        Google Maps API Key is not configured.
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script-itinerary',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ['places', 'geocoding'],
  });

  const mapRef = useRef<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [locations, setLocations] = useState<{lat: number, lng: number}[]>([]);

  useEffect(() => {
    const validLocations = activities.map(a => a.location).filter(loc => loc !== null) as { lat: number; lng: number; }[];
    setLocations(validLocations);
    setDirectionsResponse(null); // Reset directions when activities change
  }, [activities]);

  const directionsCallback = useCallback((response: any, status: any) => {
    if (status === 'OK' && response) {
      setDirectionsResponse(response);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  }, []);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    if (locations.length > 0) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      locations.forEach(loc => bounds.extend(loc));
      map.fitBounds(bounds);
    }
  }, [locations]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);
  
  const hasMultipleLocations = locations.length > 1;

  if (loadError) return <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg text-muted-foreground">Error loading map.</div>;
  if (!isLoaded) return (
    <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg">
      <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locations.length > 0 ? locations[0] : defaultCenter}
      zoom={locations.length > 0 ? 12 : 6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
      }}
    >
      {isLoaded && hasMultipleLocations && !directionsResponse && (
        <DirectionsService
          options={{
            origin: locations[0],
            destination: locations[locations.length - 1],
            waypoints: locations.slice(1, -1).map(loc => ({ location: loc, stopover: true })),
            travelMode: 'DRIVING' as any,
          }}
          callback={directionsCallback}
        />
      )}

      {directionsResponse && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#6f42c1',
              strokeOpacity: 0.8,
              strokeWeight: 6
            }
          }}
        />
      )}

      {locations.map((loc, index) => (
        <MarkerF
          key={index}
          position={loc}
          label={{
            text: (index + 1).toString(),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
          icon={{
            path: (window as any).google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#6f42c1',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default ItineraryMap;