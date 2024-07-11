import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import { useTransferMoney } from "../services/TransferMoney";
import { useForm } from "react-hook-form";

const useSendInfoModal = ({
  isOpen,
  closeModal,
  formData,
  closeSendModal,
  accountName,
}) => {
  const darkMode = useSelector((state) => state.darkMode);
  const recipientAccountNumber = formData?.accountNumber;
  const amount = formData?.amount;
  const { accountData, customerData } = useContext(AccountContext);
  const accountId = accountData.map((acc) => acc.accountId);
  const accountBalance = accountData.map((acc) => acc.accountBalance);
  const savingsBalance = accountData.map((acc) => acc.savingsBalance);
  const creditCardBalance = accountData.map((acc) => acc.creditCardBalance);
  const [error, setError] = useState(null);

  const {
    transferMoney,
    transactionSuccess,
    setTransactionSuccess,
    isTransferring,
    transferError,
  } = useTransferMoney();

  // FullName of Account
  const senderfullName = customerData
    ?.map((customer) => {
      const capitalizeLastName =
        customer.lastName.charAt(0).toUpperCase() +
        customer.lastName.slice(1).toLowerCase();
      const capitalizeFirst =
        customer.firstName.charAt(0).toUpperCase() +
        customer.firstName.slice(1).toLowerCase();

      // Format the full name with a space in between
      const fullName = `${capitalizeLastName} ${capitalizeFirst}`;
      console.log(fullName); // This will log each name

      // Return the formatted name directly
      return fullName;
    })
    .join(" ");

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  const pinInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && pinInputRef.current) {
      // Focus the pin input when the component mounts
      pinInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (transferError?.message === "incorrect pin") {
      clearErrors("pin");
      setValue("pin", ""); // Clear the pin input
    }
    setError(transferError?.message);
  }, [transferError, clearErrors, setValue]);

  const onSubmit = (data) => {
    const pin = data.pin;
    const balanceType = data.balanceType;
    const formattedAmount = parseInt(amount.replace(/,/g, ""), 10);
    transferMoney({
      accountId,
      amount: formattedAmount,
      pin,
      accountName,
      recipientAccountNumber,
      senderfullName,
      balanceType,
    });
  };

  function removeCommas(numberString) {
    return numberString?.replace(/,/g, "");
  }

  function handleClose() {
    closeSendModal();
    setTransactionSuccess(false);
  }

  const handleClosePaymentModal = useCallback(() => {
    clearErrors("pin");
    setValue("pin", ""); // Clear the pin input
    setError(null);
    closeModal();
  }, [clearErrors, setValue, closeModal, setError]);

  function handlePin() {
    clearErrors("pin");
    setError(null);
  }

  return {
    darkMode,
    accountBalance,
    savingsBalance,
    creditCardBalance,
    error,
    transactionSuccess,
    isTransferring,
    control,
    handleSubmit,
    errors,
    onSubmit,
    removeCommas,
    handleClose,
    handleClosePaymentModal,
    handlePin,
    pinInputRef,
  };
};

export default useSendInfoModal;
