import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./UI/Header";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import Send from "./Modals/Send";
import Airtime from "./Modals/Airtime";
import { AccountContext } from "./Context/AccountContext";
import { setDarkMode } from "./Features/DarkMode";

function AppLayout() {
  const darkMode = useSelector((state) => state.darkMode);
  const { showSendUI, showAirtimeUI } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const { isLoadingAD } = useContext(AccountContext);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // useEffect(() => {
  //   // Check if the browser supports prefers-color-scheme
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     // Set dark mode if prefers-color-scheme is dark
  //     dispatch(setDarkMode(true));
  //   }
  // }, [dispatch]);

  if (isLoadingAD) {
    // Loading state while data is being fetched
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
  }

  return (
    <>
      {/* Second loading option */}
      {/* {isLoadingAD && (
        <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
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
      )} */}
      <div
        className={`flex h-screen text-white ${
          darkMode ? "bg-[#121212]" : "bg-[#ececec]"
        } font-rob cursor-default`}
      >
        <SideBar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex-grow overflow-auto">
            <Outlet />
          </div>
        </div>
        {showSendUI && <Send />}
        {showAirtimeUI && <Airtime />}
      </div>
    </>
  );
}

export default AppLayout;
