import AddCard from "../UI/AddCard";
import Analytics from "../UI/Analytics";
import QuickTransfer from "../UI/QuickTransfer";
import OverviewCard from "../UI/OverviewCard.jsx";

import TransactionsTableCards from "../UI/TransactionsTableCards.jsx";
function Cards() {
  return (
    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
      <AddCard />
      <QuickTransfer />
      <Analytics />
      <OverviewCard />
      <TransactionsTableCards />
    </div>
  );
}

export default Cards;
