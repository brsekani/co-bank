import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { setShowDepositToGoal } from "../Features/uiSlice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function DepositToGoalModal({ isOpen, onClose, goal, dispatch }) {
  const darkMode = useSelector((state) => state.darkMode);
  const DespositToGoalRef = useRef();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can dispatch actions here to handle form submission
    dispatch(setShowDepositToGoal(false)); // Example: Close modal after submission
  };

  const formatNumber = (value) => {
    const parts = value.replace(/[^0-9]/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
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
  }, [dispatch]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-rob">
      <div
        className={`relative w-full h-full p-5 rounded-md shadow-lg sm:max-w-lg sm:h-fit ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        ref={DespositToGoalRef}
      >
        <h1 className="text-2xl font-semibold text-center sm:text-3xl text-colorPrimary">
          Add Funds to <span className="capitalize">{goal.name}</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex flex-col mb-4">
            <label className="block text-sm font-medium">Amount</label>
            <input
              className="w-full h-10 bg-transparent border border-white/1 pl-7"
              placeholder="Enter Amount"
              type="text"
              inputMode="tel"
              autoComplete="off"
              maxLength={15}
              {...register("amount", {
                required: "Enter an amount",
                validate: (value) => {
                  const amount = parseFloat(value.replace(/,/g, ""));
                  if (isNaN(amount)) return "Invalid amount";
                  if (amount < 100) return "Amount must be at least $10";
                  return true;
                },
              })}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                const formattedValue = formatNumber(rawValue);

                setValue("amount", formattedValue, { shouldValidate: true });
              }}
            />
            <PiCurrencyDollarSimpleBold
              color="rgb(0, 163, 255)"
              size={25}
              className="absolute top-7 left-1"
            />
            {errors.amount && (
              <span className="text-xs text-red-500">
                {errors.amount.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Goal
            </button>
            <button
              className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

DepositToGoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  goal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // Define other properties of the goal object as needed
  }).isRequired,
};

export default DepositToGoalModal;
