import { GoArrowUpRight } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AccountContext } from "../Context/AccountContext";

function Savings() {
  const { accountData } = useContext(AccountContext);
  const savingsBalance = accountData?.at(0).savingsBalance;

  const totalSavings = savingsBalance;
  const targetSavings = 10000;
  const completionPercentage = (totalSavings / targetSavings) * 100;

  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`w-full min-h-[195px] max-h-[250px] col-start-1 col-end-4 md:col-start-1 md:col-end-2 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } xl:row-start-3 xl:col-start-3 xl:col-end-4 p-5 rounded-md font-rob cursor-default`}
    >
      <p className="text-lg font-light">Savings</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">{useFormatBalance(totalSavings)}</h1>
          <span
            className={`px-2 py-1 text-[12px] font-medium ${
              completionPercentage > 66
                ? "bg-green-600"
                : completionPercentage > 33
                ? "bg-yellow-600"
                : "bg-red-600"
            }  rounded-xl`}
          >
            {completionPercentage.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-center w-10 h-10 -mt-10 rounded-full bg-[#a1a1a1]">
          <GoArrowUpRight size={20} />
        </div>
      </div>

      <p className="flex items-center gap-1 mt-10 text-sm">
        Goal:<span>${useFormatBalance(targetSavings)}</span>
      </p>

      <div className="w-full h-12 bg-[rgb(161,161,161)] rounded-md mt-3">
        <div
          className="h-12 rounded-md stripe-bg"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Savings;
