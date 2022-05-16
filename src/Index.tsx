import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./spy";

const mount = window.document.createElement("div");
window.document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<App />);

