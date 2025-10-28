import { lazy } from "react";
import LazyComponent from "@/components/LazyComponent";

const ItineraryDisplay = lazy(() => import("@/components/ItineraryDisplay"));

const HistoryDetails = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col animate-fade-in">
      <div className="mb-4">
        <button
          // onClick={() => setView("history")}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          &larr; Back to Travel History
        </button>
      </div>
      <LazyComponent
        component={ItineraryDisplay}
        fallback={<div className="h-96 animate-pulse bg-muted rounded" />}
        // plan={selectedHistoryItem}
        // isReadOnly={true}
        // onBooking={() => {}}
        // onDownloadPdf={handleDownloadPdf}
        // onSendEmail={handleSendEmail}
      />
    </div>
  );
};

export default HistoryDetails;
