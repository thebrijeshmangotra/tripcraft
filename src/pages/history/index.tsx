import React, { useEffect, useState } from "react";
import { ItineraryPlan } from "../../types";
import {
  CalendarIcon,
  MapPinIcon,
  PlaneIcon,
} from "../../components/IconComponents";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import { getHistory, mockHistory } from "@/services/historyService";

const HistoryPage = () => {
  if (history.length === 0) {
    return (
      <Card className="text-center py-12 animate-fade-in">
        <CardContent>
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <PlaneIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl mb-3">No Travel History Yet</CardTitle>
          <CardDescription className="mb-6 max-w-md mx-auto">
            Start planning your first trip to see your travel history here. All
            your generated itineraries will be saved automatically.
          </CardDescription>
          <div className="inline-flex items-center space-x-2 text-primary text-sm">
            <span>Create your first trip plan to get started</span>
            <PlaneIcon className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Travel History</h1>
        <p className="text-muted-foreground">
          Browse through your past trip plans and adventures
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHistory.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
            // onClick={() => onSelect(item)}
          >
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors mb-2">
                {item.title}
              </CardTitle>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">{item.days.length} days</span>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {item.days[0]?.date} -{" "}
                    {item.days[item.days.length - 1]?.date}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.days.reduce(
                    (total, day) => total + day.activities.length,
                    0,
                  )}{" "}
                  activities planned
                </span>
                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Details →
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
