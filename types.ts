
export interface EventLocation {
  lat: number;
  lng: number;
}

export type EventStatus = 'upcoming' | 'ongoing' | 'past';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: EventLocation;
  address: string;
  category: 'music' | 'tech' | 'art' | 'food' | 'sport';
  status: EventStatus;
  startTime: string;
  organizer: string;
  checkInCount: number;
  imageUrl: string;
}

export interface UserState {
  checkedInEvents: string[];
}
