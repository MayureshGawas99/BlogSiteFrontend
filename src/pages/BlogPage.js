import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonAxios from "../components/AxiosInstance";
import {
  Avatar,
  CardFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FaHeart, FaRegComments, FaRegHeart } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";

const BlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const { blogid } = useParams();
  const [loading, setLoading] = useState(true);
  const getDate = (date) => {
    const inputDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    getBlogDetails(blogid);
  }, []);

  return (
    <div className="flex justify-center h-full bg-gray-100">
      <div className="w-[90%]  my-8 p-6 bg-white rounded-md shadow-md">
        {loading ? (
          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <CardFooter className="flex flex-row items-center gap-2 p-0 cursor-pointer">
              <Avatar
                size="md"
                variant="circular"
                alt="natali craig"
                src={blogData?.user.pic}
                className="border-2 border-white hover:z-10"
              />
              <div className="flex flex-col flex-grow text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                <div className="text-base text-black">
                  {" "}
                  {blogData?.user.name}
                </div>
                <Typography className="text-sm font-normal text-gray-500">
                  On, {getDate(blogData?.createdAt)}
                </Typography>
              </div>
            </CardFooter>
            <hr class="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            {blogData?.image && (
              <div className="flex justify-center">
                <img
                  src={blogData?.image}
                  alt={blogData?.title}
                  className="w-auto mb-4 rounded-lg"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold ">{blogData?.title}</h2>
            <div
              className="mb-4 text-justify text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogData?.text }}
            ></div>
            {/* <hr class="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

<div className="flex flex-row gap-5">
<div className="flex flex-row items-center gap-1">
  <FaRegHeart /> <span>50</span>
</div>
<div className="flex flex-row items-center gap-1">
  <FaHeart className="text-red-500" /> <span>50</span>
</div>
<div className="flex flex-row items-center gap-1">
  <LiaCommentSolid size={20} /> <span>10</span>
</div>
</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
