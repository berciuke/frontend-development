"use client";
import React from "react";
import { StatsContext } from "./StatsContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const StatsProvider = ({ children }) => {
  const [preferences, setPreferences] = useLocalStorage("statsPreferences", {
    numberFormat: "percentage",
    sortBy: "date",
    viewType: "table",
  });

  const updatePreferences = (newPrefs) => {
    setPreferences({
      ...preferences,
      ...newPrefs,
    });
  };

  return (
    <StatsContext.Provider value={{ ...preferences, updatePreferences }}>
      {children}
    </StatsContext.Provider>
  );
};
