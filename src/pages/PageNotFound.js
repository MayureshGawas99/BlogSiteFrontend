import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-4">
        <p className="font-extrabold text-center text-8xl md:text-9xl ">404</p>
        <p className="text-3xl font-extrabold text-center">Page Not Found</p>
        <Button
          color="indigo"
          variant="gradient"
          className="p-2"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
