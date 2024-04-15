import { useMediaQuery } from "@react-hook/media-query";
import { setIsSideBarHovered, setShowSidebar } from "../Features/uiSlice";
import Logo from "../UI/Logo";
import Nav from "../UI/Nav";
import ToogleBackgroundBtn from "../UI/ToogleBackgroundBtn";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {
  const isSmallScreen = useMediaQuery("(max-width: 764px)");
  const { isSideBarHovered, showSideBar } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    if (isSmallScreen) {
      dispatch(setShowSidebar(true));
    }
  };

  return (
    <>
      {isSmallScreen && !showSideBar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`bg-[#1E1E1E] w-20 ${
          isSideBarHovered ? "" : ""
        } flex flex-col justify-between h-full ${
          isSideBarHovered ? "w-64 min-w-48" : ""
        } p-4 ${isSmallScreen && showSideBar ? " hidden" : "fixed z-10"} ${
          !isSmallScreen ? "sticky" : ""
        }`}
        onMouseEnter={() => dispatch(setIsSideBarHovered(true))} // Dispatch setIsSideBarHovered action
        onMouseLeave={() => dispatch(setIsSideBarHovered(false))} // Dispatch setIsSideBarHovered action
      >
        <div className="flex flex-col gap-10">
          <Logo />
          <Nav />
        </div>
        <ToogleBackgroundBtn
          isSideBarHovered={isSideBarHovered}
          setIsSideBarHovered={setIsSideBarHovered} // Remove this line
        />
      </div>
    </>
  );
}

export default SideBar;
