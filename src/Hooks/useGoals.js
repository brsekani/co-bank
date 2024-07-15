import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import { setShowDepositToGoal } from "../Features/uiSlice";

const useGoals = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const { showDepositToGoal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [searchedGoals, setSearchGoals] = useState("");
  const { goalsData } = useContext(AccountContext);

  const arrangedGoalsByDataCreated = goalsData?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const filteredGoals = arrangedGoalsByDataCreated?.filter((goal) =>
    goal.name.toLowerCase().includes(searchedGoals.toLowerCase())
  );

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    dispatch(setShowDepositToGoal(true));
  };
  return {
    darkMode,
    setSearchGoals,
    searchedGoals,
    filteredGoals,
    handleGoalClick,
    showDepositToGoal,
    selectedGoal,
    dispatch,
  };
};

export default useGoals;
