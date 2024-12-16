"use client";

import { useRouter } from 'next/navigation';

export default function PokemonList({ pokemons }) {
  const router = useRouter();

  const handleSelectPokemon = (id) => {
    router.push(`/pokemon/${id}`);
  }

  return (
    <div id="list">
      {pokemons.map((pokemon, i) => (
        <div className="pokemon" key={i} onClick={() => handleSelectPokemon(pokemon.i)}>
          <p>{pokemon.i}. {pokemon.name}</p>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
}
