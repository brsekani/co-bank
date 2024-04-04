function Goals() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Goals</h1>
        <input
          className="w-[193px] h-[28px] bg-transparent border border-[#6b7280] px-2 "
          type="text"
          placeholder="Search Goals"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
        <div className="min-h-[216px] max-h-[240px] bg-[#1E1E1E] min-w-[290px] max-w-[720px]"></div>
      </div>
    </div>
  );
}

export default Goals;
