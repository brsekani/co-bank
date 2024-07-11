import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "../Context/AccountContext";
import coBankImage from "../assets/cobank.svg";
import { setShowSendUI } from "../Features/uiSlice";
import { useForm } from "react-hook-form";
import supabase from "../supabase";

const useSend = () => {
  const dispatch = useDispatch();
  const sendRef = useRef(null);
  const accountNumberInputRef = useRef(null);

  const darkMode = useSelector((state) => state.darkMode);
  const { showSendUI } = useSelector((state) => state.ui);

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankList, setShowBankList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormatData] = useState({});
  const [accountName, setAccountName] = useState("");
  const [accountNotFound, setAccountNotFound] = useState("");
  const [loadingAccName, setLoadingAccountName] = useState(false);

  const { accountData } = useContext(AccountContext);
  const senderAccouuntNum = accountData.at(0).accountNumber;

  useEffect(() => {
    console.log(showSendUI, accountNumberInputRef.current);
    if (showSendUI && accountNumberInputRef.current) {
      accountNumberInputRef.current.focus();
    }
  }, [showSendUI, accountNumberInputRef]);

  console.log(accountName);

  // WILL BE USED LATER
  // useEffect(() => {
  //   const fetchBanks = async () => {
  //     try {
  //       const response = await fetch("https://nigerianbanks.xyz");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();

  //       const coBank = {
  //         name: "Co Bank",
  //         image: coBankImage,
  //       };

  //       setBanks([coBank, ...data]);
  //     } catch (error) {
  //       console.error("Error fetching banks:", error);
  //     }
  //   };

  //   fetchBanks();
  // }, []);

  useEffect(() => {
    const coBank = {
      name: "Co Bank",
      logo: coBankImage,
    };

    setBanks([coBank]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sendRef.current && !sendRef.current.contains(event.target)) {
        if (!showModal) {
          dispatch(setShowSendUI(false));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, showModal]);

  // Define a function to format the number
  const formatNumber = (value) => {
    const parts = value.replace(/[^0-9]/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // To make the send modal close when i go back on devices like mobile and others
  useEffect(() => {
    const handlePopState = () => {
      dispatch(setShowSendUI(false));
    };

    if (showSendUI) {
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch, showSendUI]);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setValue("bankName", bank.name); // Update the form data with the selected bank name
    setShowBankList(false);
    clearErrors("bankName");
    setAccountNotFound("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    control,
  } = useForm();

  const fetchAccountInfo = async (accountNumber, bankName) => {
    setLoadingAccountName(true);
    const bank_name = bankName.toLowerCase();
    try {
      if (senderAccouuntNum === accountNumber) {
        throw new Error("You cannot send money to your own account.");
      } else {
        const { data: centralizedAccountInformation, error } = await supabase
          .from("centralizedAccountInformation")
          .select("*")
          .eq("account_number", accountNumber)
          .eq("bank_name", bank_name);
        console.log(centralizedAccountInformation);
        if (error)
          throw new Error("Bad or No network please check your connect");
        if (
          !centralizedAccountInformation ||
          centralizedAccountInformation.length === 0
        ) {
          throw new Error(
            "No account information found for the provided account number and bank name."
          );
        }
        return centralizedAccountInformation;
      }
    } catch (error) {
      setAccountNotFound(error.message);
    } finally {
      setLoadingAccountName(false);
    }
  };

  const onSubmit = async (data) => {
    const accountInfo = await fetchAccountInfo(
      data.accountNumber,
      data.bankName
    );

    const account_name = accountInfo?.at(0)?.account_name;

    if (account_name) {
      setAccountName(account_name);
      setFormatData(data);
      setShowModal(true);
      setAccountNotFound(""); // Clear previous error message
    }
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setShowSendUI(true));
  };

  const closeSendModal = () => {
    dispatch(setShowSendUI(false));
  };
  return {
    sendRef,
    darkMode,
    dispatch,
    handleSubmit,
    onSubmit,
    control,
    setAccountNotFound,
    errors,
    accountNumberInputRef,
    setShowBankList,
    showBankList,
    selectedBank,
    register,
    banks,
    handleBankSelect,
    formatNumber,
    setValue,
    accountNotFound,
    loadingAccName,
    showModal,
    closeModal,
    formData,
    closeSendModal,
    accountName,
  };
};

export default useSend;
