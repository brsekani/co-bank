// AccountContext.jsx
import { createContext } from "react";
import { useaccountData, useCustomerData } from "../services/useUserData";
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
  } = useaccountData();

  const {
    data: customerData,
    isLoading: isLoadingCD,
    isError: isErrorCd,
  } = useCustomerData();

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
        }}
      >
        {children}
      </AccountContext.Provider>
    </QueryClientProvider>
  );
};

export { AccountProvider, AccountContext };
