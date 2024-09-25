import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user } = useSelector((state) => state?.auth); // Get user from Redux state

  // Log the user object in a formatted JSON string for better readability
  // console.log("User state from Redux:", JSON.stringify(user, null, 2));

  console.log(user);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
// Props validation using PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
