import { forwardRef } from "react";
import { ItineraryPlan } from "../types";
import {
  DownloadIcon,
  EmailIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
} from "./IconComponents";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/Card";
import { Button } from "./ui/button";

interface ItineraryDisplayProps {
  plan: ItineraryPlan;
  isReadOnly?: boolean;
  onBooking?: (type: string, title: string) => void;
  onDownloadPdf?: () => void;
  onSendEmail?: () => void;
}

const ItineraryDisplay = forwardRef<HTMLDivElement, ItineraryDisplayProps>(
  ({
    plan,
    isReadOnly = false,
    onBooking,
    onDownloadPdf,
    onSendEmail,
    ref,
  }) => {
    console.log("ref", ref);
    const getBookingButtonText = (type: string) => {
      switch (type) {
        case "hotel":
          return "Book Hotel";
        case "restaurant":
          return "Reserve Table";
        case "activity":
          return "Book Activity";
        case "taxi":
          return "Book Ride";
        default:
          return "Book Now";
      }
    };

    const getBookingButtonVariant = (
      type: string,
    ):
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "ghost"
      | "link" => {
      switch (type) {
        case "hotel":
          return "default";
        case "restaurant":
          return "secondary";
        case "activity":
          return "outline";
        case "taxi":
          return "secondary";
        default:
          return "default";
      }
    };

    return (
      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{plan.days.length} days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">India</span>
                  </div>
                </div>
              </div>

              {!isReadOnly && (
                <div className="flex space-x-2">
                  <Button onClick={onDownloadPdf} variant="outline" size="sm">
                    <DownloadIcon className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button onClick={onSendEmail} size="sm">
                    <EmailIcon className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Days */}
        {plan.days.map((day) => (
          <Card key={day.day}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {day.day}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-xl">Day {day.day}</CardTitle>
                  <CardDescription>{day.date}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-muted/50 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <ClockIcon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {activity.time}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {activity.description}
                        </p>

                        {activity.travel_time_to_next && (
                          <div className="mt-3 p-2 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">
                              🚗 Travel time to next activity:{" "}
                              {activity.travel_time_to_next}
                            </p>
                          </div>
                        )}
                      </div>

                      {activity.booking_type && !isReadOnly && onBooking && (
                        <Button
                          onClick={() =>
                            onBooking(activity.booking_type!, activity.title)
                          }
                          variant={getBookingButtonVariant(
                            activity.booking_type,
                          )}
                          size="sm"
                          className="ml-4"
                        >
                          {getBookingButtonText(activity.booking_type)}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Footer */}
        <Card>
          <CardContent className="text-center py-8">
            <CardTitle className="text-lg mb-2">
              Ready for Your Adventure?
            </CardTitle>
            <CardDescription>
              Your personalized itinerary is ready! Book your accommodations and
              activities to secure your perfect trip.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  },
);

ItineraryDisplay.displayName = "ItineraryDisplay";

export default ItineraryDisplay;
