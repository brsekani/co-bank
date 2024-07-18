import PropTypes from "prop-types";
import { GoGoal } from "react-icons/go";
import { completionPercentage } from "../utility/utilityFunction";
import useFormatBalance from "../Hooks/useFormatBalance";
import { IoAdd } from "react-icons/io5";

function GoalCard({
  goal,
  darkMode,
  handleGoalClick,
  withdrawGoal,
  accountId,
}) {
  const percentage = completionPercentage(goal.targetAmount, goal.totalAmount);
  const totalAmount = useFormatBalance(goal.totalAmount);
  const targetAmount = useFormatBalance(goal.targetAmount);

  return (
    <div
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
        <button
          className="flex items-center justify-center w-full h-12 gap-2 px-2 mt-2 text-lg text-white rounded-md sm:text-2xl stripe-bg"
          onClick={() => {
            const goalData = {
              accountId: accountId,
              id: goal.id,
              name: goal.name,
            };
            withdrawGoal(goalData);
          }}
        >
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
}

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    targetAmount: PropTypes.number.isRequired,
    // Add more specific PropTypes as per your goal object structure
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  handleGoalClick: PropTypes.func.isRequired,
  withdrawGoal: PropTypes.func.isRequired,
  accountId: PropTypes.string.isRequired,
};

export default GoalCard;
