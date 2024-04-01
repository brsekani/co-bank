import PropTypes from "prop-types";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiCardsBold } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAccountCircle } from "react-icons/md";

const navItems = [
  { icon: LuLayoutDashboard, text: "Dashboard" },
  { icon: PiCardsBold, text: "Cards" },
  { icon: FaMoneyBills, text: "Transactions" },
  { icon: FaFileInvoice, text: "Invoice" },
  { icon: GoGoal, text: "Goals" },
  { icon: MdOutlineAccountCircle, text: "Account" },
];

function Nav({ isHovered }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (index) => {
    setCurrentPage(index);
  };

  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`relative flex items-center gap-3 hover:bg-[#9898be] hover:border-r-4 hover:border-[#3F51B5] transition-all duration-300 ${
              currentPage === index + 1 ? "bg-[#9898be]" : ""
            } ${
              isHovered && currentPage === index + 1
                ? "border-r-4 border-[#3F51B5]"
                : ""
            } h-10 rounded-sm px-3 hover:scale-105 transform`}
            onClick={() => handleClick(index + 1)}
          >
            <item.icon size={25} />
            <p
              className={`absolute left-12 w-full ${
                isHovered ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300 md:block`}
            >
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Nav.propTypes = {
  isHovered: PropTypes.bool.isRequired,
};

export default Nav;
