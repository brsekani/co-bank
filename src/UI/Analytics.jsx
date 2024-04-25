import { useSelector } from "react-redux";

function Analytics() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`min-h-[450px] max-h-[750px] w-full bg-[#1E1E1E] row-start-3 col-start-1 col-end-3 md:row-start-2 md:col-start-2 md:md:col-end-3 xl:row-start-2 xl:col-start-3 xl:col-end-4 ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      }`}
    >
      Analytics
    </div>
  );
}

export default Analytics;
