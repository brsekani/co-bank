import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Import icons directly from the respective libraries
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";

function AccountNav() {
  const darkMode = useSelector((state) => state.darkMode);
  const location = useLocation().pathname;
  console.log(location);

  const navItems = [
    {
      name: "My Profile",
      icon: MdOutlineAccountCircle,
      to: "/account/profile",
    },
    {
      name: "Security",
      icon: IoKeyOutline,
      to: "/account/security",
    },
    {
      name: "Notification",
      icon: FaRegBell,
      to: "/account/notifications",
    },
    {
      name: "Verification",
      icon: MdOutlineVerified,
      to: "/account/verification",
    },
    {
      name: "Logout",
      icon: IoIosLogOut,
      to: "/",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      }`}
    >
      <nav>
        <ul className="flex flex-col gap-5 p-5">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.to}>
              <li
                className={`flex items-center h-12 gap-2 px-5 hover:bg-[#918888] rounded-md ${
                  location === item.to ? "bg-[#918888]" : ""
                }`}
              >
                <item.icon size={27} />
                <span>{item.name}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default AccountNav;
