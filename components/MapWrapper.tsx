import React, { useEffect, useRef } from 'react';
import { Event } from '../types';
import { TEHRAN_CENTER } from '../constants';
import { cn } from "@/lib/utils";

interface MapWrapperProps {
  events: Event[];
  selectedEventId: string | null;
  checkedInIds: string[];
  onEventSelect: (id: string) => void;
}

const MapWrapper: React.FC<MapWrapperProps> = ({ events, selectedEventId, checkedInIds, onEventSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  const getMarkerColor = (event: Event, isSelected: boolean, isCheckedIn: boolean) => {
    if (isSelected) return "#ef4444"; // destructive color
    if (isCheckedIn) return "#22c55e"; // success color

    // Category based colors
    switch (event.category) {
      case 'music': return "#8b5cf6";
      case 'tech': return "#3b82f6";
      case 'art': return "#ec4899";
      case 'food': return "#f59e0b";
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
      attributionControl: false
    });

    // Use a cleaner map tile set
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

    // Clear old markers that are no longer in events
    Object.keys(markersRef.current).forEach(id => {
      if (!events.find(e => e.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add or update markers
    events.forEach(event => {
      const isSelected = selectedEventId === event.id;
      const isCheckedIn = checkedInIds.includes(event.id);
      const color = getMarkerColor(event, isSelected, isCheckedIn);

      if (markersRef.current[event.id]) {
        markersRef.current[event.id].setStyle({
          fillColor: color,
          radius: isSelected ? 12 : 8,
          fillOpacity: isSelected ? 1 : 0.8,
          weight: isSelected ? 3 : 2
        });

        if (isSelected) {
          markersRef.current[event.id].bringToFront();
        }
      } else {
        const marker = L.circleMarker([event.location.lat, event.location.lng], {
          radius: isSelected ? 12 : 8,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
          className: cn('custom-marker transition-all duration-300', isSelected && 'ring-4 ring-primary/20')
        }).addTo(mapRef.current);

        marker.bindTooltip(event.title, {
          direction: 'top',
          offset: [0, -10],
          className: 'font-sans font-bold text-xs rounded-lg border-none shadow-xl px-3 py-2 bg-card text-card-foreground rtl'
        });

        marker.on('click', () => {
          onEventSelect(event.id);
        });

        markersRef.current[event.id] = marker;
      }
    });
  }, [events, selectedEventId, checkedInIds, onEventSelect]);

  // Center on selected event
  useEffect(() => {
    if (!mapRef.current || !selectedEventId) return;
    const event = events.find(e => e.id === selectedEventId);
    if (event) {
      mapRef.current.setView([event.location.lat, event.location.lng], 15, {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedEventId, events]);

  return <div ref={mapContainerRef} className="w-full h-full bg-muted/20" />;
};

export default MapWrapper;
