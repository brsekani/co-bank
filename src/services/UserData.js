import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase";

const fetchUserData = async (user_id) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchaccountData = async (account_id) => {
  const { data, error } = await supabase
    .from("Accounts")
    .select("*")
    .eq("account_id", account_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchTransactions = async (account_id) => {
  const { data, error } = await supabase
    .from("Transactions")
    .select("*")
    .eq("account_id", account_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchGoals = async (account_id) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("account_id", account_id);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const useUserData = (user_id) => {
  const {
    isPending: isLoadingUserData,
    data: userData,
    error: errorUserData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(user_id),
  });
  console.log("Customer Data:", userData);

  return { isLoadingUserData, userData, errorUserData };
};

export const useAccountData = (account_id) => {
  console.log(account_id);
  const {
    isPending: isLoadingAccountData,
    data: accountData,
    error: errorAccountData,
  } = useQuery({
    queryKey: ["account"],
    queryFn: () => fetchaccountData(account_id),
    // refetchInterval: 1000 * 3,
  });
  return {
    isLoadingAccountData,
    accountData,
    errorAccountData,
  };
};

export const useTransactions = (account_id) => {
  const {
    isPending: isLoadingTransactions,
    data: transactionsData,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(account_id),
    // refetchInterval: 1000 * 3,
  });

  return {
    isLoadingTransactions,
    transactionsData,
    errorTransactions,
  };
};

export const useGoals = (account_id) => {
  const {
    isPending: isLoadingGoals,
    data: goalsData,
    error: errorGoals,
    refetch: refetchGoals,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: () => fetchGoals(account_id),
    // refetchInterval: 1000 * 3,
  });
  console.log(goalsData);
  return {
    isLoadingGoals,
    goalsData,
    errorGoals,
    refetchGoals,
  };
};
