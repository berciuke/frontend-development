import Link from "next/link";

async function getBreadcrumbs(id) {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!resp.ok) {
    return `pokemon » pokemon#${id}`;
  }
  const pokemon = await resp.json();
  return `pokemon » ${pokemon.name}`;
}

export default async function PokemonDetailsLayout({ children, params }) {
  const { id } = params;
  const pokemonId = parseInt(id, 10);
  const breadcrums = await getBreadcrumbs(id);
  return (
    <div id="details-content">
      <div id="breadcrumbs">{breadcrums}</div>
      <nav>
        <button>
          <Link href={`/pokemon/${pokemonId - 1}`}>Previous</Link>
        </button>
        <button>
          <Link href={`/pokemon/${pokemonId + 1}`}>Next</Link>
        </button>
      </nav>
      {children}
    </div>
  );
}
