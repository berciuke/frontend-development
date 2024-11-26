"use strict";
const createPokemonElement = (i, data) => {
  const div = document.createElement("div");
  div.className = "pokemon"
  div.textContent = `${i}. ${data.name}`;
  return div;
};
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => res.json())
  .then((res) => {
    let count = 0;
    const pokemons = res.results;
    const list = document.querySelector("#list");
    console.log(pokemons);
    pokemons.forEach((pokemon) => {
        fetch(pokemon.url)
        .then((res) => res.json())
        // .then((data) => ) 
            // image: data. sprites .front_default
      count++;
      list.appendChild(createPokemonElement(count, pokemon));
    });
  });
