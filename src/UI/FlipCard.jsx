import { useContext, useState } from "react";
import { BsSquareHalf } from "react-icons/bs";
import useFormatBalance from "../Hooks/useFormatBalance";
import useFormatCreditCardNumber from "../Hooks/useFormatCreditCardNumber";
import { RiVisaLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
// import "./FlipCard.css"; // Assuming you have a CSS file for styling

function FlipCard() {
  const [showBalance, setShowBalance] = useState(false);
  const [showCreditCardNumber, setShowCreditCardNumber] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);

  const { accountData, customerData } = useContext(AccountContext);

  const creditCardBalance = accountData?.map(
    (account) => account.creditCardBalance
  );

  const creditCardNumber = accountData?.map(
    (account) => account.creditCardNumber
  );

  const cvv = accountData?.map((account) => account.cvv);

  const creditCardExpireDate = accountData?.map(
    (account) => account.creditCardExpireDate
  );

  const fullName = customerData.map((customer) => {
    const capitalizeLastName =
      customer.lastName.charAt(0).toUpperCase(1) +
      customer.lastName.slice(1).toLowerCase();
    const capitalizeFirst =
      customer.firstName.charAt(0).toUpperCase(1) +
      customer.firstName.slice(1).toLowerCase();
    return `${capitalizeLastName} ${capitalizeFirst}`;
  });

  function toggleShowbalance() {
    setShowBalance((showBalance) => !showBalance);
  }

  function toggleShowCreditCardNumber() {
    setShowCreditCardNumber((showCreditCardNumber) => !showCreditCardNumber);
  }

  function handleFlipCard() {
    setShowBack((showBack) => !showBack);
  }

  return (
    <div
      className={`w-full font-rob ${darkMode ? "bg-[#1E1E1E]" : "bg-white"}  ${
        darkMode ? "text-white" : "text-black"
      }  col-start-1 col-end-4 md:col-start-2 md:col-end-4 xl:col-end-3 min-h-[195px] max-h-[250px] rounded-md p-5`}
    >
      <div className={`flip-card ${showBack ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div
            className={`flip-card-front ${
              darkMode ? "bg-[#1E1E1E]" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                className={`flex items-center gap-2 p-2 border ${
                  darkMode ? "border-white" : "border-black"
                } rounded-md hover:bg-colorPrimary`}
                onClick={handleFlipCard}
              >
                <BsSquareHalf size={13} />
                <span className="text-[10px]">Flip Card</span>
              </button>
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 101 101"
                  className="w-7 h-7"
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
                <p className={`text-lg`}>Co-Bank</p>
              </div>
            </div>

            <p className="text-[12px] mt-2">Balance</p>

            <div className="flex items-center gap-6">
              <h1
                className={`text-2xl font-bold ${
                  !showBalance ? "" : "blur-sm"
                }`}
              >
                {useFormatBalance(creditCardBalance)}
              </h1>
              <button onClick={toggleShowbalance} className="pt-1">
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

            <div className="flex items-center justify-between mt-5">
              <h1
                className={`flex items-center gap-3 text-lg font-medium ${
                  !showCreditCardNumber ? "" : "blur-sm"
                }`}
              >
                {useFormatCreditCardNumber(creditCardNumber).map((num, i) => (
                  <span key={i}>{num}</span>
                ))}
              </h1>
              <button onClick={toggleShowCreditCardNumber} className="pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 text-textColor ${
                    showCreditCardNumber === true ? "hidden" : "flex"
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
                    showCreditCardNumber === true ? "flex" : "hidden"
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
              <h1 className="text-base font-medium">{fullName}</h1>
              <div>
                <p className="text-[10px]">Expires</p>
                <h1 className="font-medium">{creditCardExpireDate}</h1>
              </div>
              <RiVisaLine size={55} />
            </div>
          </div>
          <div className="relative flip-card-back">
            <div className="flex items-center justify-between">
              <button
                className={`flex items-center gap-2 p-2 border ${
                  darkMode ? "border-white" : "border-black"
                } rounded-md hover:bg-colorPrimary text-[11px]`}
              >
                More Details
              </button>
              <button
                className={`flex items-center gap-2 p-2 border ${
                  darkMode ? "border-white" : "border-black"
                } rounded-md hover:bg-colorPrimary`}
                onClick={handleFlipCard}
              >
                <BsSquareHalf size={13} />
                <span className="text-[10px]">Flip Card</span>
              </button>
            </div>

            <div
              className={`absolute inset-0 h-8 ${
                darkMode ? "bg-white" : "bg-black"
              } top-16`}
              style={{ marginLeft: "-20px", marginRight: "-20px" }}
            ></div>

            <p className="mt-24 text-sm">Authorize Signature</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-full h-8 ${darkMode ? "bg-white" : "bg-black"}`}
              ></div>
              <p className="pr-10">{cvv}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
