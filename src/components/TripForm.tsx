import React from "react";
import { TripDetails, availableActivities } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/Card";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import DatePicker from "./ui/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
    console.log("activity", activity);
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
            className=""
            type=""
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={tripDetails.startDate}
            onChange={(e) => onDetailsChange({ startDate: e })}
          />
          <DatePicker
            label="End Date"
            value={tripDetails.endDate}
            onChange={(e) => onDetailsChange({ endDate: e })}
          />
        </div>
        <div className="space-y-2 pb-3">
          <label className="text-sm font-medium leading-none">
            Number of Travelers
          </label>
          <Select
            onValueChange={(value) => {
              console.log("e", value);
              onDetailsChange({ personCount: +value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Person" : "People"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <label className="space-y-2">
          <span className="text-sm font-medium leading-none">Budget (₹)</span>
          <Input
            type="number"
            value={tripDetails.budget}
            placeholder="Enter your budget"
            onChange={(e: any) => onDetailsChange({ budget: e.target.value })}
            className=""
          />
        </label>

        <div className="space-y-3">
          <label className="text-sm font-medium leading-none">Interests</label>
          <div className="grid grid-cols-1 gap-3">
            {availableActivities.map((activity) => (
              <Label key={activity} className="flex items-center gap-2">
                <Checkbox
                  className={`peer/${activity}`}
                  checked={tripDetails.activities.includes(activity)}
                  onClick={() => handleActivityToggle(activity)}
                />
                <span
                  className={`peer-checked/${activity}:text-primary-foreground text-sm font-medium leading-none cursor-pointer`}
                >
                  {activity}
                </span>
              </Label>
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
