import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { setShowAddNewGoal, setShowDepositToGoal } from "../Features/uiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const addGoalApi = async (goalData) => {
  const { account_id, name, target_amount } = goalData;

  const { data: existingGoals } = await supabase
    .from("goals")
    .select("*")
    .eq("account_id", account_id);

  const existingGoalName = existingGoals.some(
    (existingGoal) => existingGoal.name.toLowerCase() === name.toLowerCase()
  );

  if (existingGoalName === true) {
    throw new Error("A goal with this name already exists.");
  }

  const { data, error } = await supabase.from("goals").insert([
    {
      account_id, // Generate a unique ID
      name,
      target_amount,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Goal Added", data, name };
};

const updateGoalApi = async (goalData) => {
  const { account_id, amount, id, balanceType, name } = goalData;
  console.log(account_id, amount, id, balanceType, name);

  // Fetch sender account data
  const { data: senderAccount, error: senderError } = await supabase
    .from("Accounts")
    .select("*")
    .eq("account_id", account_id);

  if (senderError) {
    throw new Error(
      senderError.message || "Error fetching sender account data"
    );
  }

  // Determine sender's balance based on balance type
  let senderBalance;
  if (balanceType === "accountBalance") {
    senderBalance = senderAccount[0]?.account_balance;
  } else if (balanceType === "creditCardBalance") {
    senderBalance = senderAccount[0]?.credit_card_balance;
  } else if (balanceType === "savingsBalance") {
    senderBalance = senderAccount[0]?.savings_balance;
  }

  const formattedAmount = String(amount);

  // Validate sufficient balance
  if (senderBalance < formattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const updatedSenderBalance = senderBalance - formattedAmount;
  console.log("p1");
  // Function to update balance
  const updateBalance = async (account_id, field, updatedSenderBalance) => {
    await supabase
      .from("Accounts")
      .update({ [field]: updatedSenderBalance })
      .eq("account_id", account_id)
      .select();
  };
  console.log("p1");
  // Update sender's balance
  if (balanceType === "accountBalance") {
    await updateBalance(account_id, "account_balance", updatedSenderBalance);
    console.log(account_id, "account_balance", updatedSenderBalance);
  } else if (balanceType === "creditCardBalance") {
    await updateBalance(
      account_id,
      "credit_card_balance",
      updatedSenderBalance
    );
  } else if (balanceType === "savingsBalance") {
    await updateBalance(account_id, "savings_balance", updatedSenderBalance);
  }
  // Insert a transaction record
  await supabase.from("Transactions").insert([
    {
      account_id: String(account_id),
      amount: -amount,
      transaction_status: "successful",
      transaction_type: "debit",
      recipient_name: name,
    },
  ]);

  // Fetch the existing goal
  const { data: existingGoal, error: fetchError } = await supabase
    .from("goals")
    .select("total_amount")
    .eq("account_id", account_id)
    .eq("id", id)
    .select();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const existingGoalBalance = existingGoal[0]?.total_amount;
  const updatedAmount = String(
    Number(existingGoalBalance) + Number(formattedAmount)
  );

  // Update the goal with the new amount
  const { data, error } = await supabase
    .from("goals")
    .update({ total_amount: updatedAmount })
    .eq("id", id)
    .select();

  console.log("p4");

  if (error) {
    console.log("p5");
    throw new Error(error.message);
  }

  return { message: "Goal Added", data, name };
};

const withdrawFromGoal = async (goalData) => {
  const { account_id, id, name } = goalData;

  // Fetch the existing goal
  const { data: existingGoal, error: fetchGoalError } = await supabase
    .from("goals")
    .select("total_amount")
    .eq("account_id", account_id)
    .eq("id", id);

  if (fetchGoalError) {
    throw new Error(`Failed to fetch the goal: ${fetchGoalError.message}`);
  }

  // Fetch sender account data
  const { data: senderAccount, error: fetchAccountError } = await supabase
    .from("Accounts")
    .select("*")
    .eq("account_id", account_id);

  if (fetchAccountError) {
    throw new Error(
      `Failed to fetch sender account data: ${fetchAccountError.message}`
    );
  }

  if (!senderAccount || senderAccount.length === 0) {
    throw new Error("Sender account not found");
  }

  const existingGoalBalance = existingGoal[0].total_amount;
  const senderBalance = senderAccount[0].account_balance;

  // Calculate updated balance
  const updatedSenderBalance = String(
    Number(existingGoalBalance) + Number(senderBalance)
  );

  // Update sender account balance
  const { error: updateAccountError } = await supabase
    .from("Accounts")
    .update({ account_balance: updatedSenderBalance })
    .eq("account_id", account_id);
  if (updateAccountError) {
    throw new Error(
      `Failed to update account balance: ${updateAccountError.message}`
    );
  }

  // Insert a transaction record
  const { error: insertTransactionError } = await supabase
    .from("Transactions")
    .insert([
      {
        account_id: String(account_id),
        amount: +existingGoalBalance,
        transaction_status: "successful",
        transaction_type: "credit",
        recipient_name: name,
        // description: `From ${name}`,
      },
    ]);

  if (insertTransactionError) {
    throw new Error(
      `Failed to insert transaction: ${insertTransactionError.message}`
    );
  }

  const { error: delelteGoalError } = await supabase
    .from("goals")
    .delete()
    .eq("account_id", account_id)
    .eq("id", id);

  if (delelteGoalError) {
    throw new Error(
      `Failed to insert transaction: ${delelteGoalError.message}`
    );
  }

  return { message: "Withdrawal successful", account_id, name };
};

export const useAddGoalApi = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const {
    mutate: addGoal,
    isError: isAddGoalError,
    isPending: isAddingGoal,
  } = useMutation({
    mutationFn: addGoalApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      dispatch(setShowAddNewGoal(false));
      toast.success(`${data.name} has been Added to goals`);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return { isAddGoalError, addGoal, isAddingGoal, error };
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    mutate: updatingGoal,
    isPending: isUpdatingGoal,
    error: isUpdatingGoalError,
  } = useMutation({
    mutationFn: updateGoalApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      dispatch(setShowDepositToGoal(false));
      toast.success(`Money has been added to the goal: ${data.name}`);
    },
  });

  return {
    updatingGoal,
    isUpdatingGoal,
    isUpdatingGoalError,
  };
};

export const useWithdrawFromGoal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: withdrawGoal,
    isPending: isWithdrawing,
    error: withdrawGoalError,
  } = useMutation({
    mutationFn: withdrawFromGoal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success(
        `Money has been withdrawn from the ${data.name} goal to main balance`
      );
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Error withdrawing money: ${error.message}`);
    },
  });

  return {
    withdrawGoal,
    isWithdrawing,
    withdrawGoalError,
  };
};
