"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [limit, setLimit] = useState(searchParams.get('limit') || '200');
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    if (type) params.set('type', type);
    if (limit) params.set('limit', limit);
    router.replace(`/pokemon?${params.toString()}`);
  }, [search, type, limit]);

  return (
    <div className="search-elements">
      <input
        type="text"
        id="search"
        value={search}
        placeholder="Search for Pokémon"
        onChange={(e) => setSearch(e.target.value)}
      />
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
        </select>
      </label>
      <label>
        Limit:
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </label>
    </div>
  );
}
