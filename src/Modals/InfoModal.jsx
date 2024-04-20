import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import useFormatBalance from "../Hooks/useFormatBalance";

const InfoModal = ({ isOpen, closeModal, formData }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const darkMode = useSelector((state) => state.darkMode);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function removeCommas(numberString) {
    return numberString?.replace(/,/g, "");
  }

  const handleInputChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] =
      e.target.value.length > 0
        ? e.target.value[e.target.value.length - 1]
        : "";
    setPin(newPin);

    if (index < inputRefs.current.length - 1 && e.target.value.length > 0) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && pin[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,.486)] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`flex item-center md:justify-center flex-col p-5 rounded-lg font-rob w-full h-full md:w-[450px] md:h-fit ${
          darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1>Payment</h1>
          <RxCross2
            size={25}
            className="cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <h1 className="text-center text-3xl mt-2 text-colorPrimary">
          {useFormatBalance(Number(removeCommas(formData.Amount)) + 1)}
        </h1>

        <div className="mt-2 px-5">
          <div className="flex items-center justify-between">
            <p className="text-sm">Fee</p>
            <p>$1</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Account Number</p>
            <p>{formData.accountNumber}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Name</p>
            <p>Lawal Temidayo</p>
          </div>
        </div>

        <div className="mt-3">
          <h1>Payment Method</h1>

          <div className="flex items-start justify-between">
            <p>Balance</p>
            <p>{useFormatBalance(1000)}</p>
          </div>

          <form>
            <div className="flex items-center justify-between">
              <label>Password</label>
              <div className="flex items-center justify-center space-x-4">
                {pin.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    autoFocus={isOpen}
                    type="password"
                    maxLength={1}
                    className="w-12 h-12 text-4xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={value}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
            </div>
            <button className="h-10 w-full bg-colorPrimary rounded-md mt-5">
              Confirm to Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default InfoModal;
