import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../supabase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession(); // Updated method to get session

      if (error) {
        toast.error(error);
      } else {
        setSession(data.session); // Set session data
      }

      setLoading(false); // Stop loading after session check
    };

    getSession(); // Fetch the session on mount
  }, []);

  // While checking session, show a loading spinner or message
  if (loading) {
    return (
      <div
        className={`fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 101 101"
          className="w-8 h-8 spin-animation"
        >
          <path
            fill="#00446A"
            d="M48.734 2.797A6 6 0 0 1 53.808 0h36.31c4.724 0 7.595 5.207 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 80h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
          ></path>
          <path
            fill="#00A3FF"
            d="M48.734 23.797A6 6 0 0 1 53.808 21h36.31c4.724 0 7.595 5.208 5.073 9.203l-42.925 68A6 6 0 0 1 47.192 101h-36.31c-4.724 0-7.595-5.207-5.073-9.203z"
          ></path>
        </svg>
      </div>
    );
  }

  // If no session exists, redirect to the login page
  if (!session) {
    return <Navigate to="/SignUpAndLogin" replace />;
  }

  console.log(session);
  // If session exists, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
