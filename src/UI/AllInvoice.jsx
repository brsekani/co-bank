import { useState } from "react";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";
import useFormatBalance from "../Hooks/useFormatBalance";

function AllInvoice() {
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  // Generate random transactions
  const transactions = useRandomDataGenerator();

  // Get the current page's transactions
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="xl:row-start-1 xl:col-start-1 xl:col-end-3 bg-[#1E1E1E] p-5 rounded-md">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="text-3xl font-semibold ">All Invoice</h1>
        <button className="px-5 py-2 text-lg font-semibold bg-blue-600 rounded-md">
          + Add Invoice
        </button>
      </div>

      <table className="w-full gap-10 mt-10 text-sm text-left">
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

export default AllInvoice;
