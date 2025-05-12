'use client';

import { Track } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

// Define the context shape
interface TrackContextType {
  hoveredTrack: Track | null;
  selectedTrack: Track | null;
  setHoveredTrack: (track: Track | null) => void;
  setSelectedTrack: (track: Track | null) => void;
}

// Create the context
const TrackContext = createContext<TrackContextType | undefined>(undefined);

// Create a provider for the context
export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <TrackContext.Provider
      value={{
        hoveredTrack,
        selectedTrack,
        setHoveredTrack,
        setSelectedTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTrackContext = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error(
      "useTrackContext must be used inside a TrackProvider"
    );
  }
  return context;
}; 