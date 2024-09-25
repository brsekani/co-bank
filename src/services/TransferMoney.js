import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useState } from "react";
import { toast } from "react-toastify";

// Function to handle money transfer
const transferMoneyApi = async (transferInfo) => {
  const {
    account_id,
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
    .from("Accounts")
    .select("*")
    .eq("account_id", account_id);

  // Fetch receiver's info
  const { data: receiverAccount, error: receiverError } = await supabase
    .from("Accounts")
    .select("*")
    .eq("account_number", recipientAccountNumber);

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
    senderBalance = senderAccount[0]?.account_balance;
  } else if (balanceType === "creditCardBalance") {
    senderBalance = senderAccount[0]?.credit_card_balance;
  } else if (balanceType === "savingsBalance") {
    senderBalance = senderAccount[0]?.savings_balance;
  }

  const senderPin = senderAccount[0]?.pin;
  const receiverBalance = receiverAccount[0]?.account_balance;
  const receiverAccountId = receiverAccount[0]?.account_id;

  // Validate pin
  if (pin !== senderPin) {
    throw new Error("Incorrect pin");
  }

  // Validate sufficient balance
  if (senderBalance < formattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const updatedSenderBalance = senderBalance - formattedAmount;
  const updatedReceiverBalance = receiverBalance + formattedAmount;

  console.log(senderBalance);
  console.log(receiverBalance);
  console.log(updatedSenderBalance);
  console.log(updatedReceiverBalance);

  // Function to update balance
  const updateBalance = async (accountId, field, balance) => {
    await supabase
      .from("Accounts")
      .update({ [field]: balance })
      .eq("account_id", accountId);
  };

  // Updating sender's balance
  if (balanceType === "accountBalance") {
    await updateBalance(account_id, "account_balance", updatedSenderBalance);
  } else if (balanceType === "creditCardBalance") {
    await updateBalance(
      account_id,
      "credit_card_balance",
      updatedSenderBalance
    );
  } else if (balanceType === "savingsBalance") {
    await updateBalance(account_id, "savings_balance", updatedSenderBalance);
  }

  // Updating receiver's balance
  const { data, error } = await supabase
    .from("Accounts")
    .update({ account_balance: updatedReceiverBalance })
    .eq("account_id", receiverAccountId);

  console.log(data);
  console.log(error);

  // Function to insert transaction
  const insertTransaction = async (account_id, amount, type, name) => {
    await supabase.from("Transactions").insert([
      {
        account_id: String(account_id),
        amount,
        transaction_status: "successful",
        recipient_name: name,
      },
    ]);
  };

  // Sender transaction update
  await insertTransaction(account_id, -amount, "debit", accountName);

  // Receiver transaction update
  await insertTransaction(receiverAccountId, amount, "credit", senderFullName);

  // return {
  //   message: "Money Transfer successful",
  //   amount,
  // };
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      setTransactionSuccess(true);
      toast.success(`$${data.amount} was successfully sent`);
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
