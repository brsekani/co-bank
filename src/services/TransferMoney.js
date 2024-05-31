import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useEffect, useState } from "react";

const transferMoneyApi = async (tranferInfo) => {
  const { accountId, amount } = tranferInfo;
  const FormattedAmount = Number(amount);

  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountId);

  if (senderError) {
    throw new Error(
      senderError.message || "Error fetching sender account data"
    );
  }

  const senderBalance = senderAccount[0]?.accountBalance;

  if (senderBalance < FormattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const UpdatedSenderBalance = senderBalance - FormattedAmount;

  await supabase
    .from("accounts")
    .update({ accountBalance: UpdatedSenderBalance })
    .eq("accountId", accountId);

  await supabase.from("transactions").insert([
    {
      accountId: String(accountId),
      amount: -amount,
      type: "debit",
      description: "",
      status: "successful",
      name: "Lawal",
    },
  ]);

  return {
    message: "Money Transfer successful",
  };
};

export const useTransferMoney = () => {
  const queryClient = useQueryClient();
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const {
    mutate: transferMoney,
    isPending: isTransfering,
    error: transferError,
  } = useMutation({
    mutationFn: transferMoneyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      setTransactionSuccess(true);
    },
    onError: (error) => {
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
    isTransfering,
    transferError,
  };
};
