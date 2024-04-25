import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowAirtimeUI } from "../Features/uiSlice";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

// Logo imports
import MTNLogo from "../../public/MTN logo.png";
import GLOLogo from "../../public/glo logo.png";
import AirtelLogo from "../../public/Airtel_logo.png";
import MobileLogo from "../../public/9mobile logo.png";
import { Controller, useForm } from "react-hook-form";
import AirtimeinfoModal from "./AirtimeinfoModal";

function Airtime() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const sendRef = useRef(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [showNetworkList, setShowNetworkList] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormatData] = useState({});

  const networks = [
    {
      name: "MTN",
      logo: MTNLogo,
      id: 1,
      startNumbers: [
        "0803",
        "0806",
        "0703",
        "0903",
        "0906",
        "0806",
        "0706",
        "0813",
        "0810",
        "0814",
        "0816",
        "0913",
        "0916",
      ],
    },
    {
      name: "9Mobile",
      logo: MobileLogo,
      id: 2,
      startNumbers: ["0809", "0909", "0817", "0818", "0908"],
    },
    {
      name: "GLO",
      logo: GLOLogo,
      id: 3,
      startNumbers: ["0705", "0805", "0811", "0807", "0815"],
    },
    {
      name: "Airtel",
      logo: AirtelLogo,
      id: 4,
      startNumbers: [
        "0802",
        "0902",
        "0701",
        "0808",
        "0708",
        "0812",
        "0901",
        "0907",
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sendRef.current && !sendRef.current.contains(event.target)) {
        if (!showModal) {
          dispatch(setShowAirtimeUI(false));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, showModal]);

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setShowNetworkList(false);
  };

  const handlePhoneInput = (event, setValue) => {
    const inputNumber = event.target.value;
    setPhoneNumber(inputNumber);
    if (inputNumber.length >= 4) {
      const matchedNetwork = networks.find((network) =>
        network.startNumbers.some((startNum) =>
          inputNumber.startsWith(startNum)
        )
      );
      if (matchedNetwork) {
        setSelectedNetwork(matchedNetwork);
        setValue(
          "selectedNetwork",
          selectedNetwork ? selectedNetwork.name : ""
        );
      }
    } else if (inputNumber.length < 4) {
      setSelectedNetwork(null);
      setValue("selectedNetwork", "");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setShowAirtimeUI(true));
  };

  const closeAirtimeModal = () => {
    dispatch(setShowAirtimeUI(false));
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    setFormatData(data);
    setShowModal(true);
  };

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)]">
      <div
        ref={sendRef}
        className={`flex item-center md:justify-center flex-col p-5 rounded-lg font-rob w-full h-full md:w-[450px] md:h-fit ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Airtime</h1>
          <RxCross2
            className="cursor-pointer"
            size={30}
            onClick={() => dispatch(setShowAirtimeUI(false))}
          />
        </div>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex gap-3 flex-col mt-5"
        >
          <div className="flex flex-col">
            <label className="text-xs mb-1">Phone Number</label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <input
                  className="h-10 w-full bg-transparent border border-white/1 pl-3"
                  placeholder="Enter Mobile Number"
                  maxLength={11}
                  type="tel"
                  value={field.value}
                  onChange={(e) => {
                    handlePhoneInput(e, setValue);
                    field.onChange(e);
                  }}
                />
              )}
              rules={{
                required: "Enter number",
                minLength: {
                  value: 11,
                  message: "Enter 11 digit number",
                },
              }}
            />

            {errors.phoneNumber && (
              <span className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col relative z-10">
            <label className="text-xs mb-1">Network Provider</label>
            <div className="relative">
              <Controller
                name="selectedNetwork"
                control={control}
                rules={{ required: "Select a network" }}
                render={({ field }) => (
                  <div>
                    <div
                      onClick={() => setShowNetworkList(!showNetworkList)}
                      className="h-10 w-full bg-transparent border border-white/1 text-start pl-3 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {selectedNetwork && (
                          <img
                            className="h-8 w-8"
                            src={selectedNetwork.logo}
                            alt={selectedNetwork.name}
                          />
                        )}
                      </div>
                      {selectedNetwork ? (
                        // Render the selected network as a read-only input
                        <input
                          className="h-10 w-full bg-transparent border-none pl-3 cursor-pointer"
                          type="text"
                          value={
                            selectedNetwork
                              ? selectedNetwork.name
                              : "Select network"
                          }
                          readOnly
                          {...field}
                          {...register("network", {
                            required: "Please select a bank",
                          })}
                        />
                      ) : (
                        // Render placeholder text if no network is selected
                        <input
                          className="h-10 w-full bg-transparent border-none pl-3 cursor-pointer"
                          type="text"
                          placeholder="Select network"
                          readOnly
                          {...field}
                          {...register("network", {
                            required: "Please select a bank",
                          })}
                        />
                      )}
                    </div>

                    {/* Conditionally render the error message */}
                    {errors.selectedNetwork && (
                      <span className="text-red-500 text-xs">
                        {errors.selectedNetwork.message}
                      </span>
                    )}

                    {showNetworkList && (
                      <ul
                        className="absolute top-full w-full bg-white shadow-lg rounded-lg overflow-y-auto max-h-48"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: darkMode
                            ? "#3c3f4f #1E1E1E"
                            : "#e4e4e7 #ffffff",
                        }}
                      >
                        {networks.map((network) => (
                          <li
                            key={network.id}
                            className={`${
                              darkMode
                                ? "bg-[#1E1E1E] text-white"
                                : "bg-white text-black"
                            } h-12 border border-[#fff]/1 flex items-center gap-3 px-3 cursor-pointer`}
                            onClick={() => {
                              handleNetworkSelect(network);
                              field.onChange(network.name); // Pass the selected network to onChange
                            }}
                          >
                            <img
                              className="h-8 w-8"
                              src={network.logo}
                              alt={network.name}
                            />
                            <span>{network.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="text-xs mb-1">Amount</label>
            <input
              className="h-10 w-full bg-transparent border border-white/1 pl-7"
              placeholder="Enter Amount"
              maxLength={4}
              type="tel"
              {...register("amount", {
                required: "Please enter an amount",
                min: {
                  value: 10,
                  message: "Minimum amount is 10",
                },
                max: {
                  value: 10000,
                  message: "maximmum amount is 10,000",
                },
              })}
            />
            <PiCurrencyDollarSimpleBold
              color="GhostSmoke"
              size={25}
              className="absolute top-7 left-1"
            />
          </div>
          {errors.amount && (
            <span className="text-red-500 text-xs">
              {errors.amount.message}
            </span>
          )}
          <button
            type="submit"
            className="h-10 w-full bg-colorPrimary"
            disabled={
              errors.amount || errors.phoneNumber || errors.selectedNetwork
            }
          >
            Continue
          </button>
        </form>
      </div>
      <AirtimeinfoModal
        isOpen={showModal}
        closeModal={closeModal}
        formData={formData}
        closeAirtimeModal={closeAirtimeModal}
      />
    </div>
  );
}

export default Airtime;
