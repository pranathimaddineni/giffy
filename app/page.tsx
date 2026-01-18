import { Suspense } from "react";
import Home from "./Home";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading GIF Explorer…</p>}>
      <Home />
    </Suspense>
  );
}
