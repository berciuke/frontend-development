"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function FavoritesPage() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || "";
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    let favs = [...stored];
    if (sort === 'name') {
      favs.sort();
    }
    setFavorites(favs);
  }, [sort]);

  if(favorites.length == 0) {
    return <p>You have no favorite Pokemons.</p>
  }

  const removeFavorite = (name) => {
    const newFavs = favorites.filter(f => f !== name);
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };
  return (
    <div id="favorites-list">
      <ul>
        {favorites.map(name => (
          <li key={name} className='favorite-element'>
            {name}
            <button id ="remove-btn" onClick={() => removeFavorite(name)}>REMOVE</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
