function PokemonList({ pokemons, selectFunction }) {
  return (
    <div>
      <div className="search-elements">
        <label>
          Search for Pokémon:
          <input type="text" id="search" onChange={filterPokemons} />
        </label>
      </div>
      <div id="list">
        {pokemons.map((pokemon, i) => (
          <Pokemon key={i} pokemon={pokemon} selectFunction={selectFunction} />
        ))}
      </div>
    </div>
  );
}

function Pokemon({ pokemon, selectFunction }) {
  const {i, name, image} = pokemon;
  return (
    <div className="pokemon" onClick={() => selectFunction(i)}>
      <p>
        {i}. {name}
      </p>
      <img src={image} alt={name} />
    </div>  
  );
}

window.PokemonList = PokemonList;
window.Pokemon = Pokemon;