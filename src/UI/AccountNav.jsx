import { MdOutlineAccountCircle } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";

function AccountNav() {
  return (
    <div>
      <nav>
        <ul>
          <NavLink to="/account/profile">
            <li>
              <MdOutlineAccountCircle />
              <span>My Profile</span>
            </li>
          </NavLink>
          <NavLink to="/account/security">
            <li>
              <IoKeyOutline />
              <span>Security</span>
            </li>
          </NavLink>
          <NavLink to="/account/notifications">
            <li>
              <FaRegBell />
              <span>Notification</span>
            </li>
          </NavLink>
          <NavLink to="/account/verification">
            <li>
              <MdOutlineVerified />
              <span>Verfication</span>
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <IoIosLogOut />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default AccountNav;
