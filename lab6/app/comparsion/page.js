"use client";

import { useState, useEffect } from "react";
import CompareCard from '../components/CompareCard';

export default function ComparisonPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("comparison");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
    }
  }, []);

  const clearComparison = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("comparison");
    setData(null);
  };

  if (!data || (!data.pokemon1 && !data.pokemon2)) {
    return (
      <div id="comparison-container">
        <p>Click "Compare" at Pokemon page.</p>
      </div>
    );
  }

  return (
    <div id="comparison-container">
      <div id="cards-wrapper">
        <CompareCard data={data.pokemon1} />
        <CompareCard data={data.pokemon2} />
      </div>
      <button onClick={clearComparison} className="clear-button">
        Clear
      </button>
    </div>
  );
}
