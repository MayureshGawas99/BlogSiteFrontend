import { Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from "../components/AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { BlogContext } from "../context/BlogContext";
axios.defaults.withCredentials = true;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(BlogContext);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      e.preventDefault();
      const { data } = await commonAxios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("auth-token", data.authToken);
      localStorage.setItem("userid", data.user._id);
      setIsLogin(true);
      navigate("/");
      setTimeout(() => {
        enqueueSnackbar("Log in Successfull", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }, 1000);
      console.log(data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <div className="g-6 flex h-full flex-wrap items-center  justify-center lg:justify-between">
      {/* Left column container with background*/}
      <div className="mb-12 md:mb-0 md:w-6/12 md:p-5 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          alt="Phone image"
        />
      </div>
      {/* Right column container with form */}
      <div className="md:w-8/12 lg:px-10 lg:w-5/12 md:mt-2 sm:w-8/12 sm::mt-2">
        <form>
          {/* Email input */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input
              size="lg"
              label="Email"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {/* Password input */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input
              size="lg"
              label="Password"
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {/* Remember me checkbox */}

          {/* Submit button */}
          <button
            type="submit"
            className="inline-block w-full  middle none center mr-4 rounded-lg bg-light-blue-900 py-4 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={(e) => handleLogin(e)}
          >
            LOG IN
          </button>
          {/* Divider */}
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              OR
            </p>
          </div>
          {/* Social login buttons */}

          <button
            className="inline-block w-full  middle none center mr-4 rounded-lg bg-indigo-900 py-4 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
