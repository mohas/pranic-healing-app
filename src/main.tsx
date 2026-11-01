import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./shared/dayjs-setup";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
