function QuickTransfer() {
  return (
    <div className="w-full h-full bg-[#1E1E1E] col-start-1 col-end-3 row-end-3 md:col-end-2 row-start-2 xl:row-start-1 xl:row-end-2 xl:col-start-3 xl:col-end-4 p-5 rounded-md">
      <h1 className="text-3xl font-semibold">Quick Transfer</h1>
      <form className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-1">
          <label>Recipients Account</label>
          <input
            className="w-full h-12 pl-1 bg-transparent border border-white rounded-md"
            placeholder="1234 1234 1234 1234"
            type="tel"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Amount</label>
          <input
            className="w-full h-12 pl-1 bg-transparent border border-white rounded-md"
            placeholder="1000"
            type="tel"
          />
        </div>

        <button className="w-full h-12 text-xl font-semibold bg-blue-600 rounded-md">
          continue
        </button>
      </form>
    </div>
  );
}

export default QuickTransfer;
