import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowSendUI } from "../Features/uiSlice";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { useForm } from "react-hook-form";

function Send() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const sendRef = useRef(null);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankList, setShowBankList] = useState(false);

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
        dispatch(setShowSendUI(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowBankList(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            className="cusuor-pointer"
            onClick={() => dispatch(setShowSendUI(false))}
          />
        </div>

        <div className="flex items-center justify-between text-sm mt-5">
          <p>Select Beneficiaries</p>
          <button className="text-colorPrimary">See All</button>
        </div>

        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex gap-3 flex-col mt-5"
        >
          <div className="flex flex-col">
            <label className="text-xs mb-1">Account Number</label>
            <input
              className={`${
                errors.accountNumber ? "border-red-500" : "border-white/1"
              } h-10 w-full bg-transparent border pl-3`}
              placeholder="Enter 10-digit Account Number"
              maxLength={10}
              type="tel"
              {...register("accountNumber", {
                minLength: 10,
                maxLength: 10,
                required: "Please enter a 10-digit account number",
              })}
            />
            {errors.accountNumber && (
              <span className="text-red-500 text-xs">
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col relative z-10">
            <label className="text-xs mb-1">Bank Name</label>
            <div className="relative">
              <div
                onClick={() => setShowBankList(!showBankList)}
                className="h-10 w-full bg-transparent border border-white/1 text-start pl-3 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {selectedBank && (
                    <img
                      className="h-8 w-8"
                      src={selectedBank.logo}
                      alt={selectedBank.name}
                    />
                  )}
                  <span>
                    {selectedBank ? selectedBank.name : "Select bank"}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {showBankList && (
                <ul
                  className="absolute top-full w-full bg-white shadow-lg rounded-lg overflow-y-auto max-h-48"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: darkMode
                      ? "#3c3f4f #1E1E1E"
                      : "#e4e4e7 #ffffff",
                  }}
                >
                  {banks.map((bank) => (
                    <li
                      key={bank.id}
                      className={`${
                        darkMode
                          ? "bg-[#1E1E1E] text-white"
                          : "bg-white text-black"
                      } h-12 border border-[#fff]/1 flex items-center gap-3 px-3 cursor-pointer`}
                      onClick={() => handleBankSelect(bank)}
                    >
                      <img
                        className="h-8 w-8"
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

          <div className="flex flex-col relative">
            <label className="text-xs mb-1">Amount</label>
            <input
              className="h-10 w-full bg-transparent border border-white/1 pl-7"
              placeholder="Enter Amount"
              maxLength={10}
              type="tel"
            />
            <PiCurrencyDollarSimpleBold
              color="GhostSmoke"
              size={25}
              className="absolute top-7 left-1"
            />
          </div>

          <button className="h-10 w-full bg-colorPrimary">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Send;
