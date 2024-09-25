import { useSelector } from "react-redux";

function Verification() {
  const darkMode = useSelector((state) => state.darkMode);

  const { userData } = useSelector((state) => state.auth);

  // Email
  const email = userData?.email;

  // Email Verified
  const emailVerified = userData?.emailVerified;

  // Phone Number
  const phoneNumber = userData?.phoneNumber;

  const phoneNumVerified = userData?.phoneNumVerified;

  return (
    <div
      className={`flex flex-col gap-10 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } p-5 rounded-md`}
    >
      {/* Email Address */}
      <div className="flex flex-col gap-10 ">
        <h1 className="text-3xl">Verification</h1>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl">Email Address</h1>
            <p className="text-sm">The email associated with your account</p>
          </div>
          <div>
            <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center">
              <div className="flex flex-col">
                <h1 className="text-xl">{email}</h1>
                <p
                  className={`text-lg ${
                    emailVerified ? "text-green-500" : "text-red-600"
                  }  text-start lg:text-end`}
                >
                  {emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
              {!emailVerified && (
                <button className="flex items-center gap-1 px-4 py-2 border rounded-md border-colorPrimary">
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <hr />
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Phone Number</h1>
          <p className="text-sm">
            The phone number associated with your account
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-col">
            <h1 className="text-xl">{phoneNumber}</h1>
            <p
              className={`text-lg ${
                phoneNumVerified ? "text-green-500" : "text-red-600"
              }  text-start lg:text-end`}
            >
              {emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
          {!phoneNumVerified && (
            <button className="flex items-center gap-1 px-4 py-2 border rounded-md border-colorPrimary">
              Verify
            </button>
          )}
        </div>
      </div>

      {/* Deactivate My Account */}
      <hr />
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">NIN</h1>
          <p className="text-sm">Link your NIN to your account</p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border rounded-md border-colorPrimary">
            Link
          </button>
        </div>
      </div>

      {/* Delete My Account */}
      <hr />
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">BVN</h1>
          <p className="text-sm">Link your BVN to your account</p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border rounded-md border-colorPrimary">
            Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
