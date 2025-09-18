import React from 'react';
import { TripDetails, availableActivities } from '../types';
import MapPlaceholder from './MapPlaceholder';
import { LoaderIcon } from './IconComponents';
import LocationAutocomplete from './LocationAutocomplete';

interface TripFormProps {
  tripDetails: TripDetails;
  onDetailsChange: (newDetails: Partial<TripDetails>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ tripDetails, onDetailsChange, onSubmit, isLoading }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onDetailsChange({ [e.target.name]: e.target.value });
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input to be cleared, otherwise parse as number
    onDetailsChange({ [e.target.name]: value === '' ? 0 : parseInt(value, 10) || 0 });
  };

  const handleDestinationChange = (value: string, shouldClearPins?: boolean) => {
    const changes: Partial<TripDetails> = { destination: value };
    if (shouldClearPins) {
        changes.mapPins = [];
    }
    onDetailsChange(changes);
  };

  const handleActivityToggle = (activity: string) => {
    const newActivities = tripDetails.activities.includes(activity)
      ? tripDetails.activities.filter(a => a !== activity)
      : [...tripDetails.activities, activity];
    onDetailsChange({ activities: newActivities });
  };
  
  const handlePinsChange = (newPins: { lat: number; lng: number }[]) => {
    onDetailsChange({ mapPins: newPins });
  }

  const today = new Date().toISOString().split('T')[0];
  
  const commonInputStyles = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const commonLabelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block";


  return (
    <div className="border bg-card text-card-foreground rounded-xl shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground">Plan Your Journey</h2>
          <p className="text-muted-foreground mt-1 text-sm">Fill out the details below to get started.</p>
        </div>
        
        <div className="p-6 pt-0 space-y-6">
            <div>
              <label htmlFor="destination" className={commonLabelStyles}>Destination</label>
              <LocationAutocomplete
                value={tripDetails.destination}
                onValueChange={(val) => handleDestinationChange(val, false)}
                onLocationSelect={(val) => handleDestinationChange(val, true)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className={commonLabelStyles}>Start Date</label>
                <input type="date" name="startDate" id="startDate" value={tripDetails.startDate} min={today} onChange={handleInputChange} className={commonInputStyles} />
              </div>
              <div>
                <label htmlFor="endDate" className={commonLabelStyles}>End Date</label>
                <input type="date" name="endDate" id="endDate" value={tripDetails.endDate} min={tripDetails.startDate} onChange={handleInputChange} className={commonInputStyles} />
              </div>
            </div>

            <div>
              <label htmlFor="personCount" className={commonLabelStyles}>Number of Persons</label>
              <input type="number" min="1" max="15" name="personCount" id="personCount" value={tripDetails.personCount} onChange={handleNumberInputChange} className={commonInputStyles} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className={commonLabelStyles}>Budget (INR)</label>
                  <input type="number" min="0" step="1000" name="budget" id="budget" value={tripDetails.budget} onChange={handleNumberInputChange} className={commonInputStyles} />
                </div>
                <div>
                  <label htmlFor="searchRadius" className={commonLabelStyles}>Radius (km)</label>
                  <input type="number" min="1" max="100" name="searchRadius" id="searchRadius" value={tripDetails.searchRadius} onChange={handleNumberInputChange} className={commonInputStyles} />
                </div>
            </div>

            <div>
              <h3 className={commonLabelStyles}>Preferred Activities</h3>
              <div className="flex flex-wrap gap-2">
                {availableActivities.map(activity => (
                  <button key={activity} onClick={() => handleActivityToggle(activity)} 
                    className={`inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-3 py-1.5 ${tripDetails.activities.includes(activity) ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}>
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className={commonLabelStyles}>Pin Favorite Spots <span className="text-muted-foreground font-normal">(Click to add/remove)</span></h3>
              <MapPlaceholder 
                  destination={tripDetails.destination}
                  pins={tripDetails.mapPins} 
                  onPinsChange={handlePinsChange} 
                  searchRadius={tripDetails.searchRadius}
              />
            </div>
        </div>

        <div className="flex items-center p-6 pt-0">
          <button onClick={onSubmit} disabled={isLoading} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full">
            {isLoading ? (
              <>
                <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : 'Generate Plan'}
          </button>
        </div>
    </div>
  );
};

export default TripForm;