import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./spy";

const mount = window.document.createElement("div");
window.document.body.appendChild(mount);
ReactDOM.render(<App />, mount)