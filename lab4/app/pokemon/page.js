"use client";

import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import FilterBar from "../components/FilterBar";

async function fetchPokemons({ search = "", type = "", limit = 200 }) {
  let parameter = `?limit=${limit}`;

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + parameter
  );
  const data = await response.json();
  let filteredPokemons = data.results;

  if (search) {
    filteredPokemons = filteredPokemons.filter(({ name }) =>
      name.includes(search)
    );
  }

  if (type) {
    filteredPokemons = await filterByType(filteredPokemons, type);
  }

  async function filterByType(pokemons, type) {
    const results = await Promise.all(
      pokemons.map(async (p) => {
        const resp = await fetch(p.url);
        const data = await resp.json();
        const hasType = data.types.some((t) => t.type.name === type);
        return hasType ? p : null;
      })
    );
    return results.filter(Boolean);
  }

  async function fetchImage(url) {
    const resp = await fetch(url);
    const d = await resp.json();
    return d.sprites.front_default;
  }

  async function getPokemonsWithImages(pokemons) {
    return Promise.all(
      pokemons.map(async (pokemon) => {
        const image = await fetchImage(pokemon.url);
        return {
          "i": pokemon.url.split("/").slice(-2, -1),
          "name": pokemon.name,
          "image": image,
        };
      })
    );
  }

  return getPokemonsWithImages(filteredPokemons);
}

export default function PokemonPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState("200");

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearch = localStorage.getItem("search") || "";
      const savedType = localStorage.getItem("type") || "";
      const savedLimit = localStorage.getItem("limit") || "200";

      setSearch(savedSearch);
      setType(savedType);
      setLimit(savedLimit);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("search", search);
      localStorage.setItem("type", type);
      localStorage.setItem("limit", limit);
    }
  }, [search, type, limit]);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemons({ search, type, limit })
      .then((result) => {
        setPokemons(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  }, [search, type, limit]);

  return (
    <section id="pokemons">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        limit={limit}
        onLimitChange={setLimit}
      />

      {isLoading && (
        <div id="loading">
          {" "}
          <div id="loading-bar"> Loading...</div>
        </div>
      )}

      <div id="list-area">
        <PokemonList pokemons={pokemons} />
      </div>
    </section>
  );
}
