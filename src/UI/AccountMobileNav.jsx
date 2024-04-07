import PropTypes from "prop-types";
import { FaRegBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAccountCircle, MdOutlineVerified } from "react-icons/md";
import { NavLink } from "react-router-dom";

function AccountMobileNav({ setShowMobileNav }) {
  const handleNavLinkClick = () => {
    setShowMobileNav(false);
  };

  return (
    <>
      <nav>
        <ul>
          <NavLink to="/account/profile" onClick={handleNavLinkClick}>
            <li>
              <MdOutlineAccountCircle />
              <span>My Profile</span>
            </li>
          </NavLink>
          <NavLink to="/account/security" onClick={handleNavLinkClick}>
            <li>
              <IoKeyOutline />
              <span>Security</span>
            </li>
          </NavLink>
          <NavLink to="/account/notifications" onClick={handleNavLinkClick}>
            <li>
              <FaRegBell />
              <span>Notification</span>
            </li>
          </NavLink>
          <NavLink to="/account/verification" onClick={handleNavLinkClick}>
            <li>
              <MdOutlineVerified />
              <span>Verification</span>
            </li>
          </NavLink>
          <NavLink to="/" onClick={handleNavLinkClick}>
            <li>
              <IoIosLogOut />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
}

AccountMobileNav.propTypes = {
  setShowMobileNav: PropTypes.func.isRequired,
};

export default AccountMobileNav;
