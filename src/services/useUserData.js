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

export const useCustomerData = () => {
  return useQuery("customerData", fetchCustomerData);
};

export const useaccountData = () => {
  return useQuery("accountData", fetchaccountData);
};
