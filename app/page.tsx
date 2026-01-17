"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchGifs, trendingGifs } from "./lib/giphy";
import SearchBar from "./components/SearchBar";
import GifGrid from "./components/GifGrid";
import { Gif } from "./types/gif";
import NoResults from "./components/NoResults";

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = query ? await searchGifs(query) : await trendingGifs();
        setGifs(data.data);
        localStorage.setItem("lastResults", JSON.stringify(data.data));
        setError("");
      } catch {
        setError("API limit reached. Showing previous results.");
        const cached = localStorage.getItem("lastResults");
        if (cached) setGifs(JSON.parse(cached) as Gif[]);
      }
    }
    load();
  }, [query]);

  const onSearch = (q: string) => {
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  return (
    <>
      <header className="app-header">
        <div className="app-title">
          <h1>GIF Explorer</h1>
        </div>

        <div className="search-toolbar">
          <SearchBar onSearch={onSearch} />
        </div>
      </header>
      <main>
        {error && <p role="alert">{error}</p>}
        <GifGrid gifs={gifs} />
        {gifs.length === 0 && !error && query && <NoResults query={query} />}
      </main>
    </>
  );
}
