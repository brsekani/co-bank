import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import useFormatBalance from "../Hooks/useFormatBalance";
import { Controller } from "react-hook-form";

import useSendInfoModal from "../Hooks/useSendInfoModal";

const Transfers = ({
  isOpen,
  closeModal,
  formData,
  closeSendModal,
  bank,
  accountName,
}) => {
  const {
    darkMode,
    accountBalance,
    savingsBalance,
    creditCardBalance,
    error,
    transactionSuccess,
    isTransferring,
    control,
    handleSubmit,
    errors,
    onSubmit,
    removeCommas,
    handleClose,
    handleClosePaymentModal,
    handlePin,
    pinInputRef,
    handleSelectPaymentMethod,
  } = useSendInfoModal({ closeModal, formData, closeSendModal, accountName });
  const RecipientName = accountName;
  const recipientAccountNumber = formData?.accountNumber;
  const amount = formData?.amount;
  const formattedAccountBalance = useFormatBalance(accountBalance);
  const formattedCreditCardBalance = useFormatBalance(creditCardBalance);
  const formattedSavingsBalance = useFormatBalance(savingsBalance);

  return (
    <div
      className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-[rgba(0,0,0,.486)]`}
    >
      <div
        className={`flex item-center md:justify-center flex-col p-5 rounded-lg font-rob w-full h-full md:w-[450px] md:h-fit transform transition-transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
      >
        {!transactionSuccess ? (
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Payment</h1>
            <RxCross2
              size={25}
              className="cursor-pointer"
              onClick={handleClosePaymentModal}
            />
          </div>
        ) : (
          <h1 className="mt-2 text-3xl text-center text-green-600">
            Transaction Successful!
          </h1>
        )}
        <h1
          className={`text-center text-3xl mt-2 ${
            error === "Insufficient balance to transfer"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {useFormatBalance(Number(removeCommas(amount)) + 1)}
        </h1>

        <div className="px-5 py-2 mt-2 border rounded-lg shadow-lg">
          {!transactionSuccess && (
            <div className="flex items-center justify-between">
              <p className="text-sm">Fee</p>
              <p>$1</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm">Account Number</p>
            <p>{recipientAccountNumber}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Name</p>
            <p>{RecipientName}</p>
          </div>

          {transactionSuccess && (
            <div className="flex items-center justify-between">
              <p className="text-sm">Bank</p>
              <p>{bank.name}</p>
            </div>
          )}
        </div>

        {!transactionSuccess && (
          <div className="mt-3">
            <h1 className="mb-1 text-sm text-colorPrimary">Payment Method</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative w-full mb-2 rounded-lg shadow-lg">
                <Controller
                  name="balanceType"
                  control={control}
                  defaultValue="accountBalance"
                  rules={{
                    onChange: handleSelectPaymentMethod,
                  }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full py-2 pl-3 pr-10 border rounded-lg h-14 bg-input border-border text-primary ${
                        darkMode
                          ? "bg-[#1E1E1E] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <option value="accountBalance" className="text-primary">
                        Current Balance - {formattedAccountBalance}
                      </option>
                      <option
                        value="creditCardBalance"
                        className="text-primary"
                      >
                        Credit Card Balance - {formattedCreditCardBalance}
                      </option>
                      <option value="savingsBalance" className="text-primary">
                        Savings Balance - {formattedSavingsBalance}
                      </option>
                    </select>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  className={`${
                    error === "incorrect pin" ? "text-red-600" : ""
                  }`}
                >
                  Pin
                </label>
                <Controller
                  name="pin"
                  control={control}
                  rules={{
                    required: "Enter pin",
                    minLength: {
                      value: 4,
                      message: "Enter 4 digits pin",
                    },
                    onChange: handlePin,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      autoComplete="new-password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      minLength={4}
                      ref={pinInputRef}
                      className={`w-48 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
                        darkMode
                          ? "bg-[#1E1E1E] text-white"
                          : "bg-white text-black"
                      } ${
                        error === "incorrect pin"
                          ? "text-red-600 border-red-600"
                          : ""
                      }`}
                    />
                  )}
                />
              </div>
              {errors?.pin && (
                <span className="text-xs text-red-500">
                  {errors.pin.message}
                </span>
              )}

              {error && <p className="text-center text-red-600">{error}</p>}

              <button
                className={`flex items-center justify-center w-full h-10 text-xl font-semibold text-white rounded-md bg-colorPrimary ${
                  error ? "" : "mt-5"
                } `}
                disabled={error || isTransferring}
              >
                {isTransferring ? <div className="spinner"></div> : "Confirm"}
              </button>
            </form>
          </div>
        )}

        {transactionSuccess && (
          <button
            className="w-full h-10 mt-5 text-xl font-semibold text-white rounded-md bg-colorPrimary"
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

Transfers.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  closeSendModal: PropTypes.func.isRequired,
  bank: PropTypes.object.isRequired,
  accountName: PropTypes.string.isRequired,
};

export default Transfers;
