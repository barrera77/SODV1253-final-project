import { Link } from "react-router-dom";
import { stockMarketLogo } from "../assets";
import { FaGoogle } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../constants";
import { useLogin } from "../hooks";

const LoginPage = () => {
  const { setLogin, signInWithGoogle, handleLogin, navigate } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await handleLogin(email, password);
    reset();
  };
  return (
    <>
      <section className="w-full md:container m-auto">
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
                Sign in
              </h2>

              <div className="flex justify-center">
                <button
                  onClick={signInWithGoogle}
                  className="btn flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff]"
                >
                  <FaGoogle className="text-xl" />
                  <span className="text-sm">Sign in with Google</span>
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
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="p-1 text-[13px] font-light  text-orange-500">
                      Please enter a valid email.
                    </p>
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
                    id="password"
                    placeholder="*******"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters long",
                      },
                      maxLength: {
                        value: 60,
                        message: "Password must not exceed 60 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="p-1 text-[13px] font-light text-orange-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setLogin(true)}
                  className="cursor-pointer w-full border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="submit"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up now
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
