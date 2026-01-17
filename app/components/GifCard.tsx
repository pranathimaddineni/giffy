"use client";

import { Gif } from "../types/gif";

export default function GifCard({ gif }: { gif: Gif }) {
  const mp4Url = gif.images.original.mp4;

  const copyGif = async () => {
    try {
      await navigator.clipboard.writeText(mp4Url);
      alert("GIF URL copied!");
    } catch {
      alert("Failed to copy GIF URL.");
    }
  };

  return (
    <div className="gif-card">
      <video
        src={mp4Url}
        autoPlay
        loop
        muted
        playsInline
        className="gif-video"
        aria-label={gif.title || "GIF video"}
      />
      <button
        className="gif-copy-button"
        onClick={copyGif}
        aria-label={`Copy URL for ${gif.title}`}
      >
        Copy GIF URL
      </button>
    </div>
  );
}
