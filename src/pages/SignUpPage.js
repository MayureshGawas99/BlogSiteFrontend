import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commonAxios from "../components/AxiosInstance";
import { enqueueSnackbar } from "notistack";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const { data } = await commonAxios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      navigate("/login");
      setTimeout(() => {
        enqueueSnackbar("Log in Successfull", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-full px-0 login-bg md:justify-start lg:px-20 md:px-16">
      <div className="w-10/12 md:w-8/12 lg:px-10 lg:w-5/12 glassmorphism ">
        <form>
          <div className="mb-5 text-lg font-bold md:text-3xl">
            Sign Up with us
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input
              size="lg"
              label="Name"
              type="text"
              required
              className="text-black placeholder-shown:border-black placeholder-shown:border-t-black"
              labelProps={{
                className: "peer-placeholder-shown:text-black", // Style the label for dark theme
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input
              size="lg"
              label="Email"
              type="email"
              required
              className="text-black placeholder-shown:border-black placeholder-shown:border-t-black"
              labelProps={{
                className: "peer-placeholder-shown:text-black", // Style the label for dark theme
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input
              size="lg"
              label="Password"
              type="password"
              required
              className="text-black placeholder-shown:border-black placeholder-shown:border-t-black "
              labelProps={{
                className: "peer-placeholder-shown:text-black", // Style the label for dark theme
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            class="inline-block w-full  middle none center mr-4 rounded-lg bg-light-blue-900 py-4 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={(e) => handleSignUp(e)}
          >
            SIGN UP
          </button>
          {/* <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 font-semibold text-center dark:text-neutral-200">
              OR
            </p>
          </div>

          <button
            class="inline-block w-full  middle none center mr-4 rounded-lg bg-indigo-900 py-4 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => navigate("/login")}
          >
            Login
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
