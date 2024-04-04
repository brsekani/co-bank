import AllInvoice from "../UI/AllInvoice";
import InvoicePaid from "../UI/InvoicePaid";
import InvoiceSent from "../UI/InvoiceSent";
import PendingInvoice from "../UI/PendingInvoice";
import UnpaidInvoice from "../UI/UnpaidInvoice";

function Invoice() {
  return (
    <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-3">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
        <InvoiceSent />
        <InvoicePaid />
        <PendingInvoice />
        <UnpaidInvoice />
      </div>
      <AllInvoice />
    </div>
  );
}

export default Invoice;
