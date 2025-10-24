import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex"></div>
  );
};

const AppWithErrorBoundary = () => <App />;

export default AppWithErrorBoundary;
