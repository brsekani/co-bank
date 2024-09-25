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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Store from "./store/Store";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <Provider store={Store}>
      <AuthProvider>
        <AccountProvider>
          <BrowserRouter>
            <Routes>
              <Route path="SignUpAndLogin" element={<SignUpAndLogin />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route element={<ProtectedRoutes />}>
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
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition:Slide
            />
          </BrowserRouter>
        </AccountProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
