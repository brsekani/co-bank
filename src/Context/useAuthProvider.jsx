import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";

export const useAuthProvider = () => {
  const authContext = useContext(AuthContext); // Use AuthContext directly
  console.log(authContext);
  return authContext;
};
