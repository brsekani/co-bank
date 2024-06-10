import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useForm, Controller } from "react-hook-form";
import { useTransferMoney } from "../services/TransferMoney";
import { AccountContext } from "../Context/AccountContext";

const Transfers = ({
  isOpen,
  closeModal,
  formData,
  closeSendModal,
  bank,
  accountName,
}) => {
  const darkMode = useSelector((state) => state.darkMode);
  const RecipientName = accountName;
  const recipientAccountNumber = formData.accountNumber;
  const amount = formData.amount;
  const { accountData, customerData } = useContext(AccountContext);
  const accountId = accountData.map((acc) => acc.accountId);
  const accountBalance = accountData.map((acc) => acc.accountBalance);
  const [error, setError] = useState(null);

  const {
    transferMoney,
    transactionSuccess,
    setTransactionSuccess,
    isTransfering,
    transferError,
  } = useTransferMoney();

  // FullName of Account
  const senderfullName = customerData
    ?.map((customer) => {
      const capitalizeLastName =
        customer.lastName.charAt(0).toUpperCase() +
        customer.lastName.slice(1).toLowerCase();
      const capitalizeFirst =
        customer.firstName.charAt(0).toUpperCase() +
        customer.firstName.slice(1).toLowerCase();

      // Format the full name with a space in between
      const fullName = `${capitalizeLastName} ${capitalizeFirst}`;
      console.log(fullName); // This will log each name

      // Return the formatted name directly
      return fullName;
    })
    .join(" ");

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  const pinInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && pinInputRef.current) {
      // Focus the pin input when the component mounts
      pinInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (transferError?.message === "incorrect pin") {
      clearErrors("pin");
      setValue("pin", ""); // Clear the pin input
    }
    setError(transferError?.message);
  }, [transferError, clearErrors, setValue]);

  const onSubmit = (data) => {
    const pin = data.pin;
    transferMoney({
      accountId,
      amount,
      pin,
      accountName,
      recipientAccountNumber,
      senderfullName,
    });
  };

  function removeCommas(numberString) {
    return numberString?.replace(/,/g, "");
  }

  function handleClose() {
    closeSendModal();
    setTransactionSuccess(false);
  }

  function handleClosePaymentModal() {
    clearErrors("pin");
    setValue("pin", ""); // Clear the pin input
    setError(null);
    closeModal();
  }

  function handlePin() {
    clearErrors("pin");
    setError(null);
  }

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
        {/* {isTransfering && (
          <div
            className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden transition-opacity ${
              isTransfering ? "opacity-100" : "opacity-0 pointer-events-none"
            } bg-[rgba(0,0,0,.486)]`}
          >
            <div className="text-blue-500 z-1000">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 101 101"
                className="w-8 h-8 spin-animation"
              >
                <path
                  fill="#00446A"
                  d="M48.734 2.797A6 6 0 0 1 53.808 0h36.31c4.724 0 7.595 5.207 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 80h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
                ></path>
                <path
                  fill="#00A3FF"
                  d="M48.734 23.797A6 6 0 0 1 53.808 21h36.31c4.724 0 7.595 5.208 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 101h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
                ></path>
              </svg>
            </div>
          </div>
        )} */}
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

        <div className="px-5 mt-2">
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
            <h1 className="mb-1 text-xl text-colorPrimary">Payment Method</h1>

            <div
              className={`flex items-start justify-between ${
                error === "Insufficient balance to transfer"
                  ? "text-red-600"
                  : ""
              }`}
            >
              <p>Balance</p>
              <p>{useFormatBalance(accountBalance)}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                disabled={error}
              >
                {isTransfering ? <div className="spinner"></div> : "Confirm"}
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
