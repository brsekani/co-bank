import PropTypes from "prop-types";
import { FaRegBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAccountCircle, MdOutlineVerified } from "react-icons/md";
import { NavLink } from "react-router-dom";
import profilePic from "/public/face image.avif";

const navItems = [
  {
    icon: <MdOutlineAccountCircle size={30} />,
    text: "My Profile",
    to: "/account/profile",
  },
  {
    icon: <IoKeyOutline size={30} />,
    text: "Security",
    to: "/account/security",
  },
  {
    icon: <FaRegBell size={30} />,
    text: "Notification",
    to: "/account/notifications",
  },
  {
    icon: <MdOutlineVerified size={30} />,
    text: "Verification",
    to: "/account/verification",
  },
  { icon: <IoIosLogOut size={30} />, text: "Logout", to: "/" },
];

function AccountMobileNav({ setShowMobileNav }) {
  const handleNavLinkClick = () => {
    setShowMobileNav(false);
    // console.log("clicked");
  };

  return (
    <div className="font-rob">
      <div className="flex flex-col gap-5 items-center justify-center mt-3">
        <img
          className="object-fill w-40 h-40 rounded-full"
          src={profilePic}
          alt=""
        />
        <h1 className="text-2xl font-medium">Geraldine Corwin</h1>
      </div>

      <nav className="mt-10">
        <ul className="flex flex-col gap-3 mb-5">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.to} onClick={handleNavLinkClick}>
              <li className="flex items-center gap-3 mx-5 h-16 hover:bg-[#24242c] px-5 rounded-md">
                {item.icon}
                <span className="text-lg">{item.text}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}

AccountMobileNav.propTypes = {
  setShowMobileNav: PropTypes.func.isRequired,
};

export default AccountMobileNav;
