import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { Typography } from "@material-tailwind/react";
import blog from "../assets/blog2.jpg";
import BlogCard from "../components/BlogCard";
import commonAxios from "../components/AxiosInstance";
import Spinner from "../components/Spinner";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
const HomePage = () => {
  const { blogs, setBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSort, setSelectedSort] = useState("recentlyAdded"); // initial state
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value);
    setCurrentPage(newPage);
    console.log("Selected Page:", newPage); // You can also trigger a function here to fetch data for the selected page
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get(
          `/api/v1/blog/all?page=${currentPage}&sortBy=${selectedSort}`
        );
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, [currentPage, selectedSort, setBlogs]);

  return (
    <div className="h-full bg-gray-100 ">
      <figure className="relative w-full h-96">
        <img
          className="object-cover object-center w-full h-96"
          height={"500px"}
          src={blog}
          alt="blog icon"
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

      <div className="grid gap-6 mx-6 my-10 lg:mx-16 lg:grid-cols-10">
        <div className=" lg:col-span-3 lg:mb-0">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center gap-2 text-lg font-bold">
              <FaSortAmountDownAlt />
              <span>Sort By:</span>
            </div>
            <div className="mt-5 ml-6">
              <div className="flex items-center mb-4">
                <input
                  id="sort-recently-added"
                  type="radio"
                  value="recentlyAdded"
                  name="sort-options"
                  checked={selectedSort === "recentlyAdded"}
                  onChange={handleSortChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="sort-recently-added"
                  className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                >
                  Recently Added
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sort-most-liked"
                  type="radio"
                  value="mostLiked"
                  name="sort-options"
                  checked={selectedSort === "mostLiked"}
                  onChange={handleSortChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="sort-most-liked"
                  className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                >
                  Most Liked
                </label>
              </div>
            </div>
            {totalPages > 1 && (
              <>
                <hr class="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="flex items-center gap-2 text-lg font-bold">
                  <MdOpenInNew size={22} />
                  <span>Select Page:</span>
                </div>

                <select
                  id="pages"
                  value={currentPage}
                  onChange={handlePageChange}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {Array.from({ length: totalPages }, (_, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-0 text-2xl font-bold md:text-4xl">Blogs:</h2>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 justify-items-center">
                  {blogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
