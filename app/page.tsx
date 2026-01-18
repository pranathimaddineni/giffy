import { Suspense } from "react";
import Home from "./components/Home";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading GIF Explorer…</p>}>
      <Home />
    </Suspense>
  );
}
