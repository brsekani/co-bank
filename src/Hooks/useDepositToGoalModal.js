import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import useFormatBalance from "./useFormatBalance";
import { useUpdateGoal } from "../services/addGoalApi";
import { useForm } from "react-hook-form";
import { setShowDepositToGoal } from "../Features/uiSlice";

const useDepositToGoalModal = ({ isOpen, goal }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const { accountData } = useContext(AccountContext);
  const accountId = accountData.map((acc) => acc.accountId);
  const accountBalance = accountData.map((acc) => acc.accountBalance);
  const savingsBalance = accountData.map((acc) => acc.savingsBalance);
  const creditCardBalance = accountData.map((acc) => acc.creditCardBalance);
  const formattedAccountBalance = useFormatBalance(accountBalance);
  const formattedCreditCardBalance = useFormatBalance(creditCardBalance);
  const formattedSavingsBalance = useFormatBalance(savingsBalance);
  const { updatingGoal, isUpdatingGoal, isUpdatingGoalError } = useUpdateGoal();

  const DespositToGoalRef = useRef();
  const maxAmountInput = goal.targetAmount - goal.totalAmount;

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    control,
  } = useForm();

  const onSubmit = (data) => {
    // Remove commas from the amount string
    const cleanedAmount = data.amount.replace(/,/g, "");

    // Convert the cleaned string to a number
    const goalData = {
      accountId: accountId[0],
      amount: Number(cleanedAmount),
      id: goal.id,
      balanceType: data.balanceType,
      name: goal.name,
    };

    console.log(goalData);

    updatingGoal(goalData);
    // You can dispatch actions here to handle form submission
  };

  const formatNumber = (value) => {
    const parts = value.replace(/[^0-9]/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isUpdatingGoal &&
        DespositToGoalRef.current &&
        !DespositToGoalRef.current.contains(event.target)
      ) {
        dispatch(setShowDepositToGoal(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, isUpdatingGoal]);

  if (!isOpen) return null;

  return {
    darkMode,
    DespositToGoalRef,
    handleSubmit,
    onSubmit,
    register,
    maxAmountInput,
    formatNumber,
    setValue,
    errors,
    isUpdatingGoalError,
    control,
    formattedAccountBalance,
    formattedCreditCardBalance,
    formattedSavingsBalance,
    isUpdatingGoal,
  };
};

export default useDepositToGoalModal;
