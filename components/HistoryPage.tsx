import React, { useState } from 'react';
import { ItineraryPlan } from '../types';
import { GridIcon, ListIcon, CalendarIcon, PinIcon } from './IconComponents';

interface HistoryPageProps {
  history: ItineraryPlan[];
  onSelect: (item: ItineraryPlan) => void;
}

const HistoryCard: React.FC<{ item: ItineraryPlan, onSelect: () => void }> = ({ item, onSelect }) => {
    const firstDay = item.days[0];
    const destination = item.title.split(' to ')[0].split(' in ')[0].replace('Your Trip to ', '').replace('A Trip to ', '');

    return (
        <div onClick={onSelect} className="bg-card border rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                    <p className="flex items-center gap-2">
                        <PinIcon className="w-4 h-4 text-primary" />
                        <span>{destination}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span>{new Date(firstDay.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} - {item.days.length} day{item.days.length > 1 ? 's' : ''}</span>
                    </p>
                </div>
            </div>
            <div className="p-4 border-t text-right">
                <span className="text-sm font-medium text-primary hover:underline">View Details &rarr;</span>
            </div>
        </div>
    );
};

const HistoryRow: React.FC<{ item: ItineraryPlan, onSelect: () => void }> = ({ item, onSelect }) => {
    const firstDay = item.days[0];
    const destination = item.title.split(' to ')[0].split(' in ')[0].replace('Your Trip to ', '').replace('A Trip to ', '');
    return (
        <div onClick={onSelect} className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center p-4">
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{destination}</p>
            </div>
            <div className="text-sm text-muted-foreground mx-4 text-center hidden sm:block">
                <p>{new Date(firstDay.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}</p>
                <p>{item.days.length} day{item.days.length > 1 ? 's' : ''}</p>
            </div>
            <div className="text-right">
                <span className="text-sm font-medium text-primary hover:underline">View Details &rarr;</span>
            </div>
        </div>
    );
};

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onSelect }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-foreground">My Travel History</h2>
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button onClick={() => setView('list')} data-state={view === 'list' ? 'active' : 'inactive'} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                <ListIcon className="w-5 h-5"/>
            </button>
            <button onClick={() => setView('grid')} data-state={view === 'grid' ? 'active' : 'inactive'} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                <GridIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <h3 className="text-xl font-semibold text-foreground">No trips found</h3>
          <p>Generate a new travel plan to see your history here.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => <HistoryCard key={index} item={item} onSelect={() => onSelect(item)} />)}
        </div>
      ) : (
        <div className="space-y-4">
            {history.map((item, index) => <HistoryRow key={index} item={item} onSelect={() => onSelect(item)} />)}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;