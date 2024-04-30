import { useContext } from "react";
import { TbPencilMinus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";

function Security() {
  const darkMode = useSelector((state) => state.darkMode);
  const { customerData } = useContext(AccountContext);

  // Email
  const email = customerData?.map((customer) => customer.email);

  // Email Verified
  const emailVerified = customerData
    ?.map((customer) => customer.emailVerified)
    .at(0);
  console.log(emailVerified);

  return (
    <div
      className={`flex flex-col gap-10 bg-[#1E1E1E] p-5 rounded-md ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
      }`}
    >
      {/* Email Address */}
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl">Security</h1>

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
              <button className="flex items-center gap-1 px-4 py-2 border border-colorPrimary rounded-md">
                <span>Edit</span>
                <TbPencilMinus />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <hr />
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Password</h1>
          <p className="text-sm">
            Set a unique password that protects your account
          </p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border border-colorPrimary rounded-md">
            Change Password
          </button>
        </div>
      </div>

      {/* Deactivate My Account */}
      <hr />
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Deactivate My Account</h1>
          <p className="text-sm">
            This will shut down your account. Your account will be reactivated
            when you sign in again.
          </p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center border border-colorPrimary rounded-md">
            Deactivate
          </button>
        </div>
      </div>

      {/* Delete My Account */}
      <hr />
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Delete My Account</h1>
          <p className="text-sm">
            This will delete your account. Your account will be permanently
            removed from Co-Bank.
          </p>
        </div>
        <div>
          <button className="px-4 py-1 text-xl text-center bg-red-700 rounded-md ">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Security;
