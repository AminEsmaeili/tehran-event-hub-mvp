import React from 'react';
import { Event, EventStatus } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  isCheckedIn: boolean;
  onCheckIn: (id: string) => void;
  onSelect: (event: Event) => void;
  isSelected: boolean;
}

const statusMap: Record<EventStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; dot?: boolean }> = {
  upcoming: { label: 'در پیش رو', variant: 'secondary' },
  ongoing: { label: 'در حال برگزاری', variant: 'default', dot: true },
  past: { label: 'برگزار شده', variant: 'outline' },
};

const EventCard: React.FC<EventCardProps> = ({ event, isCheckedIn, onCheckIn, onSelect, isSelected }) => {
  const statusInfo = statusMap[event.status];

  return (
    <Card
      className={cn(
        "mb-4 overflow-hidden transition-all cursor-pointer border-2 hover:border-primary/50",
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
      )}
      onClick={() => onSelect(event)}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-20 h-20 rounded-md object-cover shadow-sm"
            />
            {statusInfo.dot && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white"></span>
              </span>
            )}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-1 gap-2">
              <h3 className="font-bold text-base leading-tight truncate">{event.title}</h3>
              <Badge variant={statusInfo.variant} className="shrink-0 text-[10px] px-1.5 py-0 h-5">
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3 truncate">{event.address}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.startTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <span className="text-sm">{event.checkInCount + (isCheckedIn ? 1 : 0)}</span>
                <Users className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCheckIn(event.id);
          }}
          disabled={isCheckedIn || event.status === 'past'}
          className="mt-4 w-full font-bold shadow-sm"
          variant={isCheckedIn ? "secondary" : event.status === 'past' ? "outline" : "default"}
          size="sm"
        >
          {isCheckedIn ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              حضور شما ثبت شد
            </span>
          ) : event.status === 'past' ? (
            'رویداد به پایان رسیده'
          ) : (
            'ثبت حضور (Check-in)'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
