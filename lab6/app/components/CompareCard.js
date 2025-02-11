"use client";
import React from "react";

export default function CompareCard({ data }) {
    if (!data) {
      return <div className="card empty">Empty slot</div>;
    }
  
    const { name, details } = data;
    const { id, sprites, stats, abilities, weight, height } = details || {};
    const frontImg = sprites?.front_default;
  
    return (
      <div className="card">
        <h4>{id}. {name}</h4>
        {frontImg && <img src={frontImg} alt={name} />}
        
        <div className="info">
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
        </div>
  
        <div className="abilities">
          <strong>Abilities:</strong>
          {abilities?.map((a, idx) => (
            <p key={idx}>{a.ability.name}</p>
          ))}
        </div>
  
        <div className="stats">
          <strong>Stats:</strong>
          {stats?.map((s, idx) => (
            <p key={idx}>
              {s.stat.name}: {s.base_stat}
            </p>
          ))}
        </div>
      </div>
    );
  }