import React, { useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { Typography } from "@material-tailwind/react";
import blog from "../assets/blog2.jpg";
import Dummy from "../context/Dummy";
import BlogCard from "../components/BlogCard";
import commonAxios from "../components/AxiosInstance";
const HomePage = () => {
  const { isLogin, blogs, setBlogs } = useContext(BlogContext);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const { data } = await commonAxios.get("/api/v1/blog/all"); // Replace with your actual API endpoint
        setBlogs(data.blogs);
        console.log(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="">
      <figure className="relative h-96 w-full">
        <img
          className="h-96 w-full object-cover object-center"
          height={"500px"}
          src={blog}
        />
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div className="flex ">
            <Typography
              className="text-3xl md:text-4xl lg:text-4xl font-bold"
              color="blue-gray"
            >
              Unleash Your Thoughts, Inspire the World: Blogging Beyond
              Boundaries!
            </Typography>
          </div>
        </figcaption>
      </figure>

      <div className="container mt-5">
        <Typography
          className="text-3xl md:text-4xl lg:text-4xl font-bold"
          color="blue-gray"
        >
          Latest Blogs
        </Typography>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 justify-items-center">
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {/* {JSON.stringify(blogs)} */}
      </div>
    </div>
  );
};

export default HomePage;
