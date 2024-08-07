import { Bar } from "react-chartjs-2";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";
import { useSelector } from "react-redux";

function OverviewCard() {
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`min-h-[490px] max-h-[660px] w-full bg-gray-800 row-start-4 col-start-1 col-end-3 xl:row-start-2 md:row-start-3 md:col-start-1 md:col-end-3 lg:row-start-3 p-5 rounded-md overflow-x-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="mb-3 text-2xl font-meduim">Overview</h2>
      <div style={{ minWidth: "700px", maxWidth: "100%" }}>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default OverviewCard;
