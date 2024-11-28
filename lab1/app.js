"use strict";
const createPokemonElement = (i, data, imageSource) => {
  const div = document.createElement("div");
  div.className = "pokemon";
  div.textContent = `${i}. ${data.name}`;
  const imageElement = document.createElement("img");
  imageElement.src = imageSource
  div.appendChild(imageElement);
  return div;
};
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => res.json())
  .then((res) => {
    let count = 0;
    const pokemons = res.results;
    const list = document.getElementById("list");
    console.log(pokemons);
    pokemons.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          const image = data.sprites.front_default;
          count++;
          list.appendChild(createPokemonElement(count, pokemon, image));
        });
    });
  });
