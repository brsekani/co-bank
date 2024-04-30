import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import { useContext } from "react";

function Verification() {
  const darkMode = useSelector((state) => state.darkMode);

  const { customerData } = useContext(AccountContext);

  // Email
  const email = customerData?.map((customer) => customer.email);

  // Email Verified
  const emailVerified = customerData
    ?.map((customer) => customer.emailVerified)
    .at(0);
  console.log(emailVerified);

  // Phone Number
  const phoneNumber = customerData?.map((customer) => customer.phoneNumber);

  const phoneNumVerified = customerData
    ?.map((customer) => customer.phoneNumVerified)
    .at(0);

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
                <button className="flex items-center gap-1 px-4 py-2 border border-colorPrimary rounded-md">
                  Verify
                </button>
              )}
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
        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-5">
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
            <button className="flex items-center gap-1 px-4 py-2 border border-colorPrimary rounded-md">
              Verify
            </button>
          )}
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
          <button className="px-4 py-1 text-xl text-center border border-colorPrimary rounded-md">
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
          <button className="px-4 py-1 text-xl text-center border border-colorPrimary rounded-md">
            Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
