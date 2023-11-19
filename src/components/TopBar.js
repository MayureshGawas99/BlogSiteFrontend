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
import { BlogContext } from "../context/BlogContext";

export default function TopBar() {
  const [openNav, setOpenNav] = useState(false);
  const { isLogin, setIsLogin, active, setActive } = useContext(BlogContext);
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
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/"
          onClick={() => setActive("Home")}
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
          onClick={() => setActive("About")}
          className="flex items-center"
        >
          <p className={` ${active === "About" && "border-b-2 border-black"}`}>
            About Us
          </p>
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/contactus"
          onClick={() => setActive("Contact Us")}
          className="flex items-center"
        >
          <p
            className={`${
              active === "Contact Us" && "border-b-2 border-black"
            }`}
          >
            Contact Us
          </p>
        </Link>
      </Typography> */}
    </ul>
  );

  return (
    <div className="w-full ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2  ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/" className="mr-4 cursor-pointer py-1.5 font-bold text-xl">
            <Typography variant="h3" color="indigo">
              BlogSite
            </Typography>
          </Link>

          <div className="mr-4 hidden lg:block">{navList}</div>
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
                    className="hidden lg:inline-block"
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
                    className="hidden lg:inline-block"
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
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
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
                  className="h-6 w-6"
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
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className=""
                onClick={() => {
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
                  navigate("/signup");
                }}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </MobileNav>
      </Navbar>
      {/* <div className="mx-auto max-w-screen-md py-12">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          What is Material Tailwind
        </Typography>
        <Typography color="gray" className="font-normal">
          Can you help me out? you will get a lot of free exposure doing this
          can my website be in english?. There is too much white space do less
          with more, so that will be a conversation piece can you rework to make
          the pizza look more delicious other agencies charge much lesser can
          you make the blue bluer?. I think we need to start from scratch can my
          website be in english?, yet make it sexy i&apos;ll pay you in a week
          we don&apos;t need to pay upfront i hope you understand can you make
          it stand out more?. Make the font bigger can you help me out? you will
          get a lot of free exposure doing this that&apos;s going to be a chunk
          of change other agencies charge much lesser. Are you busy this
          weekend? I have a new project with a tight deadline that&apos;s going
          to be a chunk of change. There are more projects lined up charge extra
          the next time.
        </Typography>
      </div> */}
    </div>
  );
}
