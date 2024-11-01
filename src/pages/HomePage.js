import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { Typography } from "@material-tailwind/react";
import blog from "../assets/blog2.jpg";
import BlogCard from "../components/BlogCard";
import commonAxios from "../components/AxiosInstance";
import Spinner from "../components/Spinner";
const HomePage = () => {
  const { blogs, setBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get("/api/v1/blog/all");
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="my-5">
      <figure className="relative w-full h-96">
        <img
          className="object-cover object-center w-full h-96"
          height={"500px"}
          src={blog}
        />
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div className="flex ">
            <Typography
              className="text-3xl font-bold md:text-4xl lg:text-4xl"
              color="blue-gray"
            >
              Unleash Your Thoughts, Inspire the World: Blogging Beyond
              Boundaries!
            </Typography>
          </div>
        </figcaption>
      </figure>

      <div className="container my-5">
        <Typography
          className="ml-6 text-3xl font-bold md:text-4xl lg:text-4xl"
          color="blue-gray"
        >
          Latest Blogs
        </Typography>
        {loading ? (
          <Spinner />
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 justify-items-center mx-6">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
