import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css"; // Corrected import statement for CSS file
import Store from "./App/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
