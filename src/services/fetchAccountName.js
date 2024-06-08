import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "your-supabase-url";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchAccountName = async (accountNumber, bankName) => {
  const { data, error } = await supabase
    .from("centralizedAccountInformation")
    .select("*")
    .eq("account_number", accountNumber)
    .eq("bank_name", bankName.toLowerCase());

  if (error) {
    throw error;
  }

  return data.length > 0 ? data[0].account_name : "Account not found";
};

export const useAccountName = (accountNumber, bankName) => {
  return useQuery(
    ["accountName", accountNumber, bankName],
    () => fetchAccountName(accountNumber, bankName),
    {
      enabled: !!accountNumber && !!bankName, // Only fetch if accountNumber and bankName are provided
    }
  );
};
