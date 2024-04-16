import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";
import { useSelector } from "react-redux";

function Overview() {
  const darkMode = useSelector((state) => state.darkMode);

  // Extract relevant data for the chart
  const transactions = useRandomDataGenerator();
  const transactionData = {};

  // Calculate total amount for each month
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthYear = transactionDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
    });
    if (!transactionData[monthYear]) {
      transactionData[monthYear] = 0;
    }
    transactionData[monthYear] += transaction.amount;
  });

  // Prepare data for the chart
  const data = {
    labels: Object.keys(transactionData),
    datasets: [
      {
        label: "Total Transaction Amount",
        data: Object.values(transactionData),
        backgroundColor: "rgb(0, 163, 255)",
        // borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`w-full row-start-3 row-end-4 col-start-1 col-end-4 md:row-start-2 ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      } xl:col-end-3 p-5 rounded-md`}
    >
      <h2 className="mb-3 text-2xl font-meduim">Overview</h2>
      <Bar data={data} />
    </div>
  );
}

export default Overview;
