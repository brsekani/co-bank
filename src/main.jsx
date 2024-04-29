import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import App from "./App.jsx";
import "./index.css"; // Corrected import statement for CSS file
import Store from "./App/Store.js";
import { AccountProvider } from "./Context/AccountContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <AccountProvider>
          <App />
        </AccountProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
