import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="p-4 bg-red-100 text-red-800">
          <h2 className="font-bold mb-2">Something went wrong:</h2>
          <pre className="whitespace-pre-wrap">{error.message}</pre>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
