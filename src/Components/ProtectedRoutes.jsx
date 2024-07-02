import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return user ? <Outlet /> : <Navigate to="/SignUpAndLogin" />;
};

export default ProtectedRoutes;
