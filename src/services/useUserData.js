import { useQuery } from "react-query";
import supabase from "../supabase";
import { accountIdInfo, customerIdInfo } from "../utility/utilityFunction";

const accountIdInfoData = accountIdInfo();
const customerIdInfoData = customerIdInfo();
console.log(accountIdInfoData);

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

const fetchTransactions = async (accountId) => {
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
  return useQuery("customerData", fetchCustomerData);
};

export const useAccountData = () => {
  return useQuery("accountData", fetchaccountData);
};

export const useTransactions = (accountData) => {
  const accountId = accountData?.map((acc) => acc.accountId).at(0);

  return useQuery(["transactions", accountId], () =>
    fetchTransactions(accountId)
  );
};
