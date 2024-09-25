import { Outlet } from "react-router-dom";
import AccountNav from "../UI/AccountNav";
import AccountMobileNav from "../UI/AccountMobileNav";
import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";

function Account() {
  const darkMode = useSelector((state) => state.darkMode);
  const [showMobile, setShowMobileNav] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 764px)");
  const { isLoading } = useSelector((state) => state?.auth);

  console.log(isLoading);

  function handleShowMobileNav() {
    setShowMobileNav(true);
  }

  function handleButtonClick(e) {
    e.stopPropagation();
    handleShowMobileNav(e);
  }

  return isLoading ? (
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
  ) : (
    <div className="grid gap-5 p-5 xl:grid-cols-4 md:grid-cols-3">
      <div
        className={`xl:col-start-1 xl:col-end-2 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } md:block hidden rounded-md`}
      >
        <AccountNav />
      </div>

      <div
        className={`xl:col-start-2 xl:col-end-5  md:col-start-2 md:col-end-4 row-start-1 col-start-1 col-end-3 w-full h-56 flex flex-col gap-5 ${
          showMobile && isSmallScreen ? "hidden" : "block"
        } h-full `}
      >
        <div className="" onClick={(e) => handleButtonClick(e)}>
          <button
            className={`flex items-center md:hidden text-xl ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MdArrowBackIos size={25} />
            <span>Back</span>
          </button>
        </div>
        <Outlet />
      </div>

      <div
        className={`h-full ${
          showMobile ? "row-start-1 col-start-1 col-end-3 block" : "hidden"
        } ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } md:hidden block`}
      >
        <AccountMobileNav setShowMobileNav={setShowMobileNav} />
      </div>
    </div>
  );
}

export default Account;
