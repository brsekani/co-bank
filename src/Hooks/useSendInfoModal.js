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
  const { accountData, userData } = useContext(AccountContext);
  const account_id = accountData.map((acc) => acc.account_id);
  const accountBalance = accountData.map((acc) => acc.account_balance);
  const savingsBalance = accountData.map((acc) => acc.savings_balance);
  const creditCardBalance = accountData.map((acc) => acc.credit_card_balance);
  const [error, setError] = useState(null);

  const {
    transferMoney,
    transactionSuccess,
    setTransactionSuccess,
    isTransferring,
    transferError,
  } = useTransferMoney();

  // FullName of Account
  const senderfullName = userData
    ?.map((customer) => {
      const capitalizeLastName =
        customer.last_name.charAt(0).toUpperCase() +
        customer.last_name.slice(1).toLowerCase();
      const capitalizeFirst =
        customer.first_name.charAt(0).toUpperCase() +
        customer.first_name.slice(1).toLowerCase();

      // Format the full name with a space in between
      const fullName = `${capitalizeLastName} ${capitalizeFirst}`;

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
      account_id,
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

  function handleSelectPaymentMethod() {
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
    handleSelectPaymentMethod,
  };
};

export default useSendInfoModal;
