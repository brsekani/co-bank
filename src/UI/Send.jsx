import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowSendUI } from "../Features/uiSlice";

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
  }, []);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowBankList(false);
  };

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
      <div
        ref={sendRef}
        className={`flex item-center justify-center flex-col p-5 rounded-lg font-rob w-[450px] h-fit ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Transfer</h1>
          <RxCross2 size={30} onClick={() => dispatch(setShowSendUI(false))} />
        </div>

        <div className="flex items-center justify-between text-sm mt-5">
          <p>Select Beneficiaries</p>
          <button className="text-colorPrimary">See All</button>
        </div>

        <form className="flex gap-3 flex-col mt-5">
          <div className="flex flex-col">
            <label className="text-xs mb-1">Account Number</label>
            <input
              className="h-10 w-full bg-transparent border border-white/1 pl-3"
              placeholder="Enter 10-digit Account Number"
              maxLength={10}
              type="tel"
            />
          </div>

          <div className="flex flex-col relative">
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
          <button className="h-10 w-full bg-colorPrimary">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Send;
