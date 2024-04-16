import { GoArrowUpRight } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useSelector } from "react-redux";

function Income() {
  const totalIncome = 18000;
  const targetIncome = 20000;
  const completionPercentage = (totalIncome / targetIncome) * 100;

  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`w-full min-h-[195px] max-h-[250px] col-start-1 col-end-4 md:col-start-1 md:col-end-2 ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      }  xl:row-start-1 xl:col-start-3 xl:col-end-4 rounded-md p-5 font-rob cursor-default`}
    >
      <p className="text-lg font-light">Income</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">{useFormatBalance(totalIncome)}</h1>
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
        <span className="text-colorPrimary">Target:</span>
        <span>{useFormatBalance(targetIncome)}</span>
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

export default Income;
