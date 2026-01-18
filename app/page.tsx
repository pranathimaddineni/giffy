"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { searchGifs, trendingGifs } from "./lib/giphy";
import SearchBar from "./components/SearchBar";
import { Gif } from "./types/gif";
import NoResults from "./components/NoResults";

const PAGE_SIZE = 12;

const GifGrid = dynamic(() => import("./components/GifGrid"), {
  ssr: false,
  loading: () => <p>Loading GIFs…</p>,
});

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGifs = useCallback(
    async (reset = true) => {
      try {
        setLoading(true);
        const currentOffset = reset ? 0 : offset;

        if (!query) {
          const response = await trendingGifs();
          setGifs(response.data as Gif[]);
          setHasMore(false);
          setOffset(0);
          setError("");
          return;
        }

        const response = await searchGifs(query, currentOffset, PAGE_SIZE);
        const newGifs = response.data as Gif[];

        setGifs((prev) => (reset ? newGifs : [...prev, ...newGifs]));
        setOffset(currentOffset + PAGE_SIZE);
        setHasMore(newGifs.length === PAGE_SIZE);
        setError("");

        const cached = reset ? newGifs : [...gifs, ...newGifs];
        localStorage.setItem("lastResults", JSON.stringify(cached));
      } catch {
        setError("GIF limit reached. Hang tight and try again shortly!");
        const cached = localStorage.getItem("lastResults");
        if (cached) {
          setGifs(JSON.parse(cached) as Gif[]);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [query, offset, gifs]
  );

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    loadGifs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {gifs.length === 0 && !loading && query && <NoResults query={query} />}

        {hasMore && gifs.length > 0 && query && (
          <button
            onClick={() => loadGifs(false)}
            disabled={loading}
            aria-busy={loading}
            className="load-more-button"
          >
            {loading ? "Loading more GIFs…" : "Load more GIFs"}
          </button>
        )}
      </main>
    </>
  );
}
