import { TbPencilMinus } from "react-icons/tb";
import profilePic from "/public/face image.avif";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AccountContext } from "../Context/AccountContext";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode);

  const { customerData, accountData } = useContext(AccountContext);

  // FullName
  const fullName = customerData?.map((customer) => {
    const capitalizeLastName =
      customer.lastName.charAt(0).toUpperCase(1) +
      customer.lastName.slice(1).toLowerCase();
    const capitalizeFirst =
      customer.firstName.charAt(0).toUpperCase(1) +
      customer.firstName.slice(1).toLowerCase();
    return `${capitalizeLastName} ${capitalizeFirst}`;
  });

  // FirstName
  const firstname = customerData?.map((customer) => {
    const capitalizeFirst =
      customer.firstName.charAt(0).toUpperCase(1) +
      customer.firstName.slice(1).toLowerCase();

    return capitalizeFirst;
  });

  // lastName
  const lastName = customerData.map((customer) => {
    const capitalizeFirst =
      customer.lastName.charAt(0).toUpperCase(1) +
      customer.lastName.slice(1).toLowerCase();

    return capitalizeFirst;
  });

  // Email
  const email = customerData.map((customer) => customer.email);

  // Phone Number
  const phoneNumber = customerData.map((customer) => customer.phoneNumber);

  // Address
  const address = customerData.map((customer) => customer.address);

  // username
  const userName = customerData.map((customer) => `@${customer.userName}`);

  // AccountNumber
  const accountNumber = accountData.map((account) => account.accountNumber);

  return (
    <div className="flex flex-col gap-5 ">
      {/* Profile */}
      <div
        className={`flex flex-col gap-10  rounded-md  p-5 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl">Profile</h1>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-md border-colorPrimary">
            <span>Edit</span>
            <TbPencilMinus />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <img
            className="object-fill w-24 h-24 rounded-full"
            src={profilePic}
            alt=""
          />
          <div>
            <h1 className="text-xl font-semibold lg:text-3xl">{fullName}</h1>
            <p className="text-lg">{userName}</p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div
        className={`flex flex-col gap-10 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } rounded-md  p-5`}
      >
        <h1 className="text-xl lg:text-3xl">Account Details</h1>

        <div className="grid grid-cols-1 gap-3 md:gap-0 md:grid-cols-2">
          <div>
            <p className="text-lg">Account Name</p>
            <h1 className="text-xl lg:text-3xl">{fullName}</h1>
          </div>
          <div>
            <p className="text-lg">Account Number</p>
            <h1 className="text-xl lg:text-3xl">{accountNumber}</h1>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div
        className={`flex flex-col gap-10  rounded-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } p-5`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl">Personal Information</h1>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-md border-colorPrimary">
            <span>Edit</span>
            <TbPencilMinus />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:gap-3 xl:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg">First Name</p>
              <h1 className="text-xl lg:text-3xl">{firstname}</h1>
            </div>
            <div>
              <p className="text-lg">Email Address</p>
              <h1 className="text-xl lg:text-3xl">{email}</h1>
            </div>
            <div>
              <p className="text-lg">Address</p>
              <h1 className="text-xl lg:text-3xl">{address}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg">Last Number</p>
              <h1 className="text-xl lg:text-3xl">{lastName}</h1>
            </div>
            <div>
              <p className="text-lg">Phone Number</p>
              <h1 className="text-xl lg:text-3xl">{phoneNumber}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
