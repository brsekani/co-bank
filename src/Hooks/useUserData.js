import { useQuery } from "react-query";
import supabase from "../supabase";

const fetchUserData = async () => {
  const { data, error } = await supabase.from("customers").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useUserData = () => {
  return useQuery("userData", fetchUserData);
};
