import { useMutation } from "react-query";
import supabase from "../supabase";
import { useState } from "react";

const tranferMoney = async (tranferInfo) => {
  console.log(tranferInfo);

  const { accountId, amount } = tranferInfo;
  const FormattedAmount = Number(amount);
  const description = "";
  console.log(accountId, amount, description);
  // Fetch sender and receiver account information
  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountId);

  console.log(senderAccount, senderError);

  if (senderError) {
    throw new Error(
      senderError.message || "Errors fetchimg sender account data"
    );
  }

  const senderBalance = senderAccount.map((acc) => acc.accountBalance);
  console.log(senderBalance);

  // Check if sender has sufficient Balance
  if (senderBalance < FormattedAmount) {
    throw new Error("Insufficent balance to transfer");
  }

  // Deduct money from sender's account
  const UpdatedSenderBalance = senderBalance - FormattedAmount;
  console.log(UpdatedSenderBalance);

  // Update sender's account balance
  await supabase
    .from("accounts")
    .update({ accountBalance: UpdatedSenderBalance })
    .eq("accountId", accountId);

  // Record transaction details (debit from sender)
  const { data, error } = await supabase.from("transactions").insert([
    {
      accountId: String(accountId),
      amount: -amount,
      type: "debit",
      description,
      status: "successfull",
      name: "Lawal",
    },
  ]);

  console.log(data, error);

  // Return success message or relevant data
  return {
    messsage: "Money Transfer successful",
  };
};

export const useTransferMoney = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation(tranferMoney, {
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  return { ...mutation, isLoading };
};
