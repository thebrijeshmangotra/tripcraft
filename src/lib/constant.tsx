import { HistoryIcon } from "@/components/IconComponents";
import { SidebarItem } from "@/types";
import { MessageCircle } from "lucide-react";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ajdejrfprzdiokljhhxy.supabase.co";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZGVqcmZwcnpkaW9rbGpoaHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwOTM3OTAsImV4cCI6MjA3NjY2OTc5MH0.ZlVdeY9btALGIBWgpDUUA1utO2XYjnjiXrU0g-hJphQ";

export const geminiApiKey =
  process.env.GEMINI_API_KEY || "AIzaSyAST1S7pLUJIRfytEPuaJQbANgN4CniwtY";

export const sideBarConstants: SidebarItem[] = [
  {
    id: "trip-planner",
    path: "/",
    title: "Trip Planner",
    icon: <MessageCircle />,
  },
  {
    id: "travel-history",
    path: "/history",
    title: "Travel History",
    icon: <HistoryIcon />,
  },
];
