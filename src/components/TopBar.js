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
import commonAxios from "./AxiosInstance";

export default function TopBar() {
  const {
    active,
    setActive,
    user,
    setUser,
    openNav,
    setOpenNav,
    jwt,
    setSearchTerm,
  } = useContext(BlogContext);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await commonAxios.get("/api/v1/auth/getuser/user", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }); // Replace with your actual API endpoint
        // console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        localStorage.removeItem("auth-token");
      }
    };
    getUserInfo();
  }, [jwt, setUser]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput.trim() !== "") {
        setSearchTerm(searchInput);
        console.log(searchInput);
      } else {
      }
    }, 1000); // Waits for 1 second before navigating

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if the user types again
  }, [searchInput, setSearchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search`);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [setOpenNav]);

  const navList = (
    <ul className="flex flex-col gap-2 pl-0 mt-2 mb-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="indigo"
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
        color="indigo"
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

      <form className="lg:hidden" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="Search Blogs or Users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute bottom-[5px] px-3 py-1 text-sm font-medium text-white bg-indigo-700 rounded-lg end-[5px] hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Search
          </button>
        </div>
      </form>
    </ul>
  );

  return (
    <div className="w-full ">
      <Navbar className="max-w-full px-4 py-1 rounded-none ">
        <div className="flex items-center justify-between text-indigo-gray-900">
          <Link
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-bold text-xl flex gap-2"
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <Typography variant="h3" color="indigo" className="mb-0">
              BlogSite
            </Typography>
          </Link>

          <form
            className="hidden max-w-md mx-auto lg:block"
            onSubmit={handleSearch}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[20rem] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Search Blogs or Users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute bottom-[5px] px-3 py-1 text-sm font-medium text-white bg-indigo-700 rounded-lg end-[5px] hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-row items-center gap-5">
            <div className="hidden mr-4 lg:block">{navList}</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-2">
                {user ? (
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
        </div>
        <MobileNav open={openNav}>
          {navList}
          {!user && (
            <div className="flex items-center mb-2 gap-x-2 md:mb-0">
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
