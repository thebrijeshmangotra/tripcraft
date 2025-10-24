import { GoogleGenAI, Type } from "@google/genai";
import { TripDetails, ItineraryPlan } from "../types";

const API_KEY =
  process.env.API_KEY || "AIzaSyAST1S7pLUJIRfytEPuaJQbANgN4CniwtY";

if (!API_KEY) {
  throw new Error(
    "Gemini API Key is missing. Please set the API_KEY environment variable.",
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, short title for the overall trip plan.",
    },
    days: {
      type: Type.ARRAY,
      description: "An array of daily plans.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.INTEGER,
            description: "The day number (1, 2, 3...).",
          },
          date: {
            type: Type.STRING,
            description:
              "The full date for this day's plan in YYYY-MM-DD format.",
          },
          activities: {
            type: Type.ARRAY,
            description: "A list of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: {
                  type: Type.STRING,
                  description:
                    "The suggested time for the activity (e.g., '9:00 AM').",
                },
                title: {
                  type: Type.STRING,
                  description: "The name of the activity or meal.",
                },
                description: {
                  type: Type.STRING,
                  description: "A brief, engaging description of the activity.",
                },
                travel_time_to_next: {
                  type: Type.STRING,
                  description:
                    "Estimated travel time to the next major activity (e.g., '20 minutes'). Can be null for the last activity.",
                  nullable: true,
                },
                booking_type: {
                  type: Type.STRING,
                  description:
                    "Type of booking needed. Can be 'hotel', 'restaurant', 'activity', 'taxi', or null.",
                  enum: ["hotel", "restaurant", "activity", "taxi", null],
                  nullable: true,
                },
                location: {
                  type: Type.OBJECT,
                  description:
                    "Geographic coordinates (latitude, longitude) of the activity's physical location. MUST be provided for all physical locations. Set to null if not applicable (e.g., 'free time').",
                  properties: {
                    lat: { type: Type.NUMBER, description: "Latitude" },
                    lng: { type: Type.NUMBER, description: "Longitude" },
                  },
                  required: ["lat", "lng"],
                  nullable: true,
                },
              },
              required: ["time", "title", "description", "location"],
            },
          },
        },
        required: ["day", "date", "activities"],
      },
    },
  },
  required: ["title", "days"],
};

export const generateItinerary = async (
  details: TripDetails,
): Promise<ItineraryPlan> => {
  const {
    destination,
    startDate,
    endDate,
    personCount,
    activities,
    mapPins,
    budget,
    searchRadius,
  } = details;

  const budgetPrompt =
    budget > 0
      ? `The total budget for the trip for ${personCount} people is approximately ${budget} INR. Please suggest hotels, activities, and dining options that are mindful of this budget (e.g., provide a mix of options or focus on value-for-money choices).`
      : "No specific budget provided.";

  const pinsPrompt =
    mapPins.length > 0
      ? `The user has pinned specific locations of interest at these coordinates (latitude, longitude): ${mapPins.map((p) => `(${p.lat.toFixed(4)}, ${p.lng.toFixed(4)})`).join(", ")}. Please try to incorporate these locations or suggest activities nearby.`
      : "None specified.";

  const radiusPrompt =
    mapPins.length > 0 && searchRadius > 0
      ? `When suggesting activities near the pinned locations, try to keep them within a ${searchRadius} km radius of at least one of the pins.`
      : "Not applicable.";

  const prompt = `
        You are an expert travel planner for India. Create a detailed, day-by-day itinerary based on the user's request.
        The plan must follow the provided JSON schema.

        Key instructions:
        - The first activity on Day 1 should be a 'hotel' suggestion.
        - For every entry with a physical location (hotel, restaurant, landmark, etc.), you MUST provide its geographical coordinates in the 'location' field. This is critical for mapping the itinerary. If an activity is general (like 'Relax') and has no specific point, set 'location' to null.
        - Include breakfast, lunch, and dinner, marking them as 'restaurant' booking types.
        - Logically sequence activities from morning to night.
        - For each activity, provide a time, title, and a brief, engaging description.
        - Estimate travel time to the next major activity.
        - Assign 'booking_type' ('hotel', 'restaurant', 'activity', 'taxi') for actionable items. Use null if not applicable.
        - Create a catchy, short title for the overall trip.

        User's Trip Details:
        - Destination: ${destination}
        - Dates: From ${startDate} to ${endDate}
        - Travelers: ${personCount}
        - Preferred Activities: ${activities.join(", ")}
        - Budget: ${budgetPrompt}
        - Pinned Locations: ${pinsPrompt}
        - Search Radius Constraint: ${radiusPrompt}

        Return ONLY the JSON object that strictly adheres to the schema. Do not include any extra text or markdown.
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    const text = response.text.trim();
    const parsedJson = JSON.parse(text);

    // Basic validation
    if (!parsedJson.title || !Array.isArray(parsedJson.days)) {
      throw new Error("Invalid itinerary structure received from AI.");
    }

    return parsedJson as ItineraryPlan;
  } catch (error) {
    console.error("Error generating itinerary from Gemini:", error);
    throw new Error("Failed to parse or receive valid itinerary from AI.");
  }
};
