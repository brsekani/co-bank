import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./UI/Header";

function AppLayout() {
  return (
    <div className="w-full h-[100vh] text-white bg-[#121212] flex overflow-hidden">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
