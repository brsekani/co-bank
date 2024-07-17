import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import { useAddGoalApi } from "../services/addGoalApi";
import { setShowAddNewGoal } from "../Features/uiSlice";
import { useForm } from "react-hook-form";

const useAddNewGoal = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const addNewGoalRef = useRef();
  const dispatch = useDispatch();
  const { accountData } = useContext(AccountContext);
  const accountId = accountData.map((acc) => acc.accountId);
  const { isAddGoalError, addGoal, isAddingGoal, error } = useAddGoalApi();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isAddingGoal &&
        addNewGoalRef.current &&
        !addNewGoalRef.current.contains(event.target)
      ) {
        dispatch(setShowAddNewGoal(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, isAddingGoal]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const formatNumber = (value) => {
    const parts = value.replace(/[^0-9]/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const onSubmit = (data) => {
    const goalData = {
      accountId: accountId[0], // Assuming you want the first accountId
      name: data.name,
      targetAmount: parseFloat(data.amount.replace(/,/g, "")),
    };
    addGoal(goalData);
  };

  return {
    darkMode,
    addNewGoalRef,
    handleSubmit,
    onSubmit,
    control,
    errors,
    register,
    formatNumber,
    setValue,
    isAddingGoal,
    isAddGoalError,
    error,
  };
};

export default useAddNewGoal;
