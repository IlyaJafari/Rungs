"use client";

import { Search } from "@boxicons/react";
import { useState } from "react";

function SearchBar({ placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-steel rounded-xl cursor-pointer">
      <Search className="text-slate shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="hidden md:block w-full bg-transparent outline-none"
      />
    </div>
  );
}

export default SearchBar;
