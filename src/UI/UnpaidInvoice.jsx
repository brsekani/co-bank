import { IoAlert } from "react-icons/io5";

function UnpaidInvoice() {
  return (
    <div className="bg-[#1E1E1E] w-full h-fit p-5 rounded-md">
      <h6 className="text-[12px]">Unpaid Invoice</h6>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">
          $<span>225.00</span>
        </h1>
        <div className="flex items-center justify-center w-10 h-10 -mt-5 rounded-full bg-[#a1a1a1]">
          <IoAlert />
        </div>
      </div>
      <p className="mt-10 text-lg">23 Invoices</p>
    </div>
  );
}

export default UnpaidInvoice;
