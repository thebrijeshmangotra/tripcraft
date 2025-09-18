import React, { forwardRef, useState } from 'react';
import { ItineraryPlan, Activity, BookingType } from '../types';
import { HotelIcon, RestaurantIcon, ActivityIcon, TaxiIcon, CalendarIcon, ClockIcon, DownloadIcon, MailIcon } from './IconComponents';
import ItineraryMap from './ItineraryMap';

interface ItineraryDisplayProps {
  plan: ItineraryPlan;
  onBooking: (type: string, title: string) => void;
  onDownloadPdf: () => void;
  onSendEmail: () => void;
  isReadOnly?: boolean;
}

const iconMap: { [key in NonNullable<BookingType>]: React.ReactNode } = {
  hotel: <HotelIcon className="w-4 h-4" />,
  restaurant: <RestaurantIcon className="w-4 h-4" />,
  activity: <ActivityIcon className="w-4 h-4" />,
  taxi: <TaxiIcon className="w-4 h-4" />,
};

const BookingButton: React.FC<{ activity: Activity, onBooking: ItineraryDisplayProps['onBooking'], isReadOnly?: boolean }> = ({ activity, onBooking, isReadOnly }) => {
  if (isReadOnly || !activity.booking_type) return null;

  const textMap = {
    hotel: 'Book Hotel',
    restaurant: 'Book Table',
    activity: 'Book Tickets',
    taxi: 'Call a Cab',
  };

  return (
    <button onClick={() => onBooking(activity.booking_type!, activity.title)} className="mt-3 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 gap-2">
      {iconMap[activity.booking_type]}
      <span>{textMap[activity.booking_type]}</span>
    </button>
  );
};

const ItineraryDisplay = forwardRef<HTMLDivElement, ItineraryDisplayProps>(({ plan, onBooking, onDownloadPdf, onSendEmail, isReadOnly = false }, ref) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = plan.days[activeDayIndex];
  
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex-shrink-0 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-foreground mb-2 sm:mb-0">{plan.title}</h2>
        {!isReadOnly && (
          <div className="flex items-center gap-2">
            <button onClick={onDownloadPdf} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Download PDF"><DownloadIcon className="w-5 h-5" /></button>
            <button onClick={onSendEmail} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Send Email"><MailIcon className="w-5 h-5" /></button>
          </div>
        )}
      </div>
      
      <div className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground mb-4 overflow-x-auto">
          {plan.days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveDayIndex(index)}
              data-state={index === activeDayIndex ? 'active' : 'inactive'}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Day {day.day}
            </button>
          ))}
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="overflow-y-auto pr-2 -mr-2" ref={ref} style={{ scrollbarWidth: 'thin' }}>
            {activeDay && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">{activeDay.day}</div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground">Day {activeDay.day}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {new Date(activeDay.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="relative border-l-2 border-border ml-5 pl-8">
                    {activeDay.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="mb-8 relative">
                        <div className="absolute -left-[39px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-card"></div>
                        <p className="font-semibold text-primary flex items-center gap-2"><ClockIcon className="w-4 h-4" />{activity.time}</p>
                        <h4 className="font-bold text-lg text-foreground mt-1">{activity.title}</h4>
                        <p className="text-muted-foreground mt-1">{activity.description}</p>
                        <BookingButton activity={activity} onBooking={onBooking} isReadOnly={isReadOnly} />

                        {activity.travel_time_to_next && (
                            <div className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2 border-t border-dashed border-border/50 pt-3">
                                <TaxiIcon className="h-4 w-4" />
                                <span>Travel to next: ~{activity.travel_time_to_next}</span>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
        <div className="h-full min-h-[400px] lg:h-auto rounded-lg overflow-hidden border border-border">
            <ItineraryMap key={activeDayIndex} activities={activeDay?.activities || []} />
        </div>
      </div>
    </div>
  );
});

ItineraryDisplay.displayName = 'ItineraryDisplay';
export default ItineraryDisplay;