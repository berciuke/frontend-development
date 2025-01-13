"use client";

import { useEffect, useState } from "react";

export default function PokemonDetails({ pokemonDetails }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(stored);
    }
  }, []);

  const toggleFavorite = (name) => {
    let newFavs = [...favorites];
    if (newFavs.includes(name)) {
      newFavs = newFavs.filter((f) => f !== name);
    } else {
      newFavs.push(name);
    }
    setFavorites(newFavs);
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(newFavs));
    }
  };
  const addToComparison = (name) => {
    if (typeof window === "undefined") return;
    const storedComparison = JSON.parse(
      localStorage.getItem("comparison") || "{}"
    );

    const comparsionInfo = {
      id: pokemonDetails.id,
      name: name,
      details: pokemonDetails,
    };

    if (!storedComparison.pokemon1) {
      storedComparison.pokemon1 = comparsionInfo;
    } else {
      if (storedComparison.pokemon1.name !== name) {
        storedComparison.pokemon2 = comparsionInfo;
      }
    }
    localStorage.setItem("comparison", JSON.stringify(storedComparison));
  };

  if (!pokemonDetails) {
    return <div id="details-bar"></div>;
  }

  const { stats, types, height, weight, name, sprites } = pokemonDetails;
  const imageUrl = sprites.front_default;

  const isFavorite = favorites.includes(name);

  return (
    <div id="details-bar">
      <div id="details-header">
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <button onClick={() => toggleFavorite(name)}>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <button onClick={() => addToComparison(name)}>
          Compare
        </button>
      </div>
      <div id="detailed-info">
        <div id="stats">
          {stats.map((val, i) => (
            <div key={i}>
              {val.stat.name}: {val.base_stat}
            </div>
          ))}
        </div>
        <div id="types">
          <p>types:</p>
          {types.map((val, i) => (
            <div key={i}>
              {i + 1}. {val.type.name}
            </div>
          ))}
        </div>
        <div id="height-and-weight">
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
      </div>
    </div>
  );
}
