import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import logo from "../assets/blogger.png";
import { BlogContext } from "../context/BlogContext";

export default function TopBar() {
  const { isLogin, setIsLogin, active, setActive, openNav, setOpenNav } =
    useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/"
          onClick={() => {
            setOpenNav(false);
            setActive("Home");
          }}
          className="flex items-center"
        >
          <p className={` ${active === "Home" && "border-b-2 border-black"}`}>
            Home
          </p>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/about"
          onClick={() => {
            setOpenNav(false);
            setActive("About");
          }}
          className="flex items-center"
        >
          <p className={` ${active === "About" && "border-b-2 border-black"}`}>
            About Us
          </p>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full ">
      <Navbar className="sticky top-0 z-10 max-w-full px-4 py-0 rounded-none h-max ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-bold text-xl flex gap-2"
          >
            <img src={logo} className="w-10 h-10" />
            <Typography variant="h3" color="indigo" className="mb-0">
              BlogSite
            </Typography>
          </Link>

          <div className="hidden mr-4 lg:block">{navList}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-2">
              {isLogin ? (
                <ProfileMenu />
              ) : (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    color="indigo"
                    className="hidden border-2 border-indigo-400 rounded-lg lg:inline-block"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    color="indigo"
                    className="hidden rounded-lg lg:inline-block"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          {!isLogin && (
            <div className="flex items-center mb-2 gap-x-1 md:mb-0">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className="border-2 border-indigo-400 rounded-lg"
                onClick={() => {
                  setOpenNav(false);
                  navigate("/login");
                }}
              >
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                variant="gradient"
                color="indigo"
                size="sm"
                className=""
                onClick={() => {
                  setOpenNav(false);
                  navigate("/signup");
                }}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </MobileNav>
      </Navbar>
    </div>
  );
}
