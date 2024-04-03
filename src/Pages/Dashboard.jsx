import Expenses from "../UI/Expenses";
import FlipCard from "../UI/FlipCard";
import Income from "../UI/Income";
import Overview from "../UI/Overview";
import PersonalAccount from "../UI/PersonalAccount";
import Savings from "../UI/Savings";
import TransactionsTable from "../UI/TransactionsTable";

function Dashboard() {
  return (
    <div>
      <div className="grid h-full grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
        <PersonalAccount />
        <FlipCard />
        <Income />
        <Overview />
        <Expenses />
        <Savings />
        <TransactionsTable />
      </div>
    </div>
  );
}

export default Dashboard;
