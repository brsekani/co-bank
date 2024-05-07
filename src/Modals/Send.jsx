import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowSendUI } from "../Features/uiSlice";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import InfoModal from "./SendInfoModal";

function Send() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const sendRef = useRef(null);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankList, setShowBankList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormatData] = useState({});

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://nigerianbanks.xyz");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sendRef.current && !sendRef.current.contains(event.target)) {
        if (!showModal) {
          dispatch(setShowSendUI(false));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, showModal]);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setValue("bankName", bank.name); // Update the form data with the selected bank name
    setShowBankList(false);
    clearErrors("bankName");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    setFormatData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setShowSendUI(true));
  };

  const closeSendModal = () => {
    dispatch(setShowSendUI(false));
  };

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
      <div
        ref={sendRef}
        className={`flex item-center md:justify-center flex-col p-5 rounded-lg font-rob w-full h-full md:w-[450px] md:h-fit ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Transfer</h1>
          <RxCross2
            size={30}
            className="cursor-pointer"
            onClick={() => dispatch(setShowSendUI(false))}
          />
        </div>

        <div className="flex items-center justify-between mt-5 text-sm">
          <p>Select Beneficiaries</p>
          <button className="text-colorPrimary">See All</button>
        </div>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-3 mt-5"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-xs">Account Number</label>
            <input
              className={`${
                errors.accountNumber ? "border-red-500" : "border-white/1"
              } h-10 w-full bg-transparent border pl-3`}
              placeholder="Enter 10-digit Account Number"
              maxLength={10}
              type="tel"
              {...register("accountNumber", {
                required: "Please enter a 10-digit account number",
                minLength: {
                  value: 10,
                  message: "Please enter a 10-digit account number",
                },
                maxLength: {
                  value: 10,
                  message: "Please enter a 10-digit account number",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit account number",
                },
              })}
            />
            {errors.accountNumber && (
              <span className="text-xs text-red-500">
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          <div className="relative z-10 flex flex-col ">
            <label className="mb-1 text-xs">Bank Name</label>
            <div className="relative ">
              <div
                onClick={() => setShowBankList(!showBankList)}
                className="flex items-center justify-between w-full h-10 pl-3 bg-transparent border cursor-pointer border-white/1 text-start"
              >
                <div className="flex items-center gap-2">
                  {selectedBank && (
                    <img
                      className="w-8 h-8"
                      src={selectedBank.logo}
                      alt={selectedBank.name}
                    />
                  )}
                  {selectedBank ? (
                    <input
                      className="w-full h-10 pl-3 bg-transparent border-none cursor-pointer"
                      type="text"
                      value={selectedBank.name}
                      readOnly
                      {...register("bankName", {
                        required: "Please select a bank",
                      })}
                    />
                  ) : (
                    <input
                      className="w-full h-10 pl-3 bg-transparent border-none cursor-pointer"
                      type="text"
                      placeholder="Select bank"
                      readOnly
                      {...register("bankName", {
                        required: "Please select a bank",
                      })}
                    />
                  )}
                </div>
              </div>
              {errors.bankName && (
                <span className="text-xs text-red-500">
                  {errors.bankName.message}
                </span>
              )}
              {showBankList && (
                <ul
                  className="absolute w-full overflow-y-auto bg-white rounded-lg shadow-lg top-full max-h-48"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: darkMode
                      ? "#3c3f4f #1E1E1E"
                      : "#e4e4e7 #ffffff",
                  }}
                >
                  {banks.map((bank, i) => (
                    <li
                      key={i}
                      className={`${
                        darkMode
                          ? "bg-[#1E1E1E] text-white"
                          : "bg-white text-black"
                      } h-12 border border-[#fff]/1 flex items-center gap-3 px-3 cursor-pointer`}
                      onClick={() => handleBankSelect(bank)}
                    >
                      <img
                        className="w-8 h-8"
                        src={bank.logo}
                        alt={bank.name}
                      />
                      <span>{bank.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="relative flex flex-col">
            <label className="mb-1 text-xs">Amount</label>
            <input
              className="w-full h-10 bg-transparent border border-white/1 pl-7"
              placeholder="Enter Amount"
              type="text" // Change type to text for formatting
              {...register("amount", {
                required: "Enter an amount",
                validate: (value) => {
                  const amount = parseFloat(value.replace(/,/g, ""));
                  if (isNaN(amount)) return "Invalid amount";
                  if (amount < 10) return "Amount must be at least $10";
                  return true;
                },
              })}
              onChange={(e) => {
                const formattedAmount = e.target.value
                  .replace(/[^\d]/g, "") // Remove non-digit characters
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands
                setValue("Amount", formattedAmount);
              }}
            />

            <PiCurrencyDollarSimpleBold
              color="GhostSmoke"
              size={25}
              className="absolute top-7 left-1"
            />
            {errors.Amount && (
              <span className="text-xs text-red-500">
                {errors.Amount.message}
              </span>
            )}
          </div>

          <button className="w-full h-10 rounded-md bg-colorPrimary">
            Confrim
          </button>
        </form>
      </div>
      <InfoModal
        isOpen={showModal}
        closeModal={closeModal}
        formData={formData}
        bank={selectedBank}
        closeSendModal={closeSendModal}
      />
    </div>
  );
}

export default Send;
