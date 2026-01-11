import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { enableIosAppMode } from "./site/iosAppMode";

enableIosAppMode();
window.addEventListener("resize", enableIosAppMode);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);