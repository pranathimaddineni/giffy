"use client";

import { Gif } from "../types/gif";
import GifCard from "./GifCard";

export default function GifGrid({ gifs }: { gifs: Gif[] }) {
  return (
    <div className="gif-grid" role="list">
      {gifs?.map((gif, index) => (
        <div key={index} role="listitem">
          <GifCard gif={gif} />
        </div>
      ))}
    </div>
  );
}
