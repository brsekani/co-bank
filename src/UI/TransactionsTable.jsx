import { useState } from "react";
import { NavLink } from "react-router-dom";
import faceImage from "/public/face image.avif";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";
import useFormatBalance from "../Hooks/useFormatBalance";

function TransactionsTable() {
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  // Generate random transactions
  const transactions = useRandomDataGenerator();

  // Get the current page's transactions
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-[#1E1E1E] col-start-1 col-end-4 h-fit p-10 rounded-md overflow-x-auto text-base font-bold">
      <div className="flex items-center justify-between mb-5">
        <h1>Transactions</h1>
        <NavLink to="/Transactions">
          <p>See All</p>
        </NavLink>
      </div>

      <table className="w-full gap-10 text-sm text-left">
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
          {currentTransactions.map((transaction) => {
            const formattedAmout = useFormatBalance(transaction.amount);

            return (
              <tr
                key={transaction.id}
                className="border-t-[1px] border-white cursor-default hover:bg-gray-300"
              >
                <td className="flex items-center gap-2 pl-5 mt-4 mb-4">
                  {!transaction.image ? (
                    <div className="flex items-center justify-center w-12 h-12 text-2xl text-center text-blue-600 bg-blue-300 rounded-md">
                      {transaction.name.charAt(0)}
                    </div>
                  ) : (
                    <img
                      className="object-cover w-12 h-12 rounded-md"
                      src={faceImage}
                      alt="Face Image"
                    />
                  )}

                  <span>{transaction.name}</span>
                </td>
                <td>{transaction.date}</td>
                <td>{formattedAmout}</td>
                <td>
                  <span
                    className={`${
                      transaction.status === "Success"
                        ? "bg-green-300 text-green-600"
                        : transaction.status === "Pending"
                        ? "bg-yellow-300 text-yellow-600"
                        : "bg-red-300 text-red-600 "
                    } px-3 py-1 rounded-md`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-md border border-white`}>
                    {transaction.details}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {transactions.length > 11 && (
        <div className="flex justify-between mt-5">
          {currentPage > 1 ? (
            <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>
              Previous
            </button>
          ) : (
            <p></p>
          )}

          {endIndex < transactions.length ? (
            <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
              Next
            </button>
          ) : (
            <p></p>
          )}
        </div>
      )}
      {transactions.length === endIndex && (
        <div className="text-center text-slate-500">
          <p>-- End ---</p>
        </div>
      )}
    </div>
  );
}

export default TransactionsTable;
