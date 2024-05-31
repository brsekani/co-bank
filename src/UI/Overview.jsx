import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";

function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const darkMode = useSelector((state) => state.darkMode);

  // Extract relevant data for the chart
  const { transactionsData, isLoadingTD, isErrorTD } =
    useContext(AccountContext);

  useEffect(() => {
    if (!isLoadingTD && !isErrorTD && transactionsData) {
      const sortedTransactions = transactionsData.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setTransactions(sortedTransactions); // Update transactions state when data is fetched
    }
  }, [isLoadingTD, isErrorTD, transactionsData]);

  useEffect(() => {
    // Update current transactions based on the current page
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    setCurrentTransactions(
      transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    );
  }, [currentPage, transactions]);

  // Prepare data for the chart
  const labels = currentTransactions
    .slice()
    .reverse()
    .map((transaction) => {
      const transactionDate = new Date(transaction.timestamp);
      return transactionDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transaction Amount",
        data: currentTransactions
          .slice()
          .reverse()
          .map((transaction) => transaction.amount),
        backgroundColor: "rgb(0, 163, 255)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Pagination controls
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      className={`w-full row-start-3 row-end-4 col-start-1 col-end-4 md:row-start-2 min-h-[490px] h-full ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      } xl:col-end-3 p-5 rounded-md`}
    >
      <h2 className="mb-3 text-2xl font-medium">Overview</h2>
      <div className="relative w-full h-64 md:h-96">
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === totalPages}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Overview;
