"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchGifs, randomGifs } from "./lib/giphy";
import SearchBar from "./components/SearchBar";
import GifGrid from "./components/GifGrid";
import { Gif } from "./types/gif";


export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = query
          ? await searchGifs(query)
          : await randomGifs();
        setGifs(data.data);
        //localStorage.setItem("lastResults", JSON.stringify(data.data));
      } catch {
        setError("API limit reached. Showing previous results.");
        const cached = localStorage.getItem("lastResults");
        if (cached) setGifs(JSON.parse(cached));
      }
    }
    load();
  }, [query]);

  const onSearch = (q: string) => {
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  return (
    <main>
      <h1>🎬 Giffy</h1>
      <SearchBar onSearch={onSearch} />
      {error && <p className="error">{error}</p>}
      <GifGrid gifs={gifs} />
    </main>
  );
}
