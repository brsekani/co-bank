import { useState } from "react";
import Logo from "../UI/Logo";
import Nav from "../UI/Nav";

function SideBar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-[#1E1E1E] w-20 hover:w-64 flex flex-col h-full ${
        isHovered ? "hover:overflow-visible" : ""
      } p-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-5">
        <Logo isHovered={isHovered} />
        <Nav isHovered={isHovered} />
      </div>
    </div>
  );
}

export default SideBar;
