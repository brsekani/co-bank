import PropTypes from "prop-types";
import { LuLayoutDashboard } from "react-icons/lu";

function Nav({ isHovered }) {
  return (
    <div>
      <ul>
        <li className="flex flex-row gap-3">
          <LuLayoutDashboard size={28} />
          <p className={`${isHovered ? "block" : "hidden"} text-xl font-bold`}>
            Dashboard
          </p>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

Nav.propTypes = {
  isHovered: PropTypes.bool.isRequired,
};

export default Nav;
