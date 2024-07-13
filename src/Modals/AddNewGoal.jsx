import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddNewGoal } from "../Features/uiSlice";
import { GoGoal } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

function AddNewGoal() {
  const darkMode = useSelector((state) => state.darkMode);
  const addNewGoalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
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
  }, [dispatch]);

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
    console.log(data);
    // You can dispatch actions here to handle form submission
    dispatch(setShowAddNewGoal(false)); // Example: Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div
        className={`w-full sm:max-w-lg h-full sm:h-fit mx-auto rounded-lg shadow-lg bg-white text-black ${
          darkMode ? "bg-gray-800 text-white" : ""
        }`}
        ref={addNewGoalRef}
      >
        <div className="p-6">
          <div className="flex items-center justify-center">
            <GoGoal className="mr-2" size={24} />
            <h1 className="text-xl font-semibold">Add New Goal</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please enter the name of your goal",
                  minLength: {
                    value: 3,
                    message: "Please enter a 3 characters",
                  },
                  //   pattern: {
                  //     value: /^\d{10}$/,
                  //     message: "Please enter a valid 10-digit account number",
                  //   },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter goal name"
                    maxLength={10}
                  />
                )}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col mb-4">
              <label className="block mb-1 text-sm font-medium">
                Target Amount
              </label>
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
                className="absolute top-8 left-1"
              />
              {errors.amount && (
                <span className="text-xs text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewGoal;
