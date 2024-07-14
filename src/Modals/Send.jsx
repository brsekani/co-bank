import { Controller } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { setShowSendUI } from "../Features/uiSlice";
import InfoModal from "./SendInfoModal";

import useSend from "../Hooks/useSend";

function Send() {
  const {
    sendRef,
    darkMode,
    dispatch,
    handleSubmit,
    onSubmit,
    control,
    setAccountNotFound,
    errors,
    accountNumberInputRef,
    setShowBankList,
    showBankList,
    selectedBank,
    register,
    banks,
    handleBankSelect,
    formatNumber,
    setValue,
    accountNotFound,
    loadingAccName,
    showModal,
    closeModal,
    formData,
    closeSendModal,
    accountName,
  } = useSend();

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
      <div
        ref={sendRef}
        className={`flex item-center md:justify-center flex-col p-5 rounded-lg font-rob w-full h-full md:w-[450px] md:h-fit ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Transfer</h1>
          <RxCross2
            size={30}
            className="cursor-pointer"
            onClick={() => dispatch(setShowSendUI(false))}
          />
        </div>

        <div className="flex items-center justify-between mt-5 text-sm">
          <p>Select Beneficiaries</p>
          <button className="text-colorPrimary">See All</button>
        </div>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-3 mt-5"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-xs">Account Number</label>
            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: "Please enter a 10-digit account number",
                minLength: {
                  value: 10,
                  message: "Please enter a 10-digit account number",
                },
                maxLength: {
                  value: 10,
                  message: "Please enter a 10-digit account number",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit account number",
                },
                onChange: () => setAccountNotFound(""),
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  inputMode="tel"
                  autoComplete="off"
                  className={`${
                    errors.accountNumber ? "border-red-500" : "border-white/1"
                  } h-10 w-full bg-transparent border pl-3`}
                  placeholder="Enter 10-digit Account Number"
                  maxLength={10}
                  ref={accountNumberInputRef}
                />
              )}
            />

            {errors.accountNumber && (
              <span className="text-xs text-red-500">
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          <div className="relative z-10 flex flex-col ">
            <label className="mb-1 text-xs">Bank Name</label>
            <div className="relative ">
              <div
                onClick={() => setShowBankList(!showBankList)}
                className="flex items-center justify-between w-full h-10 pl-3 bg-transparent border cursor-pointer border-white/1 text-start"
              >
                <div className="flex items-center gap-2">
                  {selectedBank && (
                    <img
                      className="w-8 h-8"
                      src={selectedBank.logo}
                      alt={selectedBank.name}
                    />
                  )}
                  {selectedBank ? (
                    <input
                      className="w-full h-10 pl-3 bg-transparent border-none cursor-pointer"
                      type="text"
                      value={selectedBank.name}
                      readOnly
                      {...register("bankName", {
                        required: "Please select a bank",
                      })}
                    />
                  ) : (
                    <input
                      className="w-full h-10 pl-3 bg-transparent border-none cursor-pointer"
                      type="text"
                      placeholder="Select bank"
                      readOnly
                      {...register("bankName", {
                        required: "Please select a bank",
                      })}
                    />
                  )}
                </div>
              </div>
              {errors.bankName && (
                <span className="text-xs text-red-500">
                  {errors.bankName.message}
                </span>
              )}
              {showBankList && (
                <ul
                  className="absolute w-full overflow-y-auto bg-white rounded-lg shadow-lg top-full max-h-48"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: darkMode
                      ? "#3c3f4f #1E1E1E"
                      : "#e4e4e7 #ffffff",
                  }}
                >
                  {banks.map((bank, i) => (
                    <li
                      key={i}
                      className={`${
                        darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black"
                      } h-12 border border-[#fff]/1 flex items-center gap-3 px-3 cursor-pointer`}
                      onClick={() => handleBankSelect(bank)}
                    >
                      <img
                        className="w-8 h-8"
                        src={bank.logo}
                        alt={bank.name}
                      />
                      <span>{bank.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="relative flex flex-col">
            <label className="mb-1 text-xs">Amount</label>
            <input
              className="w-full h-10 bg-transparent border border-white/1 pl-7"
              placeholder="Enter Amount"
              type="text"
              inputMode="tel"
              autoComplete="off"
              maxLength={15}
              {...register("amount", {
                required: "Enter an amount",
                validate: (value) => {
                  const amount = parseFloat(value.replace(/,/g, ""));
                  if (isNaN(amount)) return "Invalid amount";
                  if (amount < 10) return "Amount must be at least $10";
                  return true;
                },
              })}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                const formattedValue = formatNumber(rawValue);

                setValue("amount", formattedValue, { shouldValidate: true });
              }}
            />

            <PiCurrencyDollarSimpleBold
              color="rgb(0, 163, 255)"
              size={25}
              className="absolute top-7 left-1"
            />
            {errors.amount && (
              <span className="text-xs text-red-500">
                {errors.amount.message}
              </span>
            )}
          </div>

          <button
            className={`flex items-center justify-center w-full h-10 text-xl font-semibold text-white rounded-md bg-colorPrimary ${
              accountNotFound ? "bg-[#435564]" : ""
            }`}
            disabled={accountNotFound || loadingAccName}
          >
            {loadingAccName ? <div className="spinner"></div> : "Confirm"}
          </button>
        </form>
        {accountNotFound !== "" && (
          <p className="mt-2 text-sm font-normal text-red-600">
            {accountNotFound}
          </p>
        )}
      </div>
      <InfoModal
        isOpen={showModal}
        closeModal={closeModal}
        formData={formData}
        bank={selectedBank}
        closeSendModal={closeSendModal}
        accountName={accountName}
      />
    </div>
  );
}

export default Send;
