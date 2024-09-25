import PropTypes from "prop-types";
import { FaRegBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAccountCircle, MdOutlineVerified } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import profilePic from "/public/face image.avif";
import { logout, reset } from "../Features/auth/authSlice";
import { useDispatch } from "react-redux";

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
  { icon: <IoIosLogOut size={30} />, text: "Logout" },
];

function AccountMobileNav({ setShowMobileNav }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate for programmatic navigation

  const handleNavLinkClick = () => {
    setShowMobileNav(false);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/SignUpAndLogin"); // Redirect to the login page after logout
        dispatch(reset());
      });
  };

  return (
    <div className="font-rob">
      <div className="flex flex-col items-center justify-center gap-5 mt-3">
        <img
          className="object-fill w-40 h-40 rounded-full"
          src={profilePic}
          alt="User profile"
          onError={(e) => {
            e.target.src = "/fallback-image.png"; // Fallback image
          }}
        />
        <h1 className="text-2xl font-medium">Geraldine Corwin</h1>
      </div>

      <nav className="mt-10">
        <ul className="flex flex-col gap-3 mb-5">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={
                item.text === "Logout" ? handleLogout : handleNavLinkClick
              }
              className={({ isActive }) =>
                `flex items-center gap-3 mx-5 h-16 hover:bg-[#24242c] px-5 rounded-md ${
                  isActive ? "bg-[#1a1a20]" : ""
                }`
              }
            >
              <li className="flex items-center gap-3">
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
