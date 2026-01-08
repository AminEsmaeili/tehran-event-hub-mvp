import React, { useEffect, useRef } from 'react';
import { Event } from '../types';
import { TEHRAN_CENTER } from '../constants';
import { cn } from "@/lib/utils";

interface MapWrapperProps {
  events: Event[];
  selectedEventId: string | null;
  checkedInIds: string[];
  userLocation: { lat: number; lng: number } | null;
  onEventSelect: (id: string) => void;
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  events,
  selectedEventId,
  checkedInIds,
  userLocation,
  onEventSelect
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const userMarkerRef = useRef<any>(null);

  const getMarkerColor = (event: Event, isSelected: boolean, isCheckedIn: boolean) => {
    if (isSelected) return "#ef4444";
    if (isCheckedIn) return "#22c55e";

    switch (event.category) {
      case 'music': return "#8b5cf6";
      case 'tech': return "#3b82f6";
      case 'art': return "#ec4899";
      case 'food': return "#f59e0b";
      case 'sport': return "#10b981";
      default: return "#3b82f6";
    }
  };

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [TEHRAN_CENTER.lat, TEHRAN_CENTER.lng],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      zoomSnap: 1,
      zoomDelta: 1,
      wheelPxPerZoomLevel: 60,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current) return;

    Object.keys(markersRef.current).forEach(id => {
      if (!events.find(e => e.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    events.forEach(event => {
      const isSelected = selectedEventId === event.id;
      const isCheckedIn = checkedInIds.includes(event.id);
      const color = getMarkerColor(event, isSelected, isCheckedIn);

      if (markersRef.current[event.id]) {
        markersRef.current[event.id].setStyle({
          fillColor: color,
          radius: isSelected ? 10 : 6,
          fillOpacity: isSelected ? 1 : 0.8,
          weight: isSelected ? 3 : 2
        });

        if (isSelected) {
          markersRef.current[event.id].bringToFront();
          // Automatically open tooltip for selected event
          markersRef.current[event.id].openTooltip();
        } else {
          markersRef.current[event.id].closeTooltip();
        }
      } else {
        const marker = L.circleMarker([event.location.lat, event.location.lng], {
          radius: isSelected ? 10 : 6,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
          className: 'custom-marker'
        }).addTo(mapRef.current);

        marker.bindTooltip(`<div class="custom-tooltip-box">${event.title}</div>`, {
          direction: 'top',
          permanent: false,
          sticky: false,
          html: true,
          className: 'font-sans font-bold text-xs rounded-lg border-none shadow-xl px-3 py-2 bg-card text-card-foreground pointer-events-none'
        } as any);

        marker.on('click', () => {
          onEventSelect(event.id);
        });

        markersRef.current[event.id] = marker;
      }
    });
  }, [events, selectedEventId, checkedInIds, onEventSelect]);

  // Handle User Location Marker
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        zIndexOffset: 1000,
        icon: L.divIcon({
          className: 'user-location-marker',
          html: '<div class="relative flex h-5 w-5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-lg"></span></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(mapRef.current);

      userMarkerRef.current.bindTooltip('<div class="custom-tooltip-box">شما اینجاهستید</div>', {
        direction: 'top',
        html: true,
        className: 'font-sans font-bold text-xs px-2 py-1 bg-blue-600 text-white rounded'
      } as any);
    }

    mapRef.current.flyTo([userLocation.lat, userLocation.lng], 14, {
      duration: 1.5,
      easeLinearity: 0.25
    });

  }, [userLocation]);

  useEffect(() => {
    if (!mapRef.current || !selectedEventId) return;
    const event = events.find(e => e.id === selectedEventId);
    if (event) {
      mapRef.current.flyTo([event.location.lat, event.location.lng], 13, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [selectedEventId, events]);

  return <div ref={mapContainerRef} className="w-full h-full bg-muted/20" />;
};

export default MapWrapper;
