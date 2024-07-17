import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import useDepositToGoalModal from "../Hooks/useDepositToGoalModal";

function DepositToGoalModal({ isOpen, onClose, goal }) {
  const {
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
  } = useDepositToGoalModal({ isOpen, goal });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
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
          <div className="relative flex flex-col mb-2">
            <label className="block text-sm font-medium">Amount</label>
            <input
              className="w-full h-10 bg-transparent border rounded-md border-white/1 pl-7"
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
                  if (amount < 1) return "Amount must be at least $1";
                  if (amount > maxAmountInput)
                    return `Amount must not exceed $${maxAmountInput}`;
                  return true;
                },
              })}
              onChange={(e) => {
                const rawValue = e.target.value
                  .replace(/,/g, "")
                  .replace(/^0+/, "");
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
            {isUpdatingGoalError && (
              <p className="text-xs text-red-600">
                Network Error...Kindly retry
              </p>
            )}
          </div>

          <div className="relative w-full mb-2 rounded-lg shadow-lg">
            <Controller
              name="balanceType"
              control={control}
              defaultValue="accountBalance"
              rules={
                {
                  // onChange: handleSelectPaymentMethod,
                }
              }
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full py-2 pl-3 pr-10 border rounded-lg h-10 bg-input border-border text-primary ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <option value="accountBalance" className="text-primary">
                    Current Balance - {formattedAccountBalance}
                  </option>
                  <option value="creditCardBalance" className="text-primary">
                    Credit Card Balance - {formattedCreditCardBalance}
                  </option>
                  <option value="savingsBalance" className="text-primary">
                    Savings Balance - {formattedSavingsBalance}
                  </option>
                </select>
              )}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row">
            <button
              type="submit"
              className="flex items-center justify-center w-full h-10 px-4 py-2 text-white transition duration-200 rounded-md bg-colorPrimary"
            >
              {isUpdatingGoal ? <div className="spinner"></div> : "Add Anount"}
            </button>
            <button
              className="w-full px-4 py-2 text-white transition duration-200 rounded-md bg-colorPrimary"
              onClick={onClose}
              disabled={isUpdatingGoal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DepositToGoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  goal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    targetAmount: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    // Define other properties of the goal object as needed
  }).isRequired,
};

export default DepositToGoalModal;
