import React from "react";
import { TripDetails, availableActivities } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface TripFormProps {
  tripDetails: TripDetails;
  onDetailsChange: (details: Partial<TripDetails>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({
  tripDetails,
  onDetailsChange,
  onSubmit,
  isLoading,
}) => {
  const handleActivityToggle = (activity: string) => {
    const newActivities = tripDetails.activities.includes(activity)
      ? tripDetails.activities.filter((a) => a !== activity)
      : [...tripDetails.activities, activity];
    onDetailsChange({ activities: newActivities });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Plan Your Journey</CardTitle>
        <CardDescription>
          Tell us about your dream trip and we'll create the perfect itinerary
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Destination
          </label>
          <Input
            value={tripDetails.destination}
            onChange={(e) => onDetailsChange({ destination: e.target.value })}
            placeholder="Where would you like to go?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Start Date
            </label>
            <Input
              type="date"
              value={tripDetails.startDate}
              onChange={(e) => onDetailsChange({ startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">End Date</label>
            <Input
              type="date"
              value={tripDetails.endDate}
              onChange={(e) => onDetailsChange({ endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Number of Travelers
          </label>
          <select
            value={tripDetails.personCount}
            onChange={(e) =>
              onDetailsChange({ personCount: parseInt(e.target.value) })
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Person" : "People"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Budget (₹)</label>
          <Input
            type="number"
            value={tripDetails.budget}
            onChange={(e) =>
              onDetailsChange({ budget: parseInt(e.target.value) })
            }
            placeholder="Enter your budget"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium leading-none">Interests</label>
          <div className="grid grid-cols-1 gap-3">
            {availableActivities.map((activity) => (
              <div key={activity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={activity}
                  checked={tripDetails.activities.includes(activity)}
                  onChange={() => handleActivityToggle(activity)}
                  className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <label
                  htmlFor={activity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {activity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
              Generating Plan...
            </>
          ) : (
            "Generate My Trip Plan"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TripForm;
