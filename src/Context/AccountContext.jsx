// AccountContext.jsx
import { createContext } from "react";
import {
  useAccountData,
  useCustomerData,
  useTransactions,
} from "../services/useUserData";
import { QueryClient, QueryClientProvider } from "react-query";

const AccountContext = createContext();
const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const AccountProvider = ({ children }) => {
  // Account Data
  const {
    data: accountData,
    isLoading: isLoadingAD,
    isError: isErrorAD,
  } = useAccountData();

  const {
    data: customerData,
    isLoading: isLoadingCD,
    isError: isErrorCd,
  } = useCustomerData();

  const {
    data: transactionsData,
    isLoading: isLoadingTD,
    isError: isErrorTD,
  } = useTransactions(accountData);

  return (
    <QueryClientProvider client={queryClient}>
      <AccountContext.Provider
        value={{
          accountData,
          isLoadingAD,
          isErrorAD,
          customerData,
          isLoadingCD,
          isErrorCd,
          transactionsData,
          isLoadingTD,
          isErrorTD,
        }}
      >
        {children}
      </AccountContext.Provider>
    </QueryClientProvider>
  );
};

export { AccountProvider, AccountContext };
