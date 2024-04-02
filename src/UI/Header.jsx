import { FaRegBell } from "react-icons/fa";
import faceImage from "/public/face image.avif";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation().pathname.slice(1);

  return (
    <div className="h-12 p-4 bg-[#1E1E1E] flex items-center justify-between">
      <h1 className="text-xl font-bold capitalize">{location}</h1>
      <div className="flex items-center gap-7">
        <FaRegBell size={20} />
        <img
          className="flex items-center justify-center rounded-full w-9 h-9"
          src={faceImage}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
