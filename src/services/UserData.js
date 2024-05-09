import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase";
import { accountIdInfo, customerIdInfo } from "../utility/utilityFunction";

const accountIdInfoData = accountIdInfo();
const customerIdInfoData = customerIdInfo();
// console.log(accountIdInfoData);

const fetchCustomerData = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("customerId", customerIdInfoData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchaccountData = async () => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountIdInfoData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchTransactions = async (accountData) => {
  const accountId = accountData?.map((acc) => acc.accountId).at(0);

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("accountId", accountId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCustomerData = () => {
  const {
    isLoading: isLoadingCustomerData,
    data: customerData,
    error: errorCustomerData,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomerData,
  });

  return { isLoadingCustomerData, customerData, errorCustomerData };
};

export const useAccountData = () => {
  const {
    isLoading: isLoadingAccountData,
    data: accountData,
    error: errorAccountData,
  } = useQuery({
    queryKey: ["account"],
    queryFn: fetchaccountData,
    refetchInterval: 1000 * 3,
  });
  return {
    isLoadingAccountData,
    accountData,
    errorAccountData,
  };
};

export const useTransactions = (accountData) => {
  const {
    isLoading: isLoadingTransactions,
    data: transactionsData,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountData),
    refetchInterval: 1000 * 3,
  });

  return {
    isLoadingTransactions,
    transactionsData,
    errorTransactions,
  };
};
