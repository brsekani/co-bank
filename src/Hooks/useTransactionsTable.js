import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import { useLocation } from "react-router-dom";

const useTransactionsTable = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { transactionsData, isLoadingTD, isErrorTD, isLoadingTransactions } =
    useContext(AccountContext);
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  const url = useLocation().pathname;
  console.log(url);

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

  const handleDetailsClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return {
    darkMode,
    isLoadingTransactions,
    currentTransactions,
    handleDetailsClick,
    transactions,
    url,
    currentPage,
    setCurrentPage,
    endIndex,
    selectedTransaction,
    setSelectedTransaction,
  };
};

export default useTransactionsTable;
