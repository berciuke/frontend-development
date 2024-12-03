"use strict";
import React from 'react';
import ReactDOM from 'react-dom/client';
ReactDOM.createRoot(document.getElementById("root"))
function showLoadingBar() {
  document.getElementById("loading-bar").classList.remove("hidden");
}

function hideLoadingBar() {
  document.getElementById("loading-bar").className = "hidden";
}
function createPokemonElement(i, data, imageSource) {
  const div = document.createElement("div");
  div.className = "pokemon";
  div.id = `pokemon-${i}`;
  div.textContent = `${i}. ${data.name}`;
  div.onclick = () => createDetailsElements(i);
  const imageElement = document.createElement("img");
  imageElement.src = imageSource;
  div.appendChild(imageElement);
  return div;
}

async function createDetailsElements(pokemonID) {
  const root = document.getElementById("details-bar");
  while (root.firstElementChild) {
    root.removeChild(root.firstElementChild);
  }
  showLoadingBar()
  try {
    const details = await fetchDetails(pokemonID);
    const divMain = document.createElement("div");
    divMain.id = "pokemon-details";
    const createDetailElement = (id, text) => {
      const element = document.createElement("div");
      element.id = id;
      element.innerHTML = text;
      return element;
    };
    divMain.appendChild(createDetailElement("stats", details[0]));
    divMain.appendChild(createDetailElement("types", details[1]));
    divMain.appendChild(createDetailElement("height-and-weight", details[2]));
    const pokemonBasicInfoElement = document
      .getElementById(`pokemon-${pokemonID}`)
      .cloneNode(true);
    pokemonBasicInfoElement.id = `pokemon-${pokemonID}-copy`;
    root.appendChild(pokemonBasicInfoElement);
    root.appendChild(divMain);
  } catch (error) {
    console.error(error);
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Sorry, failed to load Pokémon details...";
    root.appendChild(errorMsg);
  } finally {
    hideLoadingBar()
  }
}

async function fetchDetails(pokemonID) {
  let types, stats, heightAndWeight;
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        stats = data.stats.reduce((acc, val) => {
          return acc + `${val["stat"]["name"]}: ${val["base_stat"]}<br>`;
        }, "");
        types = data.types.reduce(
          (acc, val) => acc + `${val["slot"]}. ${val["type"]["name"]}<br>`,
          "types:<br>"
        );
        heightAndWeight = `height: ${data.weight}<br>weight: ${data.height}`;
      });
    return [stats, types, heightAndWeight];
  } catch (error) {
    return ["Sorry, failed to load Pokémon details...", "", ""];
  }
}

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => res.json())
  .then((res) => {
    showLoadingBar();
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
        });
    });
  })
  .catch((error) => {
    console.log(error);
    const errorMsg = document.createElement("h2");
    errorMsg.textContent = "Sorry, failed to load Pokémon list...";
    document.getElementById("pokemons").appendChild(errorMsg);
  })
  .finally(() => {
    hideLoadingBar();
  });
