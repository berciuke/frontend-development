import FilterBar from "../components/FilterBar";

export default function PokemonLayout({ children }) {
  return (
    <div>
      <FilterBar />
      {children}
    </div>
  );
}
