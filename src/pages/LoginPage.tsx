import { Link } from "react-router-dom";
import { stockMarketLogo } from "../assets";
import { auth } from "../Services/fireBaseConfig";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
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

              <div className="flex md:justify-between md:flex-row flex-col gap-3">
                <button className="flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff]">
                  <FaGoogle className="text-xl" />
                  <span className="text-sm">Sing in with Google</span>
                </button>
                <button className="flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff]">
                  <FaFacebook className="text-xl" />
                  <span className="text-sm">Sing in with Facebook</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-b w-[45%]"></div>
                <div className="">or</div>
                <div className="border-b w-[45%]"></div>
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
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
                    required
                  />
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
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border border-[#0b022d] hover:bg-[#0b022d] hover:text-[#fff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dom't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
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

export default LoginPage;
