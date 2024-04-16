import PropTypes from "prop-types";

import { LuLayoutDashboard } from "react-icons/lu";
import { PiCardsBold } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarHovered, setShowSidebar } from "../Features/uiSlice";
import { useMediaQuery } from "@react-hook/media-query";

const navItems = [
  { icon: LuLayoutDashboard, text: "Dashboard" },
  { icon: PiCardsBold, text: "Cards" },
  { icon: FaMoneyBills, text: "Transactions" },
  { icon: FaFileInvoice, text: "Invoice" },
  { icon: GoGoal, text: "Goals" },
  { icon: MdOutlineAccountCircle, text: "Account" },
  { icon: BiSupport, text: "Support" },
];

function Nav() {
  const isSmallScreen = useMediaQuery("(max-width: 764px)");
  const { isSideBarHovered } = useSelector((state) => state.ui);
  const darkMode = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const location = useLocation().pathname.slice(1);

  const handleClick = () => {
    dispatch(setIsSideBarHovered(false));
    isSmallScreen ? dispatch(setShowSidebar(false)) : "";
  };

  return (
    <div className="font-rob">
      <ul className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.text}>
            <li
              className={`relative flex items-center gap-3 hover:bg-colorPrimary/10 hover:border-r-4 hover:border-colorPrimary transition-all duration-300 ${
                location === item.text && darkMode
                  ? "bg-colorPrimary/10 text-white"
                  : location === item.text && !darkMode
                  ? "bg-colorPrimary/10 text-black"
                  : ""
              } ${
                isSideBarHovered && location === item.text
                  ? "border-r-4 border-colorPrimary"
                  : ""
              } h-10 rounded-sm px-3 hover:scale-105 transform
        
              `}
              onClick={() => handleClick(index + 1)}
            >
              <item.icon
                size={25}
                color={`${location === item.text ? "rgb(0, 163, 255)" : ""}`}
              />
              <p
                className={`absolute left-12 w-full ${
                  isSideBarHovered ? "block" : "hidden"
                } transition-opacity duration-300 `}
              >
                {item.text}
              </p>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

Nav.propTypes = {
  isSideBarHovered: PropTypes.bool.isRequired,
  setisSideBarHovered: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Nav;
