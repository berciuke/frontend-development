"use client";
import React, { useState, useEffect } from "react";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";

function PokemonNotesSection({ pokemonId }) {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("trainingNotes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const pokemonNotes = notes
    .filter((note) => note.pokemonId === pokemonId)
    .sort((a, b) => new Date(b.trainingDate) - new Date(a.trainingDate));

  const handleNoteAdded = (newNote) => {
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("trainingNotes", JSON.stringify(updated));
    setEditNoteId(null);
  };

  const handleRemoveNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("trainingNotes", JSON.stringify(updated));
  };

  const handleNoteUpdated = (updatedNote) => {
    const updated = notes.map((n) =>
      n.id === updatedNote.id ? updatedNote : n
    );
    setNotes(updated);
    localStorage.setItem("trainingNotes", JSON.stringify(updated));
    setEditNoteId(null);
  };

return (
    <div>
        {editNoteId === "new" && (
            <AddNoteForm pokemonId={pokemonId} onNoteAdded={handleNoteAdded} />
        )}

        {pokemonNotes.length === 0 && (
            <p>Brak notatek</p>
        )}

        {pokemonNotes.length > 0 && (
            <ul className="notes-list">
                {pokemonNotes.map((note) => (
                    <li key={note.id} className="note">
                        <div>
                            <strong>{note.tacticName}</strong> | {note.trainingDate}
                            <button onClick={() => setEditNoteId(note.id)}>Edytuj</button>
                            <button onClick={() => handleRemoveNote(note.id)}>Usuń</button>
                        </div>
                        <div>Skuteczność: {note.effectiveness}</div>
                        <div>Strategia: {note.strategy}</div>
                        <div>Warunki: {note.conditions}</div>
                        <div>Przeciwnicy: {note.opponents.join(", ")}</div>
                        {editNoteId === note.id && (
                            <EditNoteForm note={note} onNoteUpdated={handleNoteUpdated} />
                        )}
                    </li>
                ))}
            </ul>
        )}

        <button onClick={() => setEditNoteId("new")}>
            Nowa notatka treningowa
        </button>
    </div>
);
}

export default PokemonNotesSection;
