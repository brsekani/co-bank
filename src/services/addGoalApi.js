import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { setShowAddNewGoal } from "../Features/uiSlice";
import { useDispatch } from "react-redux";

const addGoalApi = async (goalData) => {
  const { accountId, name, totalAmount, targetAmount } = goalData;

  const { data: existingGoal } = await supabase
    .from("goals")
    .select("*")
    .eq("id", accountId)
    .single();

  if (existingGoal) {
    throw new Error("A goal with this accountId already exists.");
  }

  const { data, error } = await supabase.from("goals").insert([
    {
      accountId, // Generate a unique ID
      name,
      targetAmount,
      totalAmount,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Goal Added", data };
};

export const useAddGoalApi = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    mutate: addGoal,
    isError: isAddGoalError,
    isPending: isAddingGoal,
  } = useMutation({
    mutationFn: addGoalApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      dispatch(setShowAddNewGoal(false));
    },
    onError: (error) => {
      console.error("Error adding goal:", error);
    },
  });

  return { isAddGoalError, addGoal, isAddingGoal };
};
