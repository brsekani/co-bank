import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import useFormatBalance from "../Hooks/useFormatBalance";

const TransactionModal = ({ transaction, onClose }) => {
  const { transactionId, name, amount, status, timestamp } = transaction;
  const darkMode = useSelector((state) => state.darkMode);

  const formattedAmout = useFormatBalance(amount);
  const formattedDate = new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handlePrintReceipt = () => {
    // Logic to generate PDF receipt
    console.log("Generating PDF Receipt...");
  };

  const truncateTransactionId = (id, maxLength = 10) => {
    return id.length > maxLength ? `${id.slice(0, maxLength)}...` : id;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black bg-opacity-50">
      <div
        className={`w-full max-w-md p-5 rounded-md ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <GrStatusGood size={55} color=" #4CAF50" />
          <h1 className="mt-3 text-2xl font-bold">Payments Success</h1>
          {/* <p className="text-2xl font-bold">{formattedAmout}</p> */}
        </div>
        <hr className="mt-3 mb-3" />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-gray-600">Transaction ID</p>
            <p className="font-medium">
              {truncateTransactionId(transactionId)}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Amount</p>
            <p className="font-medium">{formattedAmout}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Status</p>
            <p className="font-medium">{status}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Date</p>
            <p className="font-medium">{formattedDate}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Time</p>
            <p className="font-medium">{formattedTime}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
          <button
            onClick={handlePrintReceipt}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Get PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

TransactionModal.propTypes = {
  transaction: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionModal;
