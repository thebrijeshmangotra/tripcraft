export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  personCount: number;
  activities: string[];
  mapPins: { lat: number; lng: number }[];
  budget: number;
  searchRadius: number;
}

export type BookingType = "hotel" | "restaurant" | "activity" | "taxi" | null;

export interface Activity {
  time: string;
  title: string;
  description: string;
  travel_time_to_next: string | null;
  booking_type: BookingType;
  location: { lat: number; lng: number } | null;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
}

export interface ItineraryPlan {
  title: string;
  days: DayPlan[];
}

export const availableActivities = [
  "Adventure & Outdoors",
  "History & Culture",
  "Relaxation & Wellness",
  "Food & Culinary",
  "Shopping",
  "Nightlife",
];

export type View = "planner" | "history" | "history-detail";

export interface SidebarItem {
  id: string;
  path: string;
  title: string;
  icon: React.ReactNode;
}
