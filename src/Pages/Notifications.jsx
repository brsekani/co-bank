// components/Notifications.js
import { useSelector } from "react-redux";
import useFormatBalance from "../Hooks/useFormatBalance";
import faceImage from "/public/face image.avif";
import { AccountContext } from "../Context/AccountContext";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";

function Notifications() {
  const darkMode = useSelector((state) => state.darkMode);
  const { transactionsData, isLoadingTransactions, isErrorTD } =
    useContext(AccountContext);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const loader = useRef(null);
  const itemsPerPage = 10;

  // loading the data if page or transactionsData changes
  useEffect(() => {
    const loadTransactions = () => {
      const newTransactions = transactionsData?.slice(0, page * itemsPerPage);
      setDisplayedTransactions(newTransactions);
    };
    loadTransactions();
  }, [page, transactionsData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        console.log(entries.at(0).isIntersecting);
        if (
          entries[0].isIntersecting &&
          page * itemsPerPage < transactionsData.length
        ) {
          setLoadingMore(true);
          await new Promise((resolve) => setTimeout(resolve, 500)); // .5 second delay
          setPage((prev) => prev + 1);
          setLoadingMore(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  });

  if (isLoadingTransactions && page === 1) {
    return <LoadingSpinner />;
  }

  if (isErrorTD) {
    return <div>Error loading transactions.</div>;
  }

  return (
    <div
      className={`flex flex-col gap-10 p-5 rounded-md ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Notification</h1>
        {displayedTransactions?.map((transaction, i) => (
          <div
            className="flex flex-row items-center justify-between h-20 px-3 border-b rounded-md cursor-pointer hover:bg-colorPrimary border-colorPrimary"
            key={i}
          >
            <div className="flex items-center gap-3">
              {!transaction.image ? (
                <div className="flex items-center justify-center w-12 h-12 text-2xl text-center bg-blue-300 rounded-md text-colorPrimary">
                  {transaction.name.charAt(0)}
                </div>
              ) : (
                <img
                  className="object-cover w-12 h-12 rounded-md"
                  src={faceImage}
                  alt="Face Image"
                />
              )}
              <div className="flex flex-col gap-1">
                <h1 className="text-lg md:text-2xl">{transaction.name}</h1>
                <p className="text-sm">{transaction.date}</p>
              </div>
            </div>
            <h1 className="text-lg md:text-2xl">
              {useFormatBalance(transaction.amount)}
            </h1>
          </div>
        ))}
      </div>
      {loadingMore && <LoadingSpinner />}
      <div ref={loader} className="h-10" />
    </div>
  );
}

export default Notifications;
