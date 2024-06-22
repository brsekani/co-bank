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
import SignUpAndLogin from "./Pages/SignUpAndLogin";
import { AccountProvider } from "./Context/AccountContext";
import { Provider } from "react-redux";
import Store from "./App/Store";

function App() {
  return (
    <Provider store={Store}>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route path="SignUpAndLogin" element={<SignUpAndLogin />} />
            <Route path="/" element={<AppLayout />}>
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
                <Route path="notifications" element={<Notifications />} />
                <Route path="verification" element={<Verification />} />
              </Route>
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </Provider>
  );
}

export default App;
