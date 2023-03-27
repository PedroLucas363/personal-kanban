import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // I had to comment the strictMode because it mess with the react beautiful dnd in this version of React
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
