'use client';

import { useEffect, useState } from 'react';

export default function PokemonDetails({ pokemonDetails, view }) {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  const toggleFavorite = (name) => {
    let newFavs = [...favorites];
    if (newFavs.includes(name)) {
      newFavs = newFavs.filter(f => f !== name);
    } else {
      newFavs.push(name);
    }
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  }

  if (!pokemonDetails) {
    return <div id="details-bar"></div>;
  }

  const { stats, types, height, weight, name, sprites } = pokemonDetails;
  const imageUrl = sprites.front_default;

  const isFavorite = favorites.includes(name);

  if (view === 'stats') {
    return (
      <div id="details-bar">
        <div id="details-header">
          <img src={imageUrl} alt={name} />
          <h1>{name}</h1>
          <button onClick={() => toggleFavorite(name)}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
        <div id="stats">
          {stats.map((val, i) => (
            <div key={i}>
              {val.stat.name}: {val.base_stat}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div id="details-bar">
      <div id="details-header">
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <button onClick={() => toggleFavorite(name)}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
