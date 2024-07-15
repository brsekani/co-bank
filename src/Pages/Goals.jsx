import { GoGoal } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import { completionPercentage } from "../utility/utilityFunction";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAddCircleOutline } from "react-icons/io";
import { setShowAddNewGoal, setShowDepositToGoal } from "../Features/uiSlice";
import { useContext, useState } from "react";
import DepositToGoalModal from "../Modals/DepositToGoalModal";
import { IoAdd } from "react-icons/io5";
import { AccountContext } from "../Context/AccountContext";

function Goals() {
  const darkMode = useSelector((state) => state.darkMode);
  const { showDepositToGoal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [searchedGoals, setSearchGoals] = useState("");
  const { goalsData } = useContext(AccountContext);

  const arrangedGoalsByDataCreated = goalsData?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const filteredGoals = arrangedGoalsByDataCreated?.filter((goal) =>
    goal.name.toLowerCase().includes(searchedGoals.toLowerCase())
  );

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    dispatch(setShowDepositToGoal(true));
  };

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
          const Percentage = completionPercentage(
            goal.targetAmount,
            goal.totalAmount
          );
          {
            console.log(goal.targetAmount, goal.totalAmount);
          }
          return (
            <div
              key={i}
              className={`min-h-[216px] max-h-[240px] bg-gray-800 w-full p-5 rounded-md ${
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
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-colorPrimary/10"
                  onClick={() => handleGoalClick(goal)}
                >
                  <IoAdd size={25} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl">
                    {useFormatBalance(goal.totalAmount)}
                  </h1>
                  <span
                    className={`px-2 py-1 text-[12px] font-medium ${
                      Percentage > 66
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

              <p className="flex items-center gap-1 mt-3 text-sm">
                Target:{useFormatBalance(goal.targetAmount)}
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
