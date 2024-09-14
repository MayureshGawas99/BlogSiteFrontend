import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonAxios from "../components/AxiosInstance";
import {
  Avatar,
  CardFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

const BlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const { blogid } = useParams();
  const getDate = (date) => {
    const inputDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const { data } = await commonAxios.get(
          `/api/v1/blog/single/${blogid}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setBlogData(data.blogs);
        console.log(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogDetails(blogid);
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      {blogData?.image && (
        <div className="flex justify-center">
          <img
            src={blogData?.image}
            alt={blogData?.title}
            className="mb-4 rounded-lg "
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">{blogData?.title}</h2>
      <p className="text-gray-700 mb-4 text-justify">{blogData?.text}</p>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3 text-sm text-gray-500">
          <Tooltip content={blogData?.user.name}>
            <div>
              <Avatar
                size="sm"
                variant="circular"
                alt="natali craig"
                src={blogData?.user.pic}
                className="border-2 border-white hover:z-10"
              />
              <span className="ml-2">By, {blogData?.user.name}</span>
            </div>
          </Tooltip>
        </div>
        <Typography className="font-normal text-sm text-gray-500">
          {getDate(blogData?.createdAt)}
        </Typography>
      </CardFooter>
    </div>
  );
};

export default BlogPage;
