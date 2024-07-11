import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useState } from "react";

// Function to handle money transfer
const transferMoneyApi = async (transferInfo) => {
  const {
    accountId,
    amount,
    pin,
    accountName,
    recipientAccountNumber,
    senderFullName,
    balanceType,
  } = transferInfo;

  console.log(balanceType);

  const formattedAmount = Number(amount);

  // Fetch sender's info
  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountId);

  // Fetch receiver's info
  const { data: receiverAccount, error: receiverError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountNumber", recipientAccountNumber);

  if (senderError) {
    throw new Error(
      senderError.message || "Error fetching sender account data"
    );
  }
  if (receiverError) {
    throw new Error(
      receiverError.message || "Error fetching receiver account data"
    );
  }

  // Determine the balance type for the sender
  let senderBalance;
  if (balanceType === "accountBalance") {
    console.log(true);
    senderBalance = senderAccount[0]?.accountBalance;
  } else if (balanceType === "creditCardBalance") {
    senderBalance = senderAccount[0]?.creditCardBalance;
  } else if (balanceType === "savingsBalance") {
    senderBalance = senderAccount[0]?.savingsBalance;
  }

  const senderPin = senderAccount[0]?.pin;
  const receiverBalance = receiverAccount[0]?.accountBalance;
  const receiverAccountId = receiverAccount[0]?.accountId;

  // Validate pin
  if (pin !== senderPin) {
    throw new Error("Incorrect pin");
  }

  console.log(senderBalance, formattedAmount);
  // Validate sufficient balance
  if (senderBalance < formattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const updatedSenderBalance = senderBalance - formattedAmount;
  const updatedReceiverBalance = receiverBalance + formattedAmount;

  // Function to update balance
  const updateBalance = async (accountId, field, balance) => {
    await supabase
      .from("accounts")
      .update({ [field]: balance })
      .eq("accountId", accountId);
  };

  // Updating sender's balance
  if (balanceType === "accountBalance") {
    await updateBalance(accountId, "accountBalance", updatedSenderBalance);
  } else if (balanceType === "creditCardBalance") {
    await updateBalance(accountId, "creditCardBalance", updatedSenderBalance);
  } else if (balanceType === "savingsBalance") {
    await updateBalance(accountId, "savingsBalance", updatedSenderBalance);
  }

  // Updating receiver's balance
  await supabase
    .from("accounts")
    .update({ accountBalance: updatedReceiverBalance })
    .eq("accountNumber", recipientAccountNumber);

  // Function to insert transaction
  const insertTransaction = async (accountId, amount, type, name) => {
    await supabase.from("transactions").insert([
      {
        accountId: String(accountId),
        amount,
        type,
        description: "",
        status: "successful",
        name,
      },
    ]);
  };

  // Sender transaction update
  await insertTransaction(accountId, -amount, "debit", accountName);

  // Receiver transaction update
  await insertTransaction(receiverAccountId, amount, "credit", senderFullName);

  return {
    message: "Money Transfer successful",
  };
};

// Custom hook to manage money transfer
export const useTransferMoney = () => {
  const queryClient = useQueryClient();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const {
    mutate: transferMoney,
    isPending: isTransferring,
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
    isTransferring,
    transferError,
  };
};
