"use client";

import { Gif } from "../types/gif";
import GifCard from "./GifCard";

export default function GifGrid({ gifs }: { gifs: Gif[] }) {
  return (
    <div className="grid" role="list">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
}
