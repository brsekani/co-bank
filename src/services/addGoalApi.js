import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { setShowAddNewGoal, setShowDepositToGoal } from "../Features/uiSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const addGoalApi = async (goalData) => {
  const { accountId, name, targetAmount } = goalData;

  const { data: existingGoals } = await supabase
    .from("goals")
    .select("*")
    .eq("accountId", accountId);

  const existingGoalName = existingGoals.some(
    (existingGoal) => existingGoal.name.toLowerCase() === name.toLowerCase()
  );

  if (existingGoalName === true) {
    throw new Error("A goal with this name already exists.");
  }

  const { data, error } = await supabase.from("goals").insert([
    {
      accountId, // Generate a unique ID
      name,
      targetAmount,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Goal Added", data, name };
};

const updateGoalApi = async (goalData) => {
  const { accountId, amount, id, balanceType, name } = goalData;

  // Fetch sender account data
  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("*")
    .eq("accountId", accountId);

  if (senderError) {
    throw new Error(
      senderError.message || "Error fetching sender account data"
    );
  }

  // Determine sender's balance based on balance type
  let senderBalance;
  if (balanceType === "accountBalance") {
    senderBalance = senderAccount[0]?.accountBalance;
  } else if (balanceType === "creditCardBalance") {
    senderBalance = senderAccount[0]?.creditCardBalance;
  } else if (balanceType === "savingsBalance") {
    senderBalance = senderAccount[0]?.savingsBalance;
  }

  const formattedAmount = Number(amount);

  // Validate sufficient balance
  if (senderBalance < formattedAmount) {
    throw new Error("Insufficient balance to transfer");
  }

  const updatedSenderBalance = senderBalance - formattedAmount;

  // Function to update balance
  const updateBalance = async (accountId, field, balance) => {
    await supabase
      .from("accounts")
      .update({ [field]: balance })
      .eq("accountId", accountId);
  };

  // Update sender's balance
  if (balanceType === "accountBalance") {
    await updateBalance(accountId, "accountBalance", updatedSenderBalance);
  } else if (balanceType === "creditCardBalance") {
    await updateBalance(accountId, "creditCardBalance", updatedSenderBalance);
  } else if (balanceType === "savingsBalance") {
    await updateBalance(accountId, "savingsBalance", updatedSenderBalance);
  }

  // Insert a transaction record
  await supabase.from("transactions").insert([
    {
      accountId: String(accountId),
      amount: -amount,
      type: "debit",
      description: `For ${name}`,
      status: "successful",
      name,
    },
  ]);

  // Fetch the existing goal
  const { data: existingGoal, error: fetchError } = await supabase
    .from("goals")
    .select("totalAmount")
    .eq("accountId", accountId)
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const existingGoalBalance = existingGoal?.totalAmount;
  const updatedAmount = existingGoalBalance + formattedAmount;

  // Update the goal with the new amount
  const { data, error } = await supabase
    .from("goals")
    .update({ totalAmount: updatedAmount })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Goal Added", data, name };
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
      console.log(data);
      toast.success(`Money has been added to the goal: ${data.name}`);
    },
  });

  return {
    updatingGoal,
    isUpdatingGoal,
    isUpdatingGoalError,
  };
};
