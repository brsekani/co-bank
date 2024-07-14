import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import useFormatBalance from "../Hooks/useFormatBalance";
import { useSelector } from "react-redux";

function PendingInvoice() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`bg-gray-800 w-full h-fit p-5 rounded-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h6 className="text-[12px]">Pending Invoice</h6>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{useFormatBalance(1352)}</h1>
        <div className="flex items-center justify-center w-10 h-10 -mt-5 rounded-full bg-[#a1a1a1]">
          <HiOutlineDotsCircleHorizontal />
        </div>
      </div>
      <p className="mt-10 text-lg">23 Invoices</p>
    </div>
  );
}

export default PendingInvoice;
