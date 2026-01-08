
import React from 'react';
import { Event, EventStatus } from '../types';

interface EventCardProps {
  event: Event;
  isCheckedIn: boolean;
  onCheckIn: (id: string) => void;
  onSelect: (event: Event) => void;
  isSelected: boolean;
}

const statusMap: Record<EventStatus, { label: string; color: string; dot: boolean }> = {
  upcoming: { label: 'در پیش رو', color: 'bg-blue-100 text-blue-700', dot: false },
  ongoing: { label: 'در حال برگزاری', color: 'bg-green-100 text-green-700', dot: true },
  past: { label: 'برگزار شده', color: 'bg-gray-100 text-gray-500', dot: false },
};

const EventCard: React.FC<EventCardProps> = ({ event, isCheckedIn, onCheckIn, onSelect, isSelected }) => {
  const statusInfo = statusMap[event.status];

  return (
    <div 
      className={`p-4 mb-4 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
      onClick={() => onSelect(event)}
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-20 h-20 rounded-lg object-cover" 
          />
          {statusInfo.dot && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white"></span>
            </span>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg leading-tight truncate">{event.title}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ml-2 ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2 truncate">{event.address}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">{event.startTime}</span>
            <div className="flex items-center gap-1 text-blue-600 font-bold">
              <span className="text-sm">{event.checkInCount + (isCheckedIn ? 1 : 0)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onCheckIn(event.id);
        }}
        disabled={isCheckedIn || event.status === 'past'}
        className={`mt-4 w-full py-2 rounded-lg font-bold text-sm transition-colors ${
          isCheckedIn 
            ? 'bg-green-100 text-green-700 cursor-default' 
            : event.status === 'past'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isCheckedIn ? '✓ حضور شما ثبت شد' : event.status === 'past' ? 'رویداد به پایان رسیده' : 'ثبت حضور (Check-in)'}
      </button>
    </div>
  );
};

export default EventCard;
