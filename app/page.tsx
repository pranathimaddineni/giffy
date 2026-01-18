import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic import of client component (optional, for performance)
const Home = dynamic(() => import("./components/Home"), {
  ssr: false,
  loading: () => <p>Loading GIFs…</p>,
});

export default function Page() {
  return (
    <Suspense fallback={<p>Loading GIF Explorer…</p>}>
      <Home />
    </Suspense>
  );
}
