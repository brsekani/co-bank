import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react"; // Added useState
import { RxCross2 } from "react-icons/rx";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useForm } from "react-hook-form";

function AirtimeinfoModal({ isOpen, closeModal, formData, closeAirtimeModal }) {
  const darkMode = useSelector((state) => state.darkMode);
  const RecipientPhoneNumberNumber = formData.phoneNumber;
  const RecipientNetWorkProvider = formData.selectedNetwork;
  const Amount = formData.amount;
  const [transactionSuccess, setTransactionSuccess] = useState(false); // State for transaction success

  const onSubmit = (data) => {
    const pin = data.pin;
    console.log(RecipientPhoneNumberNumber, Amount, pin);
    setTransactionSuccess(true); // Set success state to true
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function removeCommas(numberString) {
    return numberString?.replace(/,/g, "");
  }

  function handleClose() {
    closeAirtimeModal();
    setTransactionSuccess(false);
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
        {!transactionSuccess ? (
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Payment</h1>
            <RxCross2
              size={25}
              className="cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>
        ) : (
          <h1 className="text-green-600 text-center text-3xl mt-2">
            Transaction Successful!
          </h1>
        )}
        <h1 className="text-center text-3xl mt-2 text-colorPrimary">
          {useFormatBalance(Number(removeCommas(Amount)))}
        </h1>

        <div className="mt-2 px-5">
          <div className="flex items-center justify-between">
            <p className="text-sm">Account Number</p>
            <p>{RecipientPhoneNumberNumber}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Network</p>
            <p>{RecipientNetWorkProvider}</p>
          </div>
        </div>

        {!transactionSuccess && (
          <div className="mt-3">
            <h1 className="text-xl text-colorPrimary mb-1">Payment Method</h1>

            <div className="flex items-start justify-between">
              <p>Balance</p>
              <p>{useFormatBalance(1000)}</p>
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
              <button className="h-10 w-full bg-colorPrimary rounded-md mt-5">
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
}

AirtimeinfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  closeAirtimeModal: PropTypes.object.isRequired,
};

export default AirtimeinfoModal;
