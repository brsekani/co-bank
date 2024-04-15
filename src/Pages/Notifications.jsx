import useFormatBalance from "../Hooks/useFormatBalance";
import useRandomDataGenerator from "../Hooks/useRandomDataGenerator";
import faceImage from "/public/face image.avif";

function Notifications() {
  const transactions = useRandomDataGenerator();

  return (
    <div className="flex flex-col gap-10 bg-[#1E1E1E] p-5 rounded-md">
      {/* Email Address */}
      <div className="flex flex-col gap-10 ">
        <h1 className="text-3xl">Notification</h1>

        {transactions.map((transaction, i) => (
          <div className="flex flex-row items-center justify-between" key={i}>
            <div className="flex items-center gap-3">
              {!transaction.image ? (
                <div className="flex items-center justify-center w-12 h-12 text-2xl text-center text-blue-600 bg-blue-300 rounded-md">
                  {transaction.name.charAt(0)}
                </div>
              ) : (
                <img
                  className="object-cover w-12 h-12 rounded-md"
                  src={faceImage}
                  alt="Face Image"
                />
              )}
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl">{transaction.name}</h1>
                <p className="text-sm">{transaction.date}</p>
              </div>
            </div>
            <h1 className="text-2xl">{useFormatBalance(transaction.amount)}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
