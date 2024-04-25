import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import faceImage from "/public/face image.avif";
import { useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { setShowSidebar } from "../Features/uiSlice";

function Header() {
  const darkMode = useSelector((state) => state.darkMode);
  const location = useLocation().pathname.slice(1);
  const dispatch = useDispatch();

  const handleShowSideBar = () => {
    dispatch(setShowSidebar());
  };

  return (
    <div
      className={`h-16 p-4 flex items-center justify-between ${
        darkMode ? "bg-[#1E1E1E]" : "bg-white shadow-md"
      }`}
    >
      <h1
        className={`font-bold capitalize text-xl md:text-2xl font-rob ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {location}
      </h1>
      <div className="flex items-center gap-5">
        <FaRegBell size={20} color={`${darkMode ? "white" : "black"}`} />
        <img
          className="flex items-center justify-center object-cover rounded-full w-9 h-9"
          src={faceImage}
          alt=""
        />
        <RxHamburgerMenu
          className="flex cursor-pointer md:hidden"
          size={30}
          onClick={handleShowSideBar}
          color={`${darkMode ? "white" : "black"}`}
        />
      </div>
    </div>
  );
}

export default Header;
