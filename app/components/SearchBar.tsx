"use client";

import { debounce } from "../lib/debounce";
import { useMemo } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
    const debouncedSearch = useMemo(
        () =>
          debounce((value: string) => {
            console.log("Searching for:", value); 
            onSearch(value);
          }, 400),
        [onSearch]
      );

  return (
    <input
      placeholder="Search GIFs..."
      onChange={(e) => debouncedSearch(e.target.value)}
      className="search"
    />
  );
}
