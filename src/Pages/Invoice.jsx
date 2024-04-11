import AllInvoice from "../UI/AllInvoice";
import InvoicePaid from "../UI/InvoicePaid";
import InvoiceSent from "../UI/InvoiceSent";
import PendingInvoice from "../UI/PendingInvoice";
import UnpaidInvoice from "../UI/UnpaidInvoice";

function Invoice() {
  return (
    <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-3">
      <div className="flex flex-col w-full grid-cols-1 gap-5 md:flex-col xl:flex-col md:grid-cols-2 xl:grid-cols-1">
        <div className="flex flex-col items-start w-full gap-5 xl:flex-col md:flex-row">
          <InvoiceSent />
          <InvoicePaid />
        </div>
        <div className="flex flex-col items-start w-full gap-5 xl:flex-col md:flex-row">
          <PendingInvoice />
          <UnpaidInvoice />
        </div>
      </div>
      <AllInvoice />
    </div>
  );
}

export default Invoice;
