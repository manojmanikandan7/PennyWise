import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
//import SignUp from "./pages/signup";
//import Login from "./pages/login";
import App from "./App";
import reportWebVitals from "./reportWebVitals.jsx";
//import serviceWorker from "./serviceWorker.js";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <>
    <ColorModeScript />
    <App />
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
