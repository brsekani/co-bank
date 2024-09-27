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
  account_id,
}) {
  const percentage = completionPercentage(
    goal.target_amount,
    goal.total_amount
  );
  const total_amount = useFormatBalance(goal.total_amount);
  const target_amount = useFormatBalance(goal.target_amount);

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
          <h1 className="text-3xl">{total_amount}</h1>
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
        Target: {target_amount}
      </p>

      {percentage === 100 ? (
        <button
          className="flex items-center justify-center w-full h-12 gap-2 px-2 mt-2 text-lg text-white rounded-md sm:text-2xl stripe-bg"
          onClick={() => {
            const goalData = {
              account_id: account_id,
              id: goal.id,
              name: goal.name,
            };
            console.log(goalData);
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
    total_amount: PropTypes.number.isRequired,
    target_amount: PropTypes.number.isRequired,
    // Add more specific PropTypes as per your goal object structure
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  handleGoalClick: PropTypes.func.isRequired,
  withdrawGoal: PropTypes.func.isRequired,
  account_id: PropTypes.string.isRequired,
};

export default GoalCard;
