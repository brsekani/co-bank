import { GoArrowUpRight, GoGoal } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { completionPercentage } from "../utility/utilityFunction";

function Goals() {
  const goals = [
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
    {
      Name: "Savings",
      TargetAmount: 1000,
      totalAmount: 100,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Goals</h1>
        <input
          className="w-[193px] h-[28px] bg-transparent border border-[#6b7280] px-2 "
          type="text"
          placeholder="Search Goals"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal, i) => {
          const Percentage = completionPercentage(
            goal.TargetAmount,
            goal.totalAmount
          );
          return (
            <div
              key={i}
              className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] w-full p-5 rounded-md"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-start gap-3">
                  <GoGoal size={40} />
                  <p className="text-3xl font-medium">{goal.Name}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#a1a1a1]">
                  <GoArrowUpRight size={20} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl">
                    <span>$</span>
                    {useFormatBalance(goal.totalAmount)}
                  </h1>
                  <span
                    className={`px-2 py-1 text-[12px] font-medium ${
                      completionPercentage > 66
                        ? "bg-green-600"
                        : completionPercentage > 33
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }  rounded-xl`}
                  >
                    {Percentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              <p className="flex items-center gap-1 mt-10 text-sm">
                Target:<span>${useFormatBalance(goal.TargetAmount)}</span>
              </p>

              <div className="w-full h-12 bg-[rgb(161,161,161)] rounded-md mt-3">
                <div
                  className="h-12 rounded-md stripe-bg"
                  style={{ width: `${Percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Goals;
