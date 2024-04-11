import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";

function OverviewCard() {
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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-[490px] max-h-[660px] w-full bg-[#1E1E1E] row-start-4 col-start-1 col-end-3 xl:row-start-2 md:row-start-3 md:col-start-1 md:col-end-3 lg:row-start-3 p-5 rounded-md">
      <h2 className="mb-3 text-3xl font-semibold">Overview</h2>
      <Bar data={data} />
    </div>
  );
}

export default OverviewCard;
