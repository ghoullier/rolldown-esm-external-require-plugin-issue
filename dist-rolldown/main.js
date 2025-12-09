import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";

//#region src/main.js
createRoot(document.getElementById("root")).render(createElement(StrictMode, null, createElement("div", null, "Hello World!")));
console.log("Hello World!");

//#endregion