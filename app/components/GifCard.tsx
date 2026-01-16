"use client";

import { Gif } from "../types/gif";

export default function GifCard({ gif }: { gif: Gif }) {

  const mp4Url = gif.images.original.mp4;

  const copyGif = async () => {
    await navigator.clipboard.writeText(mp4Url);
    alert("GIF URL copied!");
  };

  return (
    <div className="card">
      <video src={mp4Url} autoPlay loop muted playsInline aria-label={gif?.title || "GIF video"}
      />
      <button
        onClick={copyGif}
        aria-label={`Copy URL for ${gif.title}`}
      >Copy GIF URL</button>
    </div>
  );
}
