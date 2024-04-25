import PropTypes from "prop-types";
import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../Features/DarkMode";
import { setIsSideBarHovered } from "../Features/uiSlice";

function ToggleBackgroundBtn() {
  const { isSideBarHovered } = useSelector((state) => state.ui);
  const [toggleBtn, setToggleBtn] = useState(true);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggleBtn((prev) => !prev);
    dispatch(setIsSideBarHovered(true));
    dispatch(toggleDarkMode());
  };

  const circleClasses = classNames(
    "absolute bg-colorPrimary rounded-full w-9 h-9 top-[1px]",
    {
      "left-0.5": toggleBtn && isSideBarHovered,
      "left-0.6": toggleBtn && !isSideBarHovered,
      "top-10 left-10": !toggleBtn && isSideBarHovered,
      "top-[40px] left-[1px]": !toggleBtn && !isSideBarHovered,
    }
  );

  return (
    <div
      className={`border border-colorPrimary ${
        isSideBarHovered ? "w-20 h-10 flex-row px-2" : "w-10 h-20 flex-col py-2"
      } rounded-full mb-10 m-auto flex items-center justify-between relative cursor-pointer`}
      onClick={handleToggle}
    >
      <IoSunnyOutline
        className="z-10"
        color={`${toggleBtn ? "black" : "white"}`}
        size={20}
      />
      <div className={circleClasses}></div>
      <IoMoonOutline
        className="z-10"
        color={`${toggleBtn ? "white" : "black"}`}
        size={20}
      />
    </div>
  );
}

ToggleBackgroundBtn.propTypes = {
  isSideBarHovered: PropTypes.bool.isRequired,
  setisSideBarHovered: PropTypes.func.isRequired,
};

export default ToggleBackgroundBtn;
