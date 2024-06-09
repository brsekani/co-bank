import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useState } from "react";

const transferMoneyApi = async (tranferInfo) => {
  const {
    accountId,
    amount,
    pin,
    accountName,
    recipientAccountNumber,
    senderfullName,
  } = tranferInfo;
  console.log(accountName, recipientAccountNumber);
  const FormattedAmount = Number(amount);

  // Senders Info
  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountId);

  // Receiver Info
  const { data: receiverAccount, error: receiverError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountNumber", recipientAccountNumber);
  console.log(receiverAccount, receiverError);

  if (senderError) {
    throw new Error(
      senderError.message || "Error fetching sender account data"
    );
  }

  console.log(receiverAccount);

  const senderBalance = senderAccount[0]?.accountBalance;
  const senderpin = senderAccount[0]?.pin;

  const receiverBalance = receiverAccount[0]?.accountBalance;
  const receiverAccountId = receiverAccount[0]?.accountId;

  if (pin !== senderpin) {
    throw new Error("incorrect pin");
  }

  if (senderBalance < FormattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const UpdatedSenderBalance = senderBalance - FormattedAmount;
  const UpdatedReceiverBalance = receiverBalance + FormattedAmount;

  // updating senders balance
  await supabase
    .from("accounts")
    .update({ accountBalance: UpdatedSenderBalance })
    .eq("accountId", accountId);

  // Updating Reciever balance
  await supabase
    .from("accounts")
    .update({ accountBalance: UpdatedReceiverBalance })
    .eq("accountNumber", recipientAccountNumber);

  // Sender transaction update
  await supabase.from("transactions").insert([
    {
      accountId: String(accountId),
      amount: -amount,
      type: "debit",
      description: "",
      status: "successful",
      name: accountName,
    },
  ]);

  console.log(senderfullName);

  // Receiver transaction update
  await supabase.from("transactions").insert([
    {
      accountId: String(receiverAccountId),
      amount: +amount,
      type: "credit",
      description: "",
      status: "successful",
      name: senderfullName,
    },
  ]);

  return {
    message: "Money Transfer successful",
  };
};

export const useTransferMoney = () => {
  const queryClient = useQueryClient();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

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
  });

  return {
    transferMoney,
    transactionSuccess,
    setTransactionSuccess,
    isTransfering,
    transferError,
  };
};
