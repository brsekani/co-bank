import { useSelector } from "react-redux";

function Verification() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`flex flex-col gap-10 ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      } p-5 rounded-md`}
    >
      {/* Email Address */}
      <div className="flex flex-col gap-10 ">
        <h1 className="text-3xl">Verification</h1>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl">Email Address</h1>
            <p className="text-sm">The email associated with your account</p>
          </div>
          <div>
            <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
              <div className="flex flex-col">
                <h1 className="text-xl">Saige_Krajcik@gmail.com</h1>
                <p className="text-lg text-red-600 text-start lg:text-end ">
                  Not Verified
                </p>
              </div>
              <button className="flex items-center gap-1 px-4 py-2 border border-colorPrimary rounded-md">
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <hr />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Phone Number</h1>
          <p className="text-sm">
            The phone number associated with your account
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl">(449) 477-9364 x01852</h1>
          <p className="text-lg text-green-600 text-start lg:text-end ">
            Verified
          </p>
        </div>
      </div>

      {/* Deactivate My Account */}
      <hr />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">NIN</h1>
          <p className="text-sm">Link your NIN to your account</p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border border-white rounded-md">
            Link
          </button>
        </div>
      </div>

      {/* Delete My Account */}
      <hr />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">BVN</h1>
          <p className="text-sm">Link your BVN to your account</p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border border-white rounded-md">
            Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
