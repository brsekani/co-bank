import { useMutation } from "@tanstack/react-query";
import { login, register, logout } from "../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      console.log("User logged in:", user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      console.log("User registered:", user);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("User logged out");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
