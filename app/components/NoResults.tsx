"use client";

export default function NoResults({ query }: { query: string }) {
  return (
    <section role="status" aria-live="polite" className="no-results">
      <div className="no-results-icon" aria-hidden="true">
        🎭
      </div>

      <h2>No GIFs found</h2>

      <p>
        We couldn’t find any GIFs for <strong>“{query}”</strong>.
      </p>

      <p className="no-results-hint">Try a different keyword</p>
    </section>
  );
}
