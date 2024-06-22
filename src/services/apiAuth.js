import supabase from "../supabase";

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session.session) {
    return null;
  }

  const { data: customerData, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("email", session.session.user.email);

  if (customerError) {
    throw new Error(customerError.message);
  }

  if (customerData.length === 0) {
    throw new Error("Customer not found");
  }

  const customerId = customerData[0].customerId;

  const { data: accountData, error: accountError } = await supabase
    .from("accounts")
    .select("*")
    .eq("customerId", customerId);

  if (accountError) {
    throw new Error(accountError.message);
  }

  if (accountData.length === 0) {
    throw new Error("Account not found");
  }

  const accountId = accountData[0].accountId;

  return { customerId, accountId };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data.user);
  return data.user;
}
