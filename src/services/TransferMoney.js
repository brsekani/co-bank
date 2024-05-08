import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useState } from "react";

const transferMoneyApi = async (tranferInfo) => {
  const { accountId, amount } = tranferInfo;
  const FormattedAmount = Number(amount);
  console.log(FormattedAmount);
  const description = "";
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

  const senderBalance = senderAccount.map((acc) => acc.accountBalance).at(0);

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
  await supabase.from("transactions").insert([
    {
      accountId: String(accountId),
      amount: -amount,
      type: "debit",
      description,
      status: "successfull",
      name: "Lawal",
    },
  ]);

  // Return success message or relevant data
  return {
    messsage: "Money Transfer successful",
  };
};

export const useTransferMoney = () => {
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const queryClient = useQueryClient();

  const transferMoney = useMutation({
    mutationFn: (transferInfo) => transferMoneyApi(transferInfo),
    onSuccess: (data, variables) => {
      console.log(data, variables);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setTransactionSuccess(true);
    },
    onError: (error) => {
      console.log(error);
      if (error.message === "Insufficient balance to transfer") {
        setInsufficientBalance(true);
      }
    },
  });

  return {
    transferMoney,
    transactionSuccess,
    setTransactionSuccess,
    insufficientBalance,
    setInsufficientBalance,
  };
};
