"use strict";
async function createDetails(pokemonID) {
  const root = document.getElementById("details-bar");
  if (root.childElementCount > 0) {
    root.removeChild(document.getElementById("pokemon-details"));
  }
  const div = document.createElement("div");
  div.textContent = await fetchDetails(pokemonID);
  div.id = "pokemon-details"
  root.appendChild(div);
};
const createPokemonElement = (i, data, imageSource) => {
  const div = document.createElement("div");
  div.className = "pokemon";
  div.id = `pokemon$i`;
  div.textContent = `${i}. ${data.name}`;
  div.onclick = () => createDetails(i);
  const imageElement = document.createElement("img");
  imageElement.src = imageSource;
  div.appendChild(imageElement);
  return div;
};

async function fetchDetails(pokemonID) {
  let stats;
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then((res) => res.json())
    .then((data) => {
      stats = data.stats.reduce((acc, val) => {
        return acc + `${val["stat"]["name"]}: ${val["base_stat"]}\n`;
      }, "");
      // return {
      //   "types": data.types,

      // }
    });
    return stats;
  }
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => res.json())
  .then((res) => {
    let count = 0;
    const pokemons = res.results;
    const list = document.getElementById("list");
    pokemons.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          const image = data.sprites.front_default;
          count++;
          list.appendChild(createPokemonElement(count, pokemon, image));
          // console.log(fetchDetails(data.id));
        });
    });
  });
