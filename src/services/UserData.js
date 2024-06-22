import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase";
import { accountIdInfo, customerIdInfo } from "../utility/utilityFunction";
import { getCurrentUser } from "./apiAuth";
import { useAuth } from "../Context/AuthProvider";

const accountIdInfoData = accountIdInfo();
const customerIdInfoData = customerIdInfo();
// const accountIdInfoData = "2ba2831e-6007-4f40-9cc2-d1e7e326b2ea";
// const customerIdInfoData = "e85d8cea-b4bb-4a45-a8ac-6541112f51ec";

const fetchCustomerData = async () => {
  // const { customerId } = getCurrentUser();
  // console.log(customerId);

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
  // const { accountId } = getCurrentUser();
  // console.log(accountId);

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
    isPending: isLoadingCustomerData,
    data: customerData,
    error: errorCustomerData,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomerData,
  });
  console.log("Customer Data:", customerData);

  return { isLoadingCustomerData, customerData, errorCustomerData };
};

export const useAccountData = () => {
  const {
    isPending: isLoadingAccountData,
    data: accountData,
    error: errorAccountData,
  } = useQuery({
    queryKey: ["account"],
    queryFn: fetchaccountData,
    // refetchInterval: 1000 * 3,
  });
  return {
    isLoadingAccountData,
    accountData,
    errorAccountData,
  };
};

export const useTransactions = (accountData) => {
  const {
    isPending: isLoadingTransactions,
    data: transactionsData,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(accountData),
    // refetchInterval: 1000 * 3,
  });

  return {
    isLoadingTransactions,
    transactionsData,
    errorTransactions,
  };
};
