// AccountContext.jsx
import { createContext } from "react";
import {
  useAccountData,
  useUserData,
  useTransactions,
  useGoals,
} from "../services/UserData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AccountContext = createContext();
const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const AccountProvider = ({ children }) => {
  // Get user_id and account_id from localStorage
  const user_id = localStorage.getItem("CoBankuser_id");
  const account_id = localStorage.getItem("CoBank_account_id");

  // Account Data
  const { isLoadingAccountData, accountData, errorAccountData } =
    useAccountData(account_id);

  const { userData, isLoadingUserData, errorUserData } = useUserData(user_id);

  const { isLoadingTransactions, transactionsData, errorTransactions } =
    useTransactions(account_id);

  const { isLoadingGoals, goalsData, errorGoals } = useGoals(account_id);

  return (
    <QueryClientProvider client={queryClient}>
      <AccountContext.Provider
        value={{
          accountData,
          isLoadingAccountData,
          errorAccountData,
          userData,
          isLoadingUserData,
          errorUserData,
          transactionsData,
          isLoadingTransactions,
          errorTransactions,
          isLoadingGoals,
          goalsData,
          errorGoals,
        }}
      >
        {children}
      </AccountContext.Provider>
    </QueryClientProvider>
  );
};

export { AccountProvider, AccountContext };
