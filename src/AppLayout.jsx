import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./UI/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Send from "./Modals/Send";
import Airtime from "./Modals/Airtime";

function AppLayout() {
  const darkMode = useSelector((state) => state.darkMode);
  const { showSendUI, showAirtelUI } = useSelector((state) => state.ui);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
      {showAirtelUI && <Airtime />}
      {console.log(showAirtelUI)}
    </div>
  );
}

export default AppLayout;
