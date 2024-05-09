import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css"; // Corrected import statement for CSS file
import Store from "./App/Store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
