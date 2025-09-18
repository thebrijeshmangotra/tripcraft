import { ItineraryPlan } from '../types';

const HISTORY_KEY = 'gemini-trip-planner-history';

const mockHistory: ItineraryPlan[] = [
  {
    "title": "Historical Journey through Delhi",
    "days": [
      {
        "day": 1,
        "date": "2024-08-15",
        "activities": [
          { "time": "2:00 PM", "title": "Check-in: The Imperial Hotel", "description": "Settle into your luxurious room at one of Delhi's most iconic hotels.", "travel_time_to_next": "30 minutes", "booking_type": "hotel", "location": { "lat": 28.6273, "lng": 77.2167 } },
          { "time": "4:00 PM", "title": "India Gate", "description": "Visit the iconic war memorial.", "travel_time_to_next": "20 minutes", "booking_type": "activity", "location": { "lat": 28.6129, "lng": 77.2295 } },
          { "time": "7:00 PM", "title": "Dinner at Bukhara", "description": "Experience world-renowned North-West Frontier cuisine.", "travel_time_to_next": null, "booking_type": "restaurant", "location": { "lat": 28.5969, "lng": 77.1764 } }
        ]
      }
    ]
  },
  {
    "title": "Mumbai Film City Exploration",
    "days": [
      {
        "day": 1,
        "date": "2024-07-20",
        "activities": [
          { "time": "1:00 PM", "title": "Check-in: Taj Lands End", "description": "Enjoy views of the Arabian Sea.", "travel_time_to_next": "45 minutes", "booking_type": "hotel", "location": { "lat": 19.043, "lng": 72.822 } },
          { "time": "3:00 PM", "title": "Film City Tour", "description": "A guided tour of Bollywood's famous studios.", "travel_time_to_next": "30 minutes", "booking_type": "activity", "location": { "lat": 19.162, "lng": 72.871 } },
          { "time": "8:00 PM", "title": "Dinner at Wasabi by Morimoto", "description": "Authentic Japanese cuisine at The Taj Mahal Palace hotel.", "travel_time_to_next": null, "booking_type": "restaurant", "location": { "lat": 18.921, "lng": 72.833 } }
        ]
      }
    ]
  }
];

export const getHistory = (): ItineraryPlan[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    // If no history, seed with mock data
    localStorage.setItem(HISTORY_KEY, JSON.stringify(mockHistory));
    return mockHistory;
  } catch (error) {
    console.error("Failed to load travel history:", error);
    return [];
  }
};

export const saveItinerary = (itinerary: ItineraryPlan) => {
  try {
    const history = getHistory();
    // Prepend new itinerary to history to show it first
    const updatedHistory = [itinerary, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error("Failed to save itinerary:", error);
    return getHistory();
  }
};
