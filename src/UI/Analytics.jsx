import { useSelector } from "react-redux";

function Analytics() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`min-h-[450px] max-h-[750px] w-full bg-gray-800 row-start-3 col-start-1 col-end-3 md:row-start-2 md:col-start-2 md:md:col-end-3 xl:row-start-2 xl:col-start-3 xl:col-end-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      Analytics
    </div>
  );
}

export default Analytics;
