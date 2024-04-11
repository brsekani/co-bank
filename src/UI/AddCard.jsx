import FlipCardForCardPage from "./FlipCardForCardPage";

function AddCard() {
  return (
    <div className="w-full bg-[#1E1E1E] md:flex-row col-start-1 col-end-3 md:col-start-1 md:col-end-3 xl:row-end-1 xl:row-start-1 p-5 rounded-md">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="text-3xl font-semibold ">Cards</h1>
        <button className="px-5 py-2 text-lg font-semibold bg-blue-600 rounded-md">
          + Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-5 md:grid-cols-2">
        <div className="col-start-1 col-end-2 row-start-1 row-end-1 p-5 border border-blue-500 md:col-start-1 md:col-end-2">
          <FlipCardForCardPage />
        </div>
        <div className="flex items-center justify-center w-full col-start-1 col-end-2 row-start-2 border border-dashed rounded-md row-end-10 md:row-start-1 md:col-start-2 md:col-end-3 md:row-end-2">
          <button className="flex flex-col items-center text-lg font-semibold">
            <span>+ </span>
            <span>AddCard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
