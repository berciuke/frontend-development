const root = ReactDOM.createRoot(document.getElementById("root"));

let search = "";
let selectedPokemonId;
let isLoading = true;
let pokemons = [];
let details = null;

function filterPokemons(event) {
  search = event.target.value;
  loadPokemons();
}

function selectPokemon(i) {
  selectedPokemonId = i;
  loadPokemons();
}

async function fetchImage(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.sprites.front_default;
}

async function fetchPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  const filteredPokemons = data.results.filter(({ name }) =>
    name.includes(search)
  );
  return getPokemonsWithImages(filteredPokemons);
}

async function fetchPokemonDetails(pokemonID) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to load Pokémon details: ", error);
  }
}

async function getPokemonsWithImages(pokemons) {
  return Promise.all(
    pokemons.map(async (pokemon, i) => {
      const image = await fetchImage(pokemon.url);
      return {
        i: i + 1,
        name: pokemon.name,
        image: image,
      };
    })
  );
}

async function loadPokemons() {
  isLoading = true;
  render();
  try {
    pokemons = await fetchPokemons();
    if (selectedPokemonId) {
      details = await fetchPokemonDetails(selectedPokemonId);
    }
  } catch (error) {
    console.log("Failed to load Pokemon list: ", error);
  } finally {
    isLoading = false;
    render();
  }
}

function render() {
  root.render(
    <section id="pokemons">
      {isLoading && <p id="loading-bar">Loading...</p>}
      <window.PokemonList pokemons={pokemons} selectFunction={selectPokemon} />
      <window.PokemonDetails pokemonDetails={details} />
    </section>
  );
}
loadPokemons();
