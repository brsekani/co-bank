import { GoArrowUpRight } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useSelector } from "react-redux";

function Expenses() {
  const totalExpenses = 1200;
  const targetExpenses = 1500;
  const completionPercentage = (totalExpenses / targetExpenses) * 100;

  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`w-full min-h-[195px] max-h-[250px] col-start-1 col-end-4 md:col-start-2 md:cols-end-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } xl:row-start-2 xl:col-start-3 p-5 rounded-md font-rob cursor-default`}
    >
      <p className="text-lg font-light">Expenses</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">{useFormatBalance(totalExpenses)}</h1>
          <span
            className={`px-2 py-1 text-[12px] font-medium ${
              completionPercentage > 66
                ? "bg-red-600"
                : completionPercentage > 33
                ? "bg-yellow-600"
                : "bg-green-600"
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
        <span className="text-colorPrimary">Max:</span>
        <span>{useFormatBalance(targetExpenses)}</span>
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

export default Expenses;
