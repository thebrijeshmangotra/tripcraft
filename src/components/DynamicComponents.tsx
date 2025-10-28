import { lazy } from "react";

// Dynamic imports for conditionally rendered components
export const AuthModal = lazy(() => import("./AuthModal"));
export const LocationAutocomplete = lazy(() => import("./LocationAutocomplete"));
export const MapPlaceholder = lazy(() => import("./MapPlaceholder"));
export const ProfileCard = lazy(() => import("./ProfileCard"));

// Export LazyComponent for easy use
export { default as LazyComponent } from "./LazyComponent";
