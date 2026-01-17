"use client";

import { useState, useMemo } from "react";
import { debounce } from "../lib/debounce";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <label htmlFor="gif-search" className="visually-hidden">
        Search GIFs
      </label>
      <input
        id="gif-search"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search GIFs..."
        aria-label="Search GIFs"
      />
    </div>
  );
}
