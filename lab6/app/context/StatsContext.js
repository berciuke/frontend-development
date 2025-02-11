"use client";
import { createContext } from "react";

export const StatsContext = createContext({
  numberFormat: "percentage", 
  sortBy: "date", 
  viewType: "table", 
  updatePreferences: () => {},
});
