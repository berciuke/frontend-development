import PokemonList from "../components/PokemonList";

async function fetchPokemons({search = "", type = "", limit = 200}) {
  let parameter = `?limit=${limit}`;
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + parameter
  );
  const data = await response.json();
  let filteredPokemons = data.results

  console.log(search);
  
  if (search) {
    filteredPokemons = filteredPokemons.filter(({name}) =>
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
    ).then((res) => res.filter((p) => p !== null));
    return results;
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
          i: pokemon.url.split("/").slice(-2, -1),
          name: pokemon.name,
          image: image,
        };
      })
    );
  }

  return getPokemonsWithImages(filteredPokemons);
}

export default async function PokemonPage({ searchParams }) {
  const search = searchParams.search || "";
  const type = searchParams.type || "";
  const limit = searchParams.limit || 200;

  const pokemons = await fetchPokemons({ search, type, limit });

  return (
    <section id="pokemons">
      <div id="list-area">
        <div>
          <PokemonList pokemons={pokemons} />
        </div>
      </div>
    </section>
  );
}
