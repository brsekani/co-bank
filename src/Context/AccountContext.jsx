// AccountContext.jsx
import { createContext } from "react";
import {
  useAccountData,
  useCustomerData,
  useTransactions,
} from "../services/UserData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AccountContext = createContext();
const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const AccountProvider = ({ children }) => {
  // Account Data
  const { isLoadingAccountData, accountData, errorAccountData } =
    useAccountData();

  const { customerData, isLoadingCustomerData, errorCustomerData } =
    useCustomerData();

  const { isLoadingTransactions, transactionsData, errorTransactions } =
    useTransactions(accountData);

  return (
    <QueryClientProvider client={queryClient}>
      <AccountContext.Provider
        value={{
          accountData,
          isLoadingAccountData,
          errorAccountData,
          customerData,
          isLoadingCustomerData,
          errorCustomerData,
          transactionsData,
          isLoadingTransactions,
          errorTransactions,
        }}
      >
        {children}
      </AccountContext.Provider>
    </QueryClientProvider>
  );
};

export { AccountProvider, AccountContext };
