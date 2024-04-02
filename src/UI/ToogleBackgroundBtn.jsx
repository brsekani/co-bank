import PropTypes from "prop-types";
import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import classNames from "classnames";

function ToggleBackgroundBtn({ isHovered, setIsHovered }) {
  const [toggleBtn, setToggleBtn] = useState(true);

  const handleToggle = () => {
    setToggleBtn((prev) => !prev);
    setIsHovered(true);
  };

  const circleClasses = classNames(
    "absolute bg-red-900 rounded-full w-9 h-9 top-[1px]",
    {
      "left-0.5": toggleBtn && isHovered,
      "left-0.6": toggleBtn && !isHovered,
      "top-10 left-10": !toggleBtn && isHovered,
    }
  );

  return (
    <div
      className={`border border-red-900 ${
        isHovered ? "w-20 h-10 flex-row px-2" : "w-10 h-20 flex-col py-2"
      } rounded-full mb-10 m-auto flex items-center justify-between relative`}
      onClick={handleToggle}
    >
      <IoSunnyOutline />
      <div className={circleClasses}></div>
      <IoMoonOutline />
    </div>
  );
}

ToggleBackgroundBtn.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  setIsHovered: PropTypes.func.isRequired,
};

export default ToggleBackgroundBtn;
