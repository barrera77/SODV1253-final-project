// hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const useLogin = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (login) {
        await signIn(email, password);
      } else {
        setLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      window.alert("Something went wrong. Please check your credentials.");
    }
  };

  return {
    login,
    setLogin,
    signInWithGoogle,
    handleLogin,
    navigate,
  };
};
