import { useSelector } from "react-redux";

function Logo() {
  const darkMode = useSelector((state) => state.darkMode);
  const { isSideBarHovered } = useSelector((state) => state.ui);

  return (
    <div className="relative flex flex-row gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 101 101"
        className="w-8 h-8"
      >
        <path
          fill="#00446A"
          d="M48.734 2.797A6 6 0 0 1 53.808 0h36.31c4.724 0 7.595 5.207 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 80h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
        ></path>
        <path
          fill="#00A3FF"
          d="M48.734 23.797A6 6 0 0 1 53.808 21h36.31c4.724 0 7.595 5.208 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 101h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
        ></path>
      </svg>
      <p
        className={`absolute left-0 ${
          !isSideBarHovered
            ? "translate-x-full opacity-0"
            : "translate-x-12 opacity-100"
        } ${
          darkMode ? "text-white" : "text-black"
        } transition-all duration-300 text-lg font-medium font-rob`}
      >
        Co-Bank
      </p>
    </div>
  );
}

export default Logo;
