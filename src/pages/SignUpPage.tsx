import { Link, useNavigate } from "react-router-dom";
import { stockMarketLogo } from "../assets";

import { FaFacebook, FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { signUp } from "../services/authService";

interface UserRegistration {
  email: string;
  password: string;
  name: string;
}

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
    passwordConfirmationError?: string;
  }>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    const errorsList: typeof errors = {};

    if (password.length < 6) {
      errorsList.passwordError = "Password must be at least 6 characters long";
      isValid = false;
      console.log("invalid password error");
    }
    if (password !== passwordConfirmation) {
      errorsList.passwordConfirmationError = "Passwords do not match";
      isValid = false;
      console.log("passwords dont match error");
    }
    setErrors(errorsList);

    return isValid;
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user: UserRegistration = {
      email,
      password,
      name,
    };

    try {
      const userCredentials = await signUp(user);
      if (!userCredentials) {
        setErrors({ emailError: "Failed to sign up. Please check details" });
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ emailError: "Sign-up error. Try again." });
    }
  };

  return (
    <>
      <section className="w-full md:container m-auto mt-[15%] md:mt-[10%] xl:mt-[5%]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <Link to="/" className="flex items-center mb-6 lg:w-[20%]">
            <img
              className="xl:w-[60%] h-[3rem] m-auto"
              src={stockMarketLogo}
              alt="logo"
            ></img>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
              <h2 className="text-[27px] md:text-[40px] font-semibold leading-tight">
                Create an Account
              </h2>

              <div className="flex justify-center">
                <button className="flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff]">
                  <FaGoogle className="text-xl" />
                  <span className="text-sm">Sign up with Google</span>
                </button>
                {/*   <button className="flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff]">
                  <FaFacebook className="text-xl" />
                  <span className="text-sm">Sign up with Facebook</span>
                </button> */}
              </div>
              <div className="flex items-center gap-2">
                <div className="border-b w-[45%]"></div>
                <div className="">or</div>
                <div className="border-b w-[45%]"></div>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(event) => setEmail(event?.target.value)} // Call on change                    required
                  />
                  {errors.emailError && (
                    <p className="error-text">{errors.emailError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  {errors.passwordError && (
                    <p className="error-text">{errors.passwordError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={passwordConfirmation}
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                    required
                  />
                  {errors.passwordConfirmationError && (
                    <p className="error-text">
                      {errors.passwordConfirmationError}
                    </p>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
