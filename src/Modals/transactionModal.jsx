import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useFormatBalance from "../Hooks/useFormatBalance";
import useTransactionsTable from "../Hooks/useTransactionsTable";
import html2canvas from "html2canvas";

const TransactionModal = ({ transaction, onClose }) => {
  const [downloadingIMG, setDownloadingIMG] = useState(false);
  const TransactionModalRef = useRef();
  const { selectedTransaction, setSelectedTransaction } =
    useTransactionsTable();
  const darkMode = useSelector((state) => state.darkMode);

  const {
    transaction_id,
    recipient_name,
    amount,
    transaction_status,
    created_at,
  } = transaction;

  const formattedAmout = useFormatBalance(amount);
  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = new Date(created_at).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [showFullId, setShowFullId] = useState(false);

  const handleToggleFullId = () => {
    setShowFullId((prev) => !prev);
  };

  const handlePrintReceipt = async () => {
    try {
      setDownloadingIMG(true);

      // Short delay to allow the state change to render (optional, if needed)
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(TransactionModalRef.current, {
        backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Transaction Receipt of ${transaction_id}.png`;
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setDownloadingIMG(false);
    }
  };

  const truncatedtransaction_id = transaction_id.slice(0, 10) + "...";
  const fullIdContent = <p className="font-medium">{transaction_id}</p>;

  useEffect(() => {
    const handlePopState = () => {
      setSelectedTransaction(false);
    };

    if (selectedTransaction) {
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedTransaction, setSelectedTransaction]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black bg-opacity-50">
      <div
        className={`w-full max-w-md rounded-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="p-5" ref={TransactionModalRef}>
          <div className="flex flex-col items-center justify-center pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 101 101"
              className={`w-8 h-8 ${!downloadingIMG && "spin-animation"}`}
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
            <h1 className="mt-3 text-4xl font-bold">{formattedAmout}</h1>
            <h1 className="mt-3 text-lg font-medium text-[#4CAF50]">
              {`Payments ${transaction_status}`}
            </h1>
          </div>
          <hr className="mt-3 mb-3" />
          <div className="flex flex-col gap-3">
            <div
              className="flex justify-between cursor-pointer"
              onClick={handleToggleFullId}
            >
              <p className="text-gray-600">Transaction ID</p>
              {showFullId ? (
                fullIdContent
              ) : (
                <p className="font-medium">{truncatedtransaction_id}</p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{recipient_name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Amount</p>
              <p className="font-medium">{formattedAmout}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">transaction_status</p>
              <p className="font-medium">{transaction_status}</p>
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
        </div>
        <div className="flex items-center justify-between px-5 pb-5 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={downloadingIMG}
          >
            Close
          </button>
          <button
            onClick={handlePrintReceipt}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={downloadingIMG}
          >
            {downloadingIMG ? "Downloading..." : "Get Image Receipt"}
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
