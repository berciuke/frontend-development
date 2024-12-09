function PokemonDetails({ pokemonDetails }) {
  if (!pokemonDetails) {
    return <div id="details-bar"></div>;
  }
  const { stats, types, height, weight } = pokemonDetails;
  const name = pokemonDetails["name"];
  const imageUrl = pokemonDetails["sprites"]["front_default"];
  return (
    <div id="details-bar">
      <div id="details-header">
        <img src={imageUrl} alt={name}></img>
        <h1>{name}</h1>
      </div>
      <div id="detailed-info">
        <div id="stats">
          {stats.map((val, i) => (
            <div key={i}>
              {val["stat"]["name"]}: {val["base_stat"]}
            </div>
          ))}
        </div>
        <div id="types">
          <p>types:</p>
          {types.map((val, i) => (
            <div key={i}>
              {i + 1}. {val["type"]["name"]}
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

window.PokemonDetails = PokemonDetails;
