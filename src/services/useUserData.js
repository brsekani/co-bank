import { useQuery } from "react-query";
import supabase from "../supabase";

const fetchCustomerData = async () => {
  const { data, error } = await supabase.from("customers").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchaccountData = async () => {
  const { data, error } = await supabase.from("accounts").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchTransactions = async (accountId) => {
  console.log(accountId);
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("accountId", accountId);

  console.log(data);

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
  console.log(accountId);

  return useQuery(["transactions", accountId], () =>
    fetchTransactions(accountId)
  );
};
