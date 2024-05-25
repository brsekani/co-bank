import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import faceImage from "/public/face image.avif";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";

function TransactionsTable() {
  const darkMode = useSelector((state) => state.darkMode);
  const [transactions, setTransactions] = useState([]);
  const { transactionsData, isLoadingTD, isErrorTD, isLoadingTransactions } =
    useContext(AccountContext);
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoadingTD && !isErrorTD) {
      const sortedTransaction = transactionsData?.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setTransactions(sortedTransaction); // Update transactions state when data is fetched
    }
  }, [isLoadingTD, isErrorTD, transactionsData]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = transactions?.slice(startIndex, endIndex);

  if (isLoadingTransactions) {
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
        className={`w-full ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        } col-start-1 col-end-4 h-fit p-10 rounded-md text-base`}
      >
        <div className="flex items-center justify-between mb-5">
          <h1>Transactions</h1>
          <NavLink to="/Transactions">
            <p>See All</p>
          </NavLink>
        </div>

        <div className="max-w-full overflow-x-auto ">
          <table className="w-full gap-10 text-sm text-left min-w-[600px]">
            <thead>
              <tr className="h-10 mb-32 bg-gray-400">
                <th className="pl-5">Transaction</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody className="h-20">
              {currentTransactions?.map((transaction) => {
                const formattedAmout = useFormatBalance(transaction.amount);

                const dateObject = new Date(transaction.timestamp);
                const date = dateObject; // Date string without the day of the week
                // const time = dateObject.toLocaleTimeString(); // Time string

                const options = {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                };
                const formattedDate = date.toLocaleDateString(
                  undefined,
                  options
                );

                // console.log(formattedDate); // Output: "4/1/2024" (or "01/04/2024" depending on locale)
                // console.log(time); // Output: "8:14:53 AM" (or "08:14:53" depending on locale)

                return (
                  <tr
                    key={transaction.transactionId}
                    className="border-t-[1px] border-white cursor-default hover:bg-gray-300"
                  >
                    <td className="flex items-center gap-2 pl-5 mt-4 mb-4">
                      {!transaction.image ? (
                        <div className="flex items-center justify-center w-12 h-12 text-2xl text-center capitalize bg-blue-300 rounded-md text-colorPrimary ">
                          {transaction.name.charAt(0)}
                        </div>
                      ) : (
                        <img
                          className="object-cover w-12 h-12 rounded-md"
                          src={faceImage}
                          alt="Face Image"
                        />
                      )}

                      <span className="capitalize">{transaction.name}</span>
                    </td>
                    <td>{formattedDate}</td>
                    <td>{formattedAmout}</td>
                    <td>
                      <span
                        className={`${
                          transaction.status === "successfull"
                            ? "bg-green-300 text-green-600"
                            : transaction.status === "pending"
                            ? "bg-yellow-300 text-yellow-600"
                            : "bg-red-300 text-red-600 "
                        } px-3 py-1 rounded-md`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`px-2 py-1 rounded-md border border-colorPrimary`}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {transactions?.length > 11 && (
          <div className="flex justify-between mt-5">
            {currentPage > 1 ? (
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              >
                Previous
              </button>
            ) : (
              <p></p>
            )}

            {endIndex < transactions.length ? (
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              >
                Next
              </button>
            ) : (
              <p></p>
            )}
          </div>
        )}
        {transactions?.length === endIndex && (
          <div className="text-center text-slate-500">
            <p>-- End ---</p>
          </div>
        )}
      </div>
    );
  }
}

export default TransactionsTable;
