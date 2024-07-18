import { GoGoal } from "react-icons/go";
import useFormatBalance from "../Hooks/useFormatBalance";
import {
  accountIdInfo,
  completionPercentage,
} from "../utility/utilityFunction";
import { IoMdAddCircleOutline } from "react-icons/io";
import { setShowAddNewGoal, setShowDepositToGoal } from "../Features/uiSlice";
import DepositToGoalModal from "../Modals/DepositToGoalModal";
import { IoAdd } from "react-icons/io5";
import useGoals from "../Hooks/useGoals";
import { useWithdrawFromGoal } from "../services/addGoalApi";
import GoalCard from "../Components/GoalCard";

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
    accountId,
    isLoadingGoals,
  } = useGoals();
  const { withdrawGoal, isWithdrawing, withdrawGoalError } =
    useWithdrawFromGoal();

  if (isWithdrawing || isLoadingGoals) {
    return (
      <div
        className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 101 101"
          className="w-8 h-8 spin-animation"
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
      </div>
    );
  } else {
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
          {filteredGoals?.map((goal, i) => (
            <GoalCard
              key={i}
              goal={goal}
              darkMode={darkMode}
              handleGoalClick={handleGoalClick}
              withdrawGoal={withdrawGoal}
              accountId={accountId}
            />
          ))}

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
}

export default Goals;
