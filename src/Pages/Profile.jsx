import { TbPencilMinus } from "react-icons/tb";
import profilePic from "/public/face image.avif";
import { useSelector } from "react-redux";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className="flex flex-col gap-5">
      {/* Profile */}
      <div
        className={`flex flex-col gap-10  rounded-md  p-5 ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl">Profile</h1>
          <button className="flex items-center gap-1 px-3 py-1 border border-colorPrimary rounded-md">
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
            <h1 className="text-3xl">Geraldine Corwin</h1>
            <p className="text-lg">@GeraldineCorwin</p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div
        className={`flex flex-col gap-10 ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        } rounded-md  p-5`}
      >
        <h1 className="text-3xl">Account Details</h1>

        <div className="grid grid-cols-1 gap-3 md:gap-0 md:grid-cols-2">
          <div>
            <p className="text-lg">Account Name</p>
            <h1 className="text-3xl">Geraldine Corwin</h1>
          </div>
          <div>
            <p className="text-lg">@Account Number</p>
            <h1 className="text-3xl">53521359</h1>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div
        className={`flex flex-col gap-10  rounded-md ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        } p-5`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Personal Information</h1>
          <button className="flex items-center gap-1 px-3 py-1 border border-colorPrimary rounded-md">
            <span>Edit</span>
            <TbPencilMinus />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-0 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg">First Name</p>
              <h1 className="text-3xl">Geraldine</h1>
            </div>
            <div>
              <p className="text-lg">Email Address</p>
              <h1 className="text-3xl">Sherwood8@Hotmail.Com</h1>
            </div>
            <div>
              <p className="text-lg">Address</p>
              <h1 className="text-3xl">8604 Darrick Row Suite 929</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg">Last Number</p>
              <h1 className="text-3xl">Corwin</h1>
            </div>
            <div>
              <p className="text-lg">Phone Number</p>
              <h1 className="text-3xl">435.292.9712</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
