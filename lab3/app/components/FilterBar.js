"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    router.replace(`/pokemon?${params.toString()}`);
  }, [search]);

  return (
    <div className="search-elements">
      <input
        type="text"
        id="search"
        value={search}
        placeholder="Search for Pokémon"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
