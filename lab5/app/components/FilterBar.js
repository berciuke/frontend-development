"use client";
import React from "react";

export default function FilterBar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  limit,
  onLimitChange,
}) {
  return (
    <div className="search-elements">
      <input
        type="text"
        id="search"
        value={search}
        placeholder="Search for Pokémon"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <label>
        Type:
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="grass">Grass</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
      </label>
      <label>
        Limit:
        <input
          type="number"
          value={limit}
          onChange={(e) => onLimitChange(e.target.value)}
        />
      </label>
    </div>
  );
}
