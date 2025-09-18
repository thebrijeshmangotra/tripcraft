import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TripDetails, ItineraryPlan, availableActivities } from './types';
import { generateItinerary } from './services/geminiService';
import { generatePdf } from './services/pdfService';
import { getHistory, saveItinerary } from './services/historyService';
import Sidebar from './components/Header';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import HistoryPage from './components/HistoryPage';
import { LoaderIcon, AlertTriangleIcon, PlaneIcon } from './components/IconComponents';
import Modal from './components/Modal';

type View = 'planner' | 'history' | 'history-detail';

const App: React.FC = () => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: 'Goa, India',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    personCount: 2,
    activities: [availableActivities[0], availableActivities[2]],
    mapPins: [],
    budget: 50000,
    searchRadius: 10,
  });
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);
  
  const [view, setView] = useState<View>('planner');
  const [travelHistory, setTravelHistory] = useState<ItineraryPlan[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ItineraryPlan | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setTravelHistory(getHistory());
  }, []);
  
  const itineraryRef = useRef<HTMLDivElement>(null);

  const handleFormChange = useCallback((newDetails: Partial<TripDetails>) => {
    setTripDetails(prev => ({ ...prev, ...newDetails }));
  }, []);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const plan = await generateItinerary(tripDetails);
      setItinerary(plan);
      const updatedHistory = saveItinerary(plan);
      setTravelHistory(updatedHistory);
    } catch (err) {
      console.error(err);
      setError('Failed to generate itinerary. The AI model might be busy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (type: string, title: string) => {
    setModalContent({
      title: `Book Your ${type}`,
      body: `You are about to book for "${title}". Our platform would typically connect to multiple booking APIs for Indian users to find the best deals. For now, this is a demonstration.`
    });
  };

  const handleDownloadPdf = () => {
    if (itineraryRef.current) {
        const currentPlan = view === 'history-detail' ? selectedHistoryItem : itinerary;
        generatePdf(itineraryRef.current, currentPlan?.title || 'Trip-Plan');
    }
  };

  const handleSendEmail = () => {
    const currentPlan = view === 'history-detail' ? selectedHistoryItem : itinerary;
    const email = prompt("Please enter your email to send the itinerary:");
    if (email) {
      alert(`A PDF of your itinerary for "${currentPlan?.title}" will be sent to ${email}. (This is a simulation)`);
    }
  };

  const handleNavigate = (targetView: 'planner' | 'history') => {
      setItinerary(null);
      setError(null);
      setSelectedHistoryItem(null);
      setView(targetView);
  }

  const handleViewHistoryDetail = (item: ItineraryPlan) => {
    setSelectedHistoryItem(item);
    setView('history-detail');
  };

  const renderContent = () => {
    switch(view) {
        case 'history':
            return <HistoryPage history={travelHistory} onSelect={handleViewHistoryDetail} />;
        case 'history-detail':
            return selectedHistoryItem && (
                <div className="bg-card border border-border rounded-lg p-6 flex flex-col animate-fade-in">
                    <div className="mb-4">
                      <button onClick={() => setView('history')} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                          &larr; Back to Travel History
                      </button>
                    </div>
                    <ItineraryDisplay 
                        ref={itineraryRef}
                        plan={selectedHistoryItem}
                        isReadOnly={true}
                        onBooking={() => {}}
                        onDownloadPdf={handleDownloadPdf}
                        onSendEmail={handleSendEmail}
                    />
                </div>
            );
        case 'planner':
        default:
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
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                      <LoaderIcon className="w-16 h-16 animate-spin text-primary mb-4" />
                      <h2 className="text-xl font-semibold text-foreground">Generating Your Dream Trip...</h2>
                      <p className="mt-2">Our AI is crafting the perfect itinerary for you. This might take a moment.</p>
                    </div>
                  )}
                  {error && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-destructive-foreground bg-destructive/10 border border-destructive/50 p-6 rounded-lg">
                      <AlertTriangleIcon className="w-12 h-12 mb-4 text-destructive" />
                      <h2 className="text-xl font-semibold">Oops! Something went wrong.</h2>
                      <p className="mt-2">{error}</p>
                    </div>
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
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                           <PlaneIcon className="h-12 w-12 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">Your Itinerary Awaits</h2>
                      <p className="mt-2 max-w-md">Fill in your travel details on the left and click "Generate Plan" to let our AI create a personalized journey just for you.</p>
                    </div>
                  )}
                </div>
              </div>
            );
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onNavigate={handleNavigate}
          currentView={view}
      />
      <main className={`flex-grow p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {renderContent()}
      </main>
      {modalContent && (
        <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
          <p className="text-muted-foreground">{modalContent.body}</p>
        </Modal>
      )}
    </div>
  );
};

export default App;