import { useState } from "react";
import coBankLogo from "../assets/cobank.svg";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { login, reset } from "../Features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function SignUpAndLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, isError, isLoading } = useSelector((state) => state?.auth); // Get user from Redux state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle input change to reset error and message
  const handleInputLogInChange = () => {
    if (isError || message) {
      dispatch(reset());
    }
  };

  const sigUpOnSubmit = (data) => {
    console.log(data);
  };

  const loginOnSubmit = async (data) => {
    const resultAction = await dispatch(
      login({ email: data.emailAddress, password: data.password })
    );

    if (resultAction.type === "auth/login/fulfilled") {
      navigate("/dashboard", { replace: true });
      dispatch(reset());
    } else if (resultAction.type === "auth/login/rejected") {
      // Optionally, handle the case where login failed, e.g., show an error message
      console.log("Login failed. Please try again.");
    }
  };

  return (
    <div className="grid w-screen h-screen font-mono place-items-center bg-[#ececec]">
      <div className="h-full max-w-full p-8 overflow-hidden bg-white shadow-lg sm:h-fit sm:max-w-sm wrapper sm:rounded-2xl">
        <div className="flex items-center justify-center mb-4">
          <img className="w-10 h-10" src={coBankLogo} alt="Co-Bank" />
        </div>
        <div className="flex w-[200%]">
          <div
            className={`w-1/2 sm:text-4xl text-2xl font-semibold text-center transition-transform duration-600 ease-in-out ${
              !isLogin ? "-translate-x-full" : ""
            }`}
          >
            Secure Login
          </div>
          <div
            className={`title w-1/2 sm:text-4xl text-2xl font-semibold text-center transition-transform duration-600 ease-in-out ${
              isLogin ? "" : "-translate-x-full"
            }`}
          >
            Join Now
          </div>
        </div>
        <div className="mt-4 sm:mt-8 form-container">
          <div className="relative flex items-center justify-between h-12 overflow-hidden border border-gray-300 slide-controls rounded-xl">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              className="hidden"
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              className="hidden"
            />
            <label
              onClick={isLoading ? null : () => setIsLogin(true)}
              className={`z-10 flex items-center justify-center w-full h-full pb-1 text-lg font-medium text-center transition-colors ease-in-out cursor-pointer slide duration-600 ${
                isLogin ? "text-white" : ""
              }`}
            >
              Login
            </label>
            <label
              onClick={isLoading ? null : () => setIsLogin(false)}
              className={`z-10 flex items-center justify-center w-full h-full pb-1 text-lg font-medium text-center transition-colors ease-in-out cursor-pointer slide duration-600 ${
                !isLogin ? "text-white" : ""
              }`}
            >
              Signup
            </label>
            <div
              className={`slider-tab absolute h-full w-1/2 bg-colorPrimary rounded-xl transition-all duration-600 ease-in-out ${
                !isLogin ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
          <div
            className="flex justify-center w-[200%] transition-transform duration-600 ease-in-out items-center "
            style={{
              transform: isLogin ? "translateX(0)" : "translateX(-50%)",
            }}
          >
            <form
              onSubmit={handleSubmit(loginOnSubmit)}
              className={`w-1/2 ${!isLogin ? "pr-10" : ""}`}
              noValidate
            >
              <div className="mt-5 field">
                <input
                  {...register("emailAddress", {
                    required: "Enter Email",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  placeholder="Email Address"
                  defaultValue="text@supabase.com"
                  autoComplete="off"
                  className="w-full h-12 px-4 transition-all border border-gray-300 rounded-xl focus:border-colorPrimary"
                  onChange={handleInputLogInChange}
                  disabled={isLoading}
                />
                {errors?.emailAddress && (
                  <span className="text-sm text-red-500">
                    {errors.emailAddress.message}
                  </span>
                )}
              </div>

              <div className="mt-5 field">
                <input
                  {...register("password", { required: "Enter Password" })}
                  type="password"
                  placeholder="Password"
                  defaultValue="12345qwer"
                  required
                  className="w-full h-12 px-4 transition-all border border-gray-300 rounded-xl focus:border-colorPrimary"
                  onChange={handleInputLogInChange}
                  disabled={isLoading}
                />
                {errors?.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {isError && (
                <p className="mt-2 text-sm text-red-600">{message}</p>
              )}
              <div className="text-right ">
                <a href="#" className=" text-colorPrimary hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="relative mt-5 overflow-hidden field btn rounded-xl">
                <div className="btn-layer absolute h-full w-[300%] left-[-100%] bg-colorPrimary rounded-xl transition-all"></div>
                <button
                  className="relative z-10 w-full h-10 text-sm font-medium text-white border-none cursor-pointer bg-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="mt-4 text-center signup-link">
                Not a member?{" "}
                <a
                  href="#"
                  onClick={() => setIsLogin(false)}
                  className="text-colorPrimary hover:underline"
                >
                  Signup now
                </a>
              </div>
            </form>
            <form
              action="#"
              className={`w-1/2 ${isLogin ? "pl-10" : ""} signup`}
              onSubmit={handleSubmit(sigUpOnSubmit)}
            >
              <div className="mt-5 field">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  className="w-full h-12 px-4 transition-all border border-gray-300 rounded-xl focus:border-colorPrimary"
                />
              </div>
              <div className="mt-5 field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full h-12 px-4 transition-all border border-gray-300 rounded-xl focus:border-colorPrimary"
                />
              </div>
              <div className="mt-5 field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  className="w-full h-12 px-4 transition-all border border-gray-300 rounded-xl focus:border-colorPrimary"
                />
              </div>
              <div className="relative mt-5 overflow-hidden field btn rounded-xl">
                <div className="btn-layer absolute h-full w-[300%] left-[-100%] bg-colorPrimary rounded-xl transition-all"></div>
                <button className="relative z-10 w-full h-10 text-sm font-medium text-white border-none cursor-pointer bg-none">
                  Signup
                </button>
              </div>
              <div className="mt-4 text-center signup-link">
                Already a member?{" "}
                <a
                  href="#"
                  onClick={() => setIsLogin(true)}
                  className="text-colorPrimary hover:underline"
                >
                  Login now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpAndLogin;
