import React from "react";
import { HistoryIcon, MenuIcon, UserIcon, LogOutIcon } from "./IconComponents";
import { supabase } from "../services/authService";
import { Button } from "./ui/button";
import { Map, MessageCircle } from "lucide-react";
import { ThemeToggler } from "./ui/ThemeToggler";

interface SidebarProps {
  isSidebarOpen: boolean;
  onToggle: () => void;
  onNavigate: (_event: "planner" | "history") => void;
  currentView: string;
  user: {
    email: string;
    id: string;
  };
  onAuthClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  onToggle,
  onNavigate,
  currentView,
  user,
  onAuthClick,
}) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center space-x-3 ${!isSidebarOpen && "justify-center"}`}
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center p-2">
                  <Map />
                </div>
                {isSidebarOpen && (
                  <div>
                    <h1 className="text-lg font-semibold">Good Trip</h1>
                    <p className="text-xs text-muted-foreground">
                      AI Travel Planner
                    </p>
                  </div>
                )}
              </div>
              <Button onClick={onToggle} variant="ghost" size="icon">
                <MenuIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Button
                onClick={() => onNavigate("planner")}
                variant={currentView === "planner" ? "default" : "ghost"}
                className="w-full flex justify-start items-start"
              >
                <MessageCircle className="w-5 h-5" />
                {isSidebarOpen && <span>Trip Planner</span>}
              </Button>

              <Button
                onClick={() => onNavigate("history")}
                variant={
                  currentView === "history" || currentView === "history-detail"
                    ? "default"
                    : "ghost"
                }
                className={`w-full justify-start ${!isSidebarOpen && "px-0 justify-center"}`}
              >
                <HistoryIcon className="w-5 h-5" />
                {isSidebarOpen && <span>Travel History</span>}
              </Button>
            </div>
          </nav>

          {/* User Section */}
          <div className="flex p-4 border-t border-border gap-2 itmes-center">
            {user ? (
              <div className="flex-1 space-y-2">
                <div
                  className={`flex items-center space-x-3 px-3 py-2 ${!isSidebarOpen && "justify-center"}`}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">Signed in</p>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className={`w-full justify-start ${!isSidebarOpen && "px-0 justify-center"}`}
                >
                  <LogOutIcon className="w-4 h-4" />
                  {isSidebarOpen && <span className="text-sm">Sign out</span>}
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                className={`w-full justify-start ${!isSidebarOpen && "px-0 justify-center"}`}
              >
                <UserIcon className="w-4 h-4" />
                {isSidebarOpen && <span>Sign In</span>}
              </Button>
            )}
            <ThemeToggler />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
