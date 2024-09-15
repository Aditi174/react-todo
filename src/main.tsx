import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToDosProvider } from "./store/todo.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToDosProvider>
        <App />
      </ToDosProvider>
    </BrowserRouter>
  </StrictMode>
);
