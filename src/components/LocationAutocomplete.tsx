/** eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";

// A simple debounce function to limit API calls while typing
const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced;
};

interface Suggestion {
  place_id: number;
  display_name: string;
}

interface LocationAutocompleteProps {
  value: string;
  onValueChange: (value: string) => void;
  onLocationSelect: (location: string) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onValueChange,
  onLocationSelect,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      // Use Nominatim API for location suggestions, restricted to India
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=in&limit=5`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch location suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the fetch function to avoid excessive API calls
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  useEffect(() => {
    if (showSuggestions && value) {
      debouncedFetch(value);
    } else {
      setSuggestions([]);
    }
  }, [value, showSuggestions, debouncedFetch]);

  // Effect to handle clicks outside the component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Clean up the display name for better readability
    const nameParts = suggestion.display_name.split(",");
    const cleanName =
      nameParts.length > 1
        ? `${nameParts[0].trim()}, ${nameParts[nameParts.length - 2].trim()}`
        : suggestion.display_name;

    onLocationSelect(cleanName);
    setShowSuggestions(false);
  };

  const commonInputStyles =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        name="destination"
        id="destination"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        className={commonInputStyles}
        placeholder="e.g., Mumbai, Goa, Delhi"
        autoComplete="off"
      />
      {showSuggestions && value.length > 2 && (
        <div className="absolute z-10 w-full mt-1">
          <div className="w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {isLoading && (
              <p className="px-2 py-1.5 text-sm text-muted-foreground">
                Searching...
              </p>
            )}
            {!isLoading && suggestions.length === 0 && (
              <p className="px-2 py-1.5 text-sm text-muted-foreground">
                No results found.
              </p>
            )}
            {!isLoading &&
              suggestions.map((s) => (
                <div
                  key={s.place_id}
                  onClick={() => handleSuggestionClick(s)}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {s.display_name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
