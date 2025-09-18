import React, { useState, useEffect, useRef } from 'react';
import { PlaneIcon, LayoutDashboardIcon, HistoryIcon, ChevronLeftIcon } from './IconComponents';
import ProfileCard from './ProfileCard';

interface SidebarProps {
    isSidebarOpen: boolean;
    onToggle: () => void;
    onNavigate: (view: 'planner' | 'history') => void;
    currentView: string;
}

const NavItem: React.FC<{
    isSidebarOpen: boolean;
    icon: React.ReactNode;
    text: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ isSidebarOpen, icon, text, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full h-12 px-4 rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
    >
        <div className="flex-shrink-0 w-6 h-6">{icon}</div>
        <span
            className={`ml-4 text-sm font-medium transition-opacity duration-200 ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {text}
        </span>
    </button>
);


const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onToggle, onNavigate, currentView }) => {
  const [isProfileCardOpen, setProfileCardOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setProfileCardOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = {
    name: "Alex Ferguson",
    email: "alex.ferguson@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=alexferguson",
  };
  
  return (
    <aside
        className={`fixed top-0 left-0 h-full bg-card border-r border-border flex flex-col z-50 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
        }`}
    >
        <div className="flex items-center h-20 px-4 border-b border-border flex-shrink-0">
            <PlaneIcon className="w-8 h-8 text-primary" />
            <h1
                className={`ml-3 text-xl font-bold text-foreground transition-opacity duration-200 ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0'
                }`}
            >
                Gemini Trips
            </h1>
        </div>

        <nav className="flex-grow p-4 space-y-2">
            <NavItem
                isSidebarOpen={isSidebarOpen}
                icon={<LayoutDashboardIcon />}
                text="Plan New Trip"
                isActive={currentView.startsWith('planner')}
                onClick={() => onNavigate('planner')}
            />
            <NavItem
                isSidebarOpen={isSidebarOpen}
                icon={<HistoryIcon />}
                text="My Travel History"
                isActive={currentView.startsWith('history')}
                onClick={() => onNavigate('history')}
            />
        </nav>

        <div className="p-4 border-t border-border" ref={profileRef}>
          <div 
            onClick={() => setProfileCardOpen(!isProfileCardOpen)}
            className="flex items-center p-2 rounded-lg hover:bg-muted cursor-pointer"
          >
              <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
              {isSidebarOpen && (
                  <div className="ml-3">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
              )}
          </div>

          {isProfileCardOpen && <ProfileCard user={user} onClose={() => setProfileCardOpen(false)} />}
        </div>
        
        <button
            onClick={onToggle}
            className="absolute -right-3 top-20 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
            <ChevronLeftIcon className={`w-4 h-4 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
        </button>
    </aside>
  );
};

export default Sidebar;
