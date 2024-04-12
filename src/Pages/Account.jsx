import { Outlet } from "react-router-dom";
import AccountNav from "../UI/AccountNav";
import AccountMobileNav from "../UI/AccountMobileNav";
import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

function Account() {
  const [showMobile, setShowMobileNav] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 764px)");

  function handleShowMobileNav() {
    setShowMobileNav(true);
  }

  function handleButtonClick(e) {
    e.stopPropagation();
    handleShowMobileNav(e);
  }

  return (
    <div className="grid gap-5 p-5 xl:grid-cols-4 md:grid-cols-3">
      <div className="xl:col-start-1 xl:col-end-2 bg-[#1E1E1E] md:block hidden rounded-md">
        <AccountNav />
      </div>

      <div
        className={`xl:col-start-2 xl:col-end-5  md:col-start-2 md:col-end-4 row-start-1 col-start-1 col-end-3 w-full h-56 flex flex-col  gap-2 ${
          showMobile && isSmallScreen ? "hidden" : "block"
        } h-full`}
      >
        <div className="" onClick={(e) => handleButtonClick(e)}>
          <button className="block md:hidden">Back</button>
        </div>
        <Outlet />
      </div>

      <div
        className={`max-h-[200px] ${
          showMobile ? "row-start-1 col-start-1 col-end-3 block" : "hidden"
        } md:hidden block`}
      >
        <AccountMobileNav setShowMobileNav={setShowMobileNav} />
      </div>
    </div>
  );
}

export default Account;
