import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./Pages/Dashboard";
import Cards from "./Pages/Cards";
import Invoice from "./Pages/Invoice";
import Goals from "./Pages/Goals";
import Account from "./Pages/Account";
import Support from "./Pages/Support";
import Profile from "./Pages/Profile";
import Security from "./Pages/Security";
import TransactionsTable from "./UI/TransactionsTable";
import Notifications from "./Pages/Notifications";
import Verification from "./Pages/Verification";

import { AccountProvider } from "./Context/AccountContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Store from "./App/Store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <AccountProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cards" element={<Cards />} />
                <Route path="transactions" element={<TransactionsTable />} />
                <Route path="invoice" element={<Invoice />} />
                <Route path="goals" element={<Goals />} />
                <Route path="account" element={<Account />}>
                  <Route index element={<Profile />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="security" element={<Security />} />
                  <Route path="Notifications" element={<Notifications />} />
                  <Route path="Verification" element={<Verification />} />
                </Route>
                <Route path="support" element={<Support />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AccountProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
