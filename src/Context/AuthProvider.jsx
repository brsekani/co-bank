import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "../supabase";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data: userData, error } = await supabase
        .from("customers")
        .select("email, password, customerId")
        .eq("email", email)
        .single();

      if (error) throw new Error(error.message);
      console.log(email, password);
      console.log(userData);

      // const validEmail = await bcrypt.compare(email, userData.email);
      // const validPassword = await bcrypt.compare(password, userData.password);
      const validEmail = userData.email === email;
      const validPassword = userData.password === password;
      if (!validEmail || !validPassword)
        throw new Error("Incorrect email or password");

      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("accountId")
        .eq("customerId", userData.customerId)
        .single();

      if (accountError) throw new Error(accountError.message);

      const { customerId } = userData;
      const { accountId } = accountData;
      setUser({ customerId, accountId });
      sessionStorage.setItem("user", JSON.stringify({ customerId, accountId }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
