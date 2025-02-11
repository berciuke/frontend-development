"use client";
import React, { useReducer, useEffect, useContext, useState } from "react";
import { StatsContext } from "../context/StatsContext";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RxDoubleArrowRight } from "react-icons/rx";

const initialState = {
  data: [],
  stats: {
    favoritesCount: 0,
    mostFrequentType: "",
    averageRating: 0,
    topThreePokemons: [],
    typeDistribution: {},
    activityHistory: [],
  },
};

const statsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "CALCULATE_STATS": {
      const data = state.data;
      const favoritesCount = data.filter((item) => item.favorite).length;
      const typeCount = {};
      data.forEach((item) => {
        if (item.type) {
          typeCount[item.type] = (typeCount[item.type] || 0) + 1;
        }
      });
      let mostFrequentType = "";
      let maxCount = 0;
      for (const type in typeCount) {
        if (typeCount[type] > maxCount) {
          maxCount = typeCount[type];
          mostFrequentType = type;
        }
      }
      const ratings = data
        .map((item) => item.rating)
        .filter((r) => typeof r === "number");
      const averageRating = ratings.length
        ? ratings.reduce((acc, val) => acc + val, 0) / ratings.length
        : 0;

        const topThreePokemons = [...data]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      const typeDistribution = typeCount;

      const activityHistory = [...data].sort(
        (a, b) => new Date(b.activityDate) - new Date(a.activityDate)
      );

      return {
        ...state,
        stats: {
          favoritesCount,
          mostFrequentType,
          averageRating,
          topThreePokemons,
          typeDistribution,
          activityHistory,
        },
      };
    }
    case "SORT_DATA": {
      const sortBy = action.payload.sortBy;
      const sortedData = [...state.data];
      if (sortBy === "name") {
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "date") {
        sortedData.sort(
          (a, b) => new Date(b.activityDate) - new Date(a.activityDate)
        );
      }
      return { ...state, data: sortedData };
    }
    case "FILTER_DATA": {
      const filterType = action.payload.type;
      const filteredData = state.data.filter(
        (item) => item.type === filterType
      );
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};

const StatsPanel = () => {
  const { numberFormat, sortBy, viewType, updatePreferences } =
    useContext(StatsContext);
  const [state, dispatch] = useReducer(statsReducer, initialState);
  const [formattedAverageRating, setFormattedAverageRating] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewTypeText, setViewTypeText] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("statsData");
    if (storedData) {
      const data = JSON.parse(storedData);
      dispatch({ type: "LOAD_DATA", payload: data });
    } else {
      const simulatedData = [
        {
          id: 1,
          name: "Pikachu",
          type: "electric",
          rating: 4,
          favorite: true,
          activityDate: "2025-02-01",
        },
        {
          id: 2,
          name: "Charmander",
          type: "fire",
          rating: 3,
          favorite: false,
          activityDate: "2025-02-03",
        },
        {
          id: 3,
          name: "Bulbasaur",
          type: "grass",
          rating: 5,
          favorite: true,
          activityDate: "2025-02-02",
        },
        {
          id: 4,
          name: "Squirtle",
          type: "water",
          rating: 4,
          favorite: false,
          activityDate: "2025-02-04",
        },
        {
          id: 5,
          name: "Eevee",
          type: "normal",
          rating: 5,
          favorite: true,
          activityDate: "2025-02-05",
        },
      ];
      localStorage.setItem("statsData", JSON.stringify(simulatedData));
      dispatch({ type: "LOAD_DATA", payload: simulatedData });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "CALCULATE_STATS" });
  }, [state.data]);

  useEffect(() => {
    if (state.stats.averageRating !== null) {
      setFormattedAverageRating(formatRating(state.stats.averageRating));
    }
  }, [state.stats.averageRating, numberFormat]);

  useEffect(() => {
    setViewTypeText(viewType === "table" ? "Tabela" : "Karty");
  }, [viewType]);

  useEffect(() => {
    if (viewType === "table") {
      setShowTable(true);
      setShowCards(false);
    } else {
      setShowTable(false);
      setShowCards(true);
    }
  }, [viewType]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "statsData") {
        const newData = JSON.parse(event.newValue);
        dispatch({ type: "LOAD_DATA", payload: newData });
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleChangeNumberFormat = (e) => {
    updatePreferences({ numberFormat: e.target.value });
  };

  const handleChangeSortBy = (e) => {
    updatePreferences({ sortBy: e.target.value });
    dispatch({ type: "SORT_DATA", payload: { sortBy: e.target.value } });
  };

  const handleChangeViewType = (e) => {
    updatePreferences({ viewType: e.target.value });
  };

  const formatRating = (rating) => {
    if (numberFormat === "percentage") {
      return `${(rating * 20).toFixed(0)}%`;
    } else if (numberFormat === "decimal") {
      return rating.toFixed(2);
    } else if (numberFormat === "rounded") {
      return Math.round(rating);
    } else {
      return rating;
    }
  };

  return (
    <>
      {!isPanelVisible ? (
        <button
          onClick={togglePanel}
          style={{
            position: "fixed",
            top: "8rem",
            left: "1rem",
            backgroundColor: "#5a5548",
            color: "#b2afa9",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Stats <RxDoubleArrowRight />
        </button>
      ) : (
        <div
          className="stats-panel"
          style={{
            border: "2px solid #5a5548",
            padding: "1rem",
            borderRadius: "10px",
            backgroundColor: "#24221f",
            color: "#b2afa9",
            margin: "1rem",
            position: "relative",
          }}
        >
          <button
            onClick={togglePanel}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              backgroundColor: "transparent",
              color: "#b2afa9",
              border: "none",
              cursor: "pointer",
            }}
          >
            <IoMdClose />
          </button>
          <h2>Panel Statystyk</h2>

          <div style={{ marginBottom: "1rem" }}>
            <h3>Preferencje wyświetlania</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <label>
                  Format liczb:
                  <select
                    value={numberFormat}
                    onChange={handleChangeNumberFormat}
                  >
                    <option value="percentage">Procenty</option>
                    <option value="decimal">Decimal</option>
                    <option value="rounded">Zaokrąglone</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Sortowanie:
                  <select value={sortBy} onChange={handleChangeSortBy}>
                    <option value="date">Data</option>
                    <option value="name">Nazwa</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Widok:
                  <select value={viewType} onChange={handleChangeViewType}>
                    <option value="table">Tabela</option>
                    <option value="cards">Karty</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h3>Podstawowe statystyki</h3>
            <p>
              <strong>Liczba ulubionych:</strong> {state.stats.favoritesCount}
            </p>
            <p>
              <strong>Najczęstszy typ:</strong> {state.stats.mostFrequentType}
            </p>
            <p>
              <strong>Średnia ocena:</strong>{" "}
              {formattedAverageRating !== null
                ? formattedAverageRating
                : "Loading..."}
            </p>
          </div>

          <section>
            <h3>
              Szczegółowe statystyki
              <button onClick={toggleDetails}>
                {showDetails ? <MdExpandLess /> : <MdExpandMore />}
              </button>
            </h3>
            {showDetails && (
              <>
                <div>
                  <strong>Top 3 Pokemony:</strong>
                  <ul>
                    {state.stats.topThreePokemons.map((pokemon) => (
                      <li key={pokemon.id}>
                        {pokemon.name} – Ocena: {pokemon.rating}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Rozkład typów:</strong>
                  <ul>
                    {Object.entries(state.stats.typeDistribution).map(
                      ([type, count]) => (
                        <li key={type}>
                          {type}: {count}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <strong>Historia aktywności:</strong>
                  <ul>
                    {state.stats.activityHistory.map((item) => (
                      <li key={item.id}>
                        {item.name} – {item.activityDate}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </section>

          <div>
            <h3>
              Prezentacja danych ({viewTypeText ? viewTypeText : "Loading..."})
            </h3>
            <div style={{ display: showTable ? "block" : "none" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "1rem",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{ border: "1px solid #5a5548", padding: "0.5rem" }}
                    >
                      ID
                    </th>
                    <th
                      style={{ border: "1px solid #5a5548", padding: "0.5rem" }}
                    >
                      Nazwa
                    </th>
                    <th
                      style={{ border: "1px solid #5a5548", padding: "0.5rem" }}
                    >
                      Typ
                    </th>
                    <th
                      style={{ border: "1px solid #5a5548", padding: "0.5rem" }}
                    >
                      Ocena
                    </th>
                    <th
                      style={{ border: "1px solid #5a5548", padding: "0.5rem" }}
                    >
                      Data aktywności
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.map((item) => (
                    <tr key={item.id}>
                      <td
                        style={{
                          border: "1px solid #5a5548",
                          padding: "0.5rem",
                        }}
                      >
                        {item.id}
                      </td>
                      <td
                        style={{
                          border: "1px solid #5a5548",
                          padding: "0.5rem",
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          border: "1px solid #5a5548",
                          padding: "0.5rem",
                        }}
                      >
                        {item.type}
                      </td>
                      <td
                        style={{
                          border: "1px solid #5a5548",
                          padding: "0.5rem",
                        }}
                      >
                        {item.rating}
                      </td>
                      <td
                        style={{
                          border: "1px solid #5a5548",
                          padding: "0.5rem",
                        }}
                      >
                        {item.activityDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-container">
              {state.data.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #5a5548",
                    borderRadius: "10px",
                    padding: "1rem",
                    width: "150px",
                    backgroundColor: "#191917",
                  }}
                >
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>Typ: {item.type}</p>
                  <p>Ocena: {item.rating}</p>
                  <p>Data: {item.activityDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsPanel;
