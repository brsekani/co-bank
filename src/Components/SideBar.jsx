import { useState } from "react";
import Logo from "../UI/Logo";
import Nav from "../UI/Nav";
import ToogleBackgroundBtn from "../UI/ToogleBackgroundBtn";

function SideBar() {
  const [isHovered, setIsHovered] = useState(false);

  const closeSidebar = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-[#1E1E1E] w-20 ${
        isHovered ? "" : ""
      } flex flex-col justify-between h-full ${
        isHovered ? "w-64 min-w-48" : ""
      } p-4`}
      onMouseEnter={() => setIsHovered(true)} // Delay mouse enter by 3 seconds
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-10">
        <Logo
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          closeSidebar={closeSidebar}
        />
        <Nav
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          closeSidebar={closeSidebar}
        />
      </div>
      <ToogleBackgroundBtn isHovered={isHovered} setIsHovered={setIsHovered} />
    </div>
  );
}

export default SideBar;
