import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./UI/Header";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import Send from "./Modals/Send";
import Airtime from "./Modals/Airtime";
import { AccountContext } from "./Context/AccountContext";

function AppLayout() {
  const darkMode = useSelector((state) => state.darkMode);
  const { showSendUI, showAirtimeUI } = useSelector((state) => state.ui);

  const { accountData, isLoadingAD } = useContext(AccountContext);
  console.log(accountData);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (isLoadingAD) {
    // Loading state while data is being fetched
    return (
      <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
        Loading...
      </div>
    );
  }

  return (
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
  );
}

export default AppLayout;
