import PropTypes from "prop-types";

import { LuLayoutDashboard } from "react-icons/lu";
import { PiCardsBold } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { icon: LuLayoutDashboard, text: "Dashboard" },
  { icon: PiCardsBold, text: "Cards" },
  { icon: FaMoneyBills, text: "Transactions" },
  { icon: FaFileInvoice, text: "Invoice" },
  { icon: GoGoal, text: "Goals" },
  { icon: MdOutlineAccountCircle, text: "Account" },
  { icon: BiSupport, text: "Support" },
];

function Nav({ isHovered, setIsHovered, closeSidebar }) {
  const location = useLocation().pathname.slice(1);

  const handleClick = () => {
    setIsHovered(false); // Close sidebar on click
    closeSidebar(); // Call closeSidebar function from SideBar component
  };

  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.text}>
            <li
              className={`relative flex items-center gap-3 hover:bg-[#536dfe] hover:border-r-4 hover:border-[#3F51B5] transition-all duration-300 ${
                location === item.text ? "bg-[#3F51B5]" : ""
              } ${
                isHovered && location === item.text
                  ? "border-r-4 border-[#536dfe]"
                  : ""
              } h-10 rounded-sm px-3 hover:scale-105 transform`}
              onClick={() => handleClick(index + 1)}
            >
              <item.icon size={25} />
              <p
                className={`absolute left-12 w-full ${
                  isHovered ? "block" : "hidden"
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
  isHovered: PropTypes.bool.isRequired,
  setIsHovered: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Nav;
