import { GoGoal } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { completionPercentage } from "../utility/utilityFunction";
import { IoMdAddCircleOutline } from "react-icons/io";
import { setShowAddNewGoal, setShowDepositToGoal } from "../Features/uiSlice";
import DepositToGoalModal from "../Modals/DepositToGoalModal";
import { IoAdd } from "react-icons/io5";
import useGoals from "../Hooks/useGoals";

function Goals() {
  const {
    darkMode,
    setSearchGoals,
    searchedGoals,
    filteredGoals,
    handleGoalClick,
    showDepositToGoal,
    selectedGoal,
    dispatch,
  } = useGoals();

  return (
    <div
      className={`flex flex-col gap-5 p-5 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All Goals</h1>
        <input
          className="w-[193px] h-[28px] bg-transparent border border-[#6b7280] px-2 "
          type="text"
          placeholder="Search Goals"
          onChange={(e) => setSearchGoals(e.target.value)}
          value={searchedGoals}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredGoals?.map((goal, i) => {
          const percentage = completionPercentage(
            goal.targetAmount,
            goal.totalAmount
          );
          const totalAmount = useFormatBalance(goal.totalAmount);
          const targetAmount = useFormatBalance(goal.targetAmount);

          return (
            <div
              key={i}
              className={`min-h-[216px] max-h-[240px] w-full p-5 rounded-md ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center bg-colorPrimary/10 w-[44px] h-[44px] rounded-md">
                    <GoGoal size={20} />
                  </div>
                  <p className="text-3xl font-medium capitalize">{goal.name}</p>
                </div>
                {percentage < 100 && (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-colorPrimary/10"
                    onClick={() => handleGoalClick(goal)}
                  >
                    <IoAdd size={25} />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl">{totalAmount}</h1>
                  <span
                    className={`px-2 py-1 text-[12px] font-medium rounded-xl ${
                      percentage > 66
                        ? "bg-green-600"
                        : percentage > 33
                        ? "bg-yellow-400"
                        : "bg-red-600"
                    }`}
                  >
                    {percentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              <p className="flex items-center gap-1 mt-3 text-sm">
                Target: {targetAmount}
              </p>

              {percentage === 100 ? (
                <button className="flex items-center justify-center w-full h-12 gap-2 px-2 mt-2 text-lg text-white rounded-md sm:text-2xl stripe-bg">
                  Cash out
                </button>
              ) : (
                <div className="w-full h-12 bg-[rgb(161,161,161)] rounded-md mt-3">
                  <div
                    className="h-12 rounded-md stripe-bg"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}

        <div
          className={`min-h-[216px] max-h-fit bg-gray-800 w-full p-5 rounded-md  ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-start gap-3 mb-2">
            <div className="flex items-center justify-center bg-colorPrimary/10 w-[44px] h-[44px] rounded-md">
              <GoGoal size={20} />
            </div>
            <p className="text-3xl font-medium">Add New Goal</p>
          </div>

          <p>
            Ready to take control of your financial future? Set clear targets
            for your savings, goals, and more with our streamlined banking
            tools. Start planning smarter today!
          </p>

          <button
            className="w-[140x] h-10 flex items-center justify-center gap-2 px-2 rounded-md bg-colorPrimary text-white mt-2"
            onClick={() => dispatch(setShowAddNewGoal(true))}
          >
            <IoMdAddCircleOutline size={30} color="white" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {showDepositToGoal && selectedGoal && (
        <DepositToGoalModal
          isOpen={showDepositToGoal}
          onClose={() => dispatch(setShowDepositToGoal(false))}
          goal={selectedGoal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default Goals;
