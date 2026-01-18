"use client";

import { useState } from "react";
import { Gif } from "../types/gif";

export default function GifCard({ gif }: { gif: Gif }) {
  const mp4Url = gif.images.original.mp4;
  const [copied, setCopied] = useState(false);
  const copyGif = async () => {
    try {
      await navigator.clipboard.writeText(mp4Url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
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
      {copied && (
        <>
          <span role="status" aria-live="polite" className="copy-status">
            Copied to clipboard
          </span>
          <div className="copy-alert" role="alert" aria-live="assertive">
            🎉 GIF copied! Paste it anywhere to share the fun.
          </div>
        </>
      )}
    </div>
  );
}
