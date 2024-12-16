import PokemonDetails from '../../components/PokemonDetails';

async function fetchPokemonDetails(pokemonID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    return response.json();
  }
  
  export default async function PokemonDetailsPage({ params, searchParams }) {
    const { id } = params;
    const view = searchParams.view || "";
    const details = await fetchPokemonDetails(id);
  
    return (
      <div>
        <div id="details">
          <PokemonDetails pokemonDetails={details} view={view} />
        </div>
      </div>
    );
  }
