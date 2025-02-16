import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  //TODO: re enable strict mode for deployment
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
