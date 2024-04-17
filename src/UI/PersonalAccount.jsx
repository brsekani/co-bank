import { useState } from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaArrowDownLong, FaFileInvoiceDollar, FaPlus } from "react-icons/fa6";
import { FiRotateCw, FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setShowSendUI } from "../Features/uiSlice";

function PersonalAccount() {
  const [showBalance, setShowBalance] = useState(false);

  const darkMode = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();
  function toggleShowbalance() {
    setShowBalance((showBalance) => !showBalance);
  }

  const buttons = [
    {
      icon: <FiSend size={20} />,
      text: "Send",
      onClick: () => dispatch(setShowSendUI(true)), // Wrap dispatch in an arrow function
    },
    { icon: <FaArrowDownLong size={20} />, text: "Receive" },
    { icon: <FaPhoneSquareAlt size={20} />, text: "Airtime" },
    { icon: <FaFileInvoiceDollar size={20} />, text: "Airtime" },
  ];

  return (
    <div
      className={`w-full min-h-[195px] max-h-[250px] col-start-1 col-end-4 md:col-start-1 md:col-end-2  bg-[#1E1E1E] p-5 rounded-md ${
        darkMode ? "bg-[#1E1E1E]" : "bg-white"
      } ${darkMode ? "text-white shadow-md" : "text-black"} font-rob`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-xs ${darkMode ? "text-white" : "text-black"}`}>
          Personal Account
        </p>
        <button
          className={`flex items-center gap-2 p-2 border ${
            darkMode ? "border-white" : "border-black"
          } rounded-md hover:bg-colorPrimary`}
        >
          <FaPlus size={12} />
          <span className="text-xs">Add Card</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h1 className={`text-2xl font-medium ${!showBalance ? "" : "blur-sm"}`}>
          $<span>0.00</span>
        </h1>
        <button onClick={toggleShowbalance}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-6 h-6 text-textColor ${
              showBalance === true ? "hidden" : "flex"
            }`}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 13c3.6-8 14.4-8 18 0"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-6 h-6 text-textColor ${
              showBalance === true ? "flex" : "hidden"
            }`}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m19.5 16-2.475-3.396M12 17.5V14m-7.5 2 2.469-3.388M3 8c3.6 8 14.4 8 18 0"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mt-3">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center"
            onClick={button.onClick}
          >
            <span
              className={`items-center p-3  ${
                darkMode ? "bg-colorPrimary" : "bg-[#ececec]"
              } rounded-full`}
            >
              {button.icon}
            </span>
            <span>{button.text}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-7">
        <p className="text-xs">
          Last Updated: <span>Just one</span>
        </p>
        <FiRotateCw size={15} />
      </div>
    </div>
  );
}

export default PersonalAccount;
