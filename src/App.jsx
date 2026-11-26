import { lazy, Suspense } from "react";
import AppRouter from "./app/AppRouter";

const FacebookPixel = import.meta.env.PROD
  ? lazy(() => import("./components/FacebookPixel").catch(() => ({ default: () => null })))
  : null;

export default function App() {
  return (
    <>
      {FacebookPixel && (
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
      )}
      <AppRouter />
    </>
  );
}
