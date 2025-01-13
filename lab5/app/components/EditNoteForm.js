import React, { useState } from "react";

export default function EditNoteForm({ note, onNoteUpdated }) {
  const [tacticName, setTacticName] = useState(note.tacticName);
  const [strategy, setStrategy] = useState(note.strategy);
  const [effectiveness, setEffectiveness] = useState(note.effectiveness);
  const [conditions, setConditions] = useState(note.conditions);
  const [trainingDate, setTrainingDate] = useState(note.trainingDate);
  const [opponents, setOpponents] = useState(note.opponents);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!tacticName || tacticName.length < 5) {
      newErrors.tacticName = "Nazwa taktyki musi mieć co najmniej 5 znaków";
    }
    if (tacticName.length > 50) {
      newErrors.tacticName = "Nazwa taktyki może mieć maksymalnie 50 znaków";
    }
    if (!strategy || strategy.length < 10) {
      newErrors.strategy = "Opis strategii musi mieć co najmniej 10 znaków";
    }
    if (!effectiveness || effectiveness < 1 || effectiveness > 5) {
      newErrors.effectiveness = "Skuteczność musi być w zakresie od 1 do 5";
    }
    if (!conditions || conditions.length < 10) {
      newErrors.conditions = "Warunki użycia muszą mieć co najmniej 10 znaków";
    }
    if (!trainingDate) {
      newErrors.trainingDate = "Data treningu jest wymagana";
    }
    if (!opponents || opponents.length === 0) {
      newErrors.opponents = "Wybierz przynajmniej jednego przeciwnika";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedNote = {
      ...note,
      tacticName,
      strategy,
      effectiveness: Number(effectiveness),
      conditions,
      trainingDate,
      opponents,
      updatedAt: new Date().toISOString(),
    };

    onNoteUpdated(updatedNote);
  };

  const handleOpponentChange = (value) => {
    if (opponents.includes(value)) {
      setOpponents(opponents.filter((op) => op !== value));
    } else {
      setOpponents([...opponents, value]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="bold">Nazwa taktyki</label>
        <input
          type="text"
          value={tacticName}
          onChange={(e) => setTacticName(e.target.value)}
        />
        {errors.tacticName && <div className="error">{errors.tacticName}</div>}
      </div>

      <div>
        <label className="bold">Opis strategii</label>
        <textarea
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        />
        {errors.strategy && <div className="error">{errors.strategy}</div>}
      </div>

      <div>
        <label className="bold">Skuteczność (1-5)</label>
        <select
          value={effectiveness}
          onChange={(e) => setEffectiveness(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.effectiveness && <div className="error">{errors.effectiveness}</div>}
      </div>

      <div>
        <label className="bold">Warunki użycia</label>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
        />
        {errors.conditions && <div className="error">{errors.conditions}</div>}
      </div>

      <div>
        <label className="bold">Data treningu</label>
        <input
          type="date"
          value={trainingDate}
          onChange={(e) => setTrainingDate(e.target.value)}
        />
        {errors.trainingDate && (
          <div className="error">{errors.trainingDate}</div>
        )}
      </div>

      <div>
        <label className="bold">Przeciwnicy</label>
        <div className="form-types">
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("fire")}
              onChange={() => handleOpponentChange("fire")}
            />
            Fire
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("water")}
              onChange={() => handleOpponentChange("water")}
            />
            Water
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("electric")}
              onChange={() => handleOpponentChange("electric")}
            />
            Electric
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("normal")}
              onChange={() => handleOpponentChange("normal")}
            />
            Normal
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("fighting")}
              onChange={() => handleOpponentChange("fighting")}
            />
            Fighting
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("flying")}
              onChange={() => handleOpponentChange("flying")}
            />
            Flying
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("poison")}
              onChange={() => handleOpponentChange("poison")}
            />
            Poison
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("ground")}
              onChange={() => handleOpponentChange("ground")}
            />
            Ground
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("rock")}
              onChange={() => handleOpponentChange("rock")}
            />
            Rock
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("bug")}
              onChange={() => handleOpponentChange("bug")}
            />
            Bug
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("ghost")}
              onChange={() => handleOpponentChange("ghost")}
            />
            Ghost
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("steel")}
              onChange={() => handleOpponentChange("steel")}
            />
            Steel
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("grass")}
              onChange={() => handleOpponentChange("grass")}
            />
            Grass
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("psychic")}
              onChange={() => handleOpponentChange("psychic")}
            />
            Psychic
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("ice")}
              onChange={() => handleOpponentChange("ice")}
            />
            Ice
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("dragon")}
              onChange={() => handleOpponentChange("dragon")}
            />
            Dragon
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("dark")}
              onChange={() => handleOpponentChange("dark")}
            />
            Dark
          </label>
          <label>
            <input
              type="checkbox"
              checked={opponents.includes("fairy")}
              onChange={() => handleOpponentChange("fairy")}
            />
            Fairy
          </label>
        </div>
        {errors.opponents && <div className="error">{errors.opponents}</div>}
      </div>

      <button type="submit">Zapisz zmiany</button>
    </form>
  );
}
