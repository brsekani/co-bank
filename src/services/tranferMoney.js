import supabase from "../supabase";

const tranferMoney = async (
  AccountId,
  receiverAccountId,
  amount,
  description
) => {
  // Fetch sender and receiver account information
  const { data: senderAccount, error: senderError } = await supabase
    .from("accounts")
    .select("accountId", AccountId)
    .single();

  // Check if sender has sufficient Balance
  if (senderError) {
    throw new Error(
      senderError.message || "Errors fetchimg sender account data"
    );
  }

  const senderBalance = senderAccount.accountBalance;

  if (senderBalance < amount) {
    throw new Error("Insufficent balance to transfer");
  }
};
