import { useCallback, useEffect, useRef, useState } from "react";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import TripForm from "@/components/TripForm";
import { availableActivities, ItineraryPlan, TripDetails, View } from "@/types";
import { AlertTriangleIcon, LoaderIcon, PlaneIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { generateItinerary } from "@/services/geminiService";
import { saveItinerary } from "@/services/historyService";
import { generatePdf } from "@/services/pdfService";
import dayjs from "dayjs";
import { Empty } from "@/components/ui/empty";
import {
  EmptyMuted,
  ErrorEmpty,
  SpinnerEmpty,
} from "@/components/ui/state-banner";

const Planner = () => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: "Goa, India",
    startDate: dayjs().format("YYYY-MM-DD").toString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    personCount: 2,
    activities: [availableActivities[0], availableActivities[2]],
    mapPins: [],
    budget: 50000,
    searchRadius: 10,
  });
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const [view, setView] = useState<View>("planner");
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<ItineraryPlan | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const itineraryRef = useRef<HTMLDivElement>(null);

  const handleFormChange = useCallback((newDetails: Partial<TripDetails>) => {
    setTripDetails((prev) => ({ ...prev, ...newDetails }));
  }, []);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const plan = await generateItinerary(tripDetails);
      setItinerary(plan);
      saveItinerary(plan);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to generate itinerary. The AI model might be busy. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (type: string, title: string) => {
    setModalContent({
      title: `Book Your ${type}`,
      body: `You are about to book for "${title}". Our platform would typically connect to multiple booking APIs for Indian users to find the best deals. For now, this is a demonstration.`,
    });
  };

  const handleDownloadPdf = () => {
    if (itineraryRef.current) {
      const currentPlan =
        view === "history-detail" ? selectedHistoryItem : itinerary;
      generatePdf(itineraryRef.current, currentPlan?.title || "Trip-Plan");
    }
  };

  const handleSendEmail = () => {
    const currentPlan =
      view === "history-detail" ? selectedHistoryItem : itinerary;
    const email = prompt("Please enter your email to send the itinerary:");
    if (email) {
      alert(
        `A PDF of your itinerary for "${currentPlan?.title}" will be sent to ${email}. (This is a simulation)`,
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      <div className="lg:col-span-4 xl:col-span-3">
        <TripForm
          tripDetails={tripDetails}
          onDetailsChange={handleFormChange}
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
        />
      </div>

      <div className="lg:col-span-8 xl:col-span-9 bg-card border border-border rounded-lg p-6 min-h-[600px] flex flex-col">
        {isLoading && (
          <SpinnerEmpty
            loadingType="icon"
            title={[
              "Generating Your Dream Trip...",
              "Crafting Perfect Itinerary...",
              "Finding Best Destinations...",
              "Optimizing Travel Routes...",
              "Personalizing Recommendations...",
            ]}
            description={[
              "Our AI is crafting the perfect itinerary for you. This might take a moment.",
              "Analyzing thousands of destinations to match your preferences.",
              "Comparing flights, hotels, and activities for the best deals.",
              "Creating a personalized travel experience just for you.",
              "AI can make mistakes - please double-check facts with internet research.",
            ]}
          />
        )}
        {error && (
          <ErrorEmpty
            title="Oops! Something went wrong."
            description={error || "Please try again later."}
          />
        )}
        {itinerary && !isLoading && (
          <ItineraryDisplay
            ref={itineraryRef}
            plan={itinerary}
            onBooking={handleBooking}
            onDownloadPdf={handleDownloadPdf}
            onSendEmail={handleSendEmail}
          />
        )}
        {!isLoading && !error && !itinerary && (
          <EmptyMuted
            icon={<PlaneIcon className="text-blue-500" />}
            title={"Your Itinerary Awaits"}
            description={
              "Fill in your travel details on the left and click 'Generate Plan' to let our AI create a personalized journey just for you."
            }
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
