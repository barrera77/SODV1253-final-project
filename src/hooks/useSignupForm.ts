import { UserRegistration, FormErrors } from "../constants";
import { useState } from "react";
import { signUp } from "../Services";
import { useNavigate } from "react-router-dom";

export const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    const errorsList: FormErrors = {};

    if (email.length === 0) {
      errorsList.emailError = "Email is required";
      isValid = false;
    }

    if (password.length < 6) {
      errorsList.passwordError = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (password !== passwordConfirmation) {
      errorsList.passwordConfirmationError = "Passwords do not match";
      isValid = false;
    }

    setErrors(errorsList);
    return isValid;
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const user: UserRegistration = { email, password, name };

    try {
      const userCredentials = await signUp(user);
      if (!userCredentials) {
        setErrors({ emailError: "Failed to sign up. Please check details" });
      } else {
        alert("Account created successfully!");
        navigate("/dashboard");
      }
    } catch {
      setErrors({ emailError: "Sign-up error. Try again." });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    passwordConfirmation,
    setPasswordConfirmation,
    errors,
    handleSignUp,
  };
};
