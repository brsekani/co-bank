import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useContext, useState } from "react"; // Added useState
import { RxCross2 } from "react-icons/rx";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useForm } from "react-hook-form";
import { useTransferMoney } from "../services/TransferMoney";
import { AccountContext } from "../Context/AccountContext";
import { useQueryClient } from "react-query";

const Tranfers = ({ isOpen, closeModal, formData, closeSendModal, bank }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const RecipientName = "Lawal Temidayo";
  const RecipientAccountNumber = formData.accountNumber;
  const amount = formData.amount;
  const [transactionSuccess, setTransactionSuccess] = useState(false); // State for transaction success
  const { accountData } = useContext(AccountContext);
  const accountId = accountData.map((acc) => acc.accountId);
  const accountBalance = accountData.map((acc) => acc.accountBalance);
  const [insufficentBalance, setInsufficientBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Custom hook for transferring money
  const transferMoneyMutation = useTransferMoney();

  const onSubmit = async (data) => {
    console.log(amount, data);
    setIsLoading(true);
    try {
      await transferMoneyMutation.mutateAsync({ accountId, amount });

      setTransactionSuccess(true); // Set success state to true
    } catch (error) {
      if (error.message == "Insufficent balance to transfer") {
        setInsufficientBalance(true);
      }
      // alert(error.message || "An error occurred during money transfer");
    }
    setIsLoading(false);
  };

  console.log(isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  function removeCommas(numberString) {
    return numberString?.replace(/,/g, "");
  }

  function handleClose() {
    closeSendModal();
    setTransactionSuccess(false);
    setInsufficientBalance(false);
    // queryClient.invalidateQueries("customerData");
    queryClient.invalidateQueries("accountData");
    // queryClient.invalidateQueries("transactions");
  }

  function handleClosePaymentModal() {
    closeModal();
    setInsufficientBalance(false);
    clearErrors("password");
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
        {/* Loading logo */}
        {isLoading && (
          <div
            className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden transition-opacity ${
              isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            } bg-[rgba(0,0,0,.486)]`}
          >
            <div className="z-1000 text-blue-500">
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
        )}
        {!transactionSuccess ? (
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Payment</h1>
            <RxCross2
              size={25}
              className="cursor-pointer"
              onClick={() => handleClosePaymentModal()}
            />
          </div>
        ) : (
          <h1 className="text-green-600 text-center text-3xl mt-2">
            Transaction Successful!
          </h1>
        )}
        <h1
          className={`text-center text-3xl mt-2  ${
            insufficentBalance ? "text-red-600" : "text-colorPrimary"
          }`}
        >
          {useFormatBalance(Number(removeCommas(amount)) + 1)}
        </h1>

        <div className="mt-2 px-5">
          {!transactionSuccess && (
            <div className="flex items-center justify-between">
              <p className="text-sm">Fee</p>
              <p>$1</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm">Account Number</p>
            <p>{RecipientAccountNumber}</p>
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
            <h1 className="text-xl text-colorPrimary mb-1">Payment Method</h1>

            <div
              className={`flex items-start justify-between ${
                insufficentBalance ? "text-red-600" : ""
              }`}
            >
              <p>Balance</p>
              <p>{useFormatBalance(accountBalance)}</p>
            </div>

            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div className="flex items-center justify-between">
                <label>Password</label>
                <input
                  type="password"
                  maxLength={4}
                  minLength={4}
                  className={`w-48 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
                    darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
                  } `}
                  {...register("pin", {
                    required: "Enter pin",
                    minLength: {
                      value: 4,
                      message: "Enter 4 digits pin",
                    },
                  })}
                />
              </div>
              {errors?.pin && (
                <span className="text-red-500 text-xs">
                  {errors.pin.message}
                </span>
              )}

              {/* insufficient Balance notification */}
              {insufficentBalance && (
                <p className="text-center text-red-600">Insufficient Balance</p>
              )}

              <button
                className={`h-10 w-full bg-colorPrimary rounded-md ${
                  insufficentBalance ? "" : "mt-5"
                } `}
                disabled={insufficentBalance}
              >
                Confirm Payment
              </button>
            </form>
          </div>
        )}

        {transactionSuccess && (
          <button
            className="h-10 w-full bg-colorPrimary rounded-md mt-5"
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

Tranfers.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  closeSendModal: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired,
};

export default Tranfers;
