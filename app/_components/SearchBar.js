"use client";

import { Search } from "@boxicons/react";
import { useState } from "react";

function SearchBar({ placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-steel rounded-xl">
      <Search className="text-slate" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}

export default SearchBar;
