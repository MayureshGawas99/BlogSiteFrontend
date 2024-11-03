import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import commonAxios from "../components/AxiosInstance";
import ProfileBlogCard from "../components/ProfileBlogCard";
import { FaFilter, FaPlus, FaSortAmountDownAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { Button } from "@material-tailwind/react";
import { set } from "date-fns";

const ProfilePage = () => {
  const { user, myBlogs, setMyBlogs, fetchagain } = useContext(BlogContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [publicBlogs, setPublicBlogs] = useState(0);
  const [privateBlogs, setPrivateBlogs] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("public"); // initial state

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1);
  };
  const [selectedSort, setSelectedSort] = useState("recentlyAdded"); // initial state

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   console.log(selectedFilter, "selectedFilter");
  //   console.log(selectedSort, "selectedSort");
  // }, [selectedFilter, selectedSort]);

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get(
          `/api/v1/blog/userblogs?visibility=${selectedFilter}&sort=${selectedSort}&page=${currentPage}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setMyBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setPublicBlogs(data.publicBlogsCount);
        setPrivateBlogs(data.privateBlogsCount);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getUserBlogs();
  }, [fetchagain, selectedFilter, selectedSort, currentPage]);

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="container w-full py-8">
        <div className="grid gap-6 px-4 lg:grid-cols-12">
          <div className=" lg:col-span-4 lg:mb-0">
            <div className="p-6 mb-4 bg-white rounded-lg shadow">
              <div className="flex flex-col items-center">
                <img
                  alt="profile pic"
                  src={user?.pic}
                  className="object-cover w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
                />
                <h1 className="text-xl font-bold">{user?.name}</h1>
                <p className="text-gray-600">Email: {user?.email}</p>

                <div className="flex flex-row mt-2 text-black">
                  <div className="flex flex-col px-4 text-center border-r-2 border-gray-600 ">
                    <p className="text-gray-600">Public Blogs</p>
                    <p className="text-2xl font-extrabold">{publicBlogs}</p>
                  </div>
                  <div className="flex flex-col px-4 text-center">
                    <p className="text-gray-600">Private Blogs</p>
                    <p className="text-2xl font-extrabold ">{privateBlogs}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {!update && (
                    <button
                      onClick={() => setUpdate(true)}
                      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] block w-full"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              {update && (
                <>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <UpdateForm setUpdate={setUpdate} />
                  </div>
                </>
              )}
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center gap-2 text-lg font-bold">
                <FaFilter />
                <span>Filter By:</span>
              </div>
              <div className="mt-5 ml-6">
                <div className="flex items-center mb-4">
                  <input
                    id="filter-public-blogs"
                    type="radio"
                    value="public"
                    name="filter-options"
                    checked={selectedFilter === "public"}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="filter-public-blogs"
                    className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                  >
                    Public Blogs
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="filter-private-blogs"
                    type="radio"
                    value="private"
                    name="filter-options"
                    checked={selectedFilter === "private"}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="filter-private-blogs"
                    className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                  >
                    Private Blogs
                  </label>
                </div>
              </div>

              <hr class="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
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
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="mb-0 text-xl font-bold">
                  My Blogs {"( " + (privateBlogs + publicBlogs) + " )"}{" "}
                </h2>

                <button
                  onClick={() => navigate(`/blog/create`)}
                  className="flex flex-row gap-2 items-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] "
                >
                  <FaPlus size={16} /> <span>Create Blog</span>
                </button>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 justify-items-center">
                    {myBlogs?.map((blog) => (
                      <ProfileBlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-5 mt-5">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] block w-[8rem]"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] block w-[8rem]"
                      >
                        Next
                      </button>{" "}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
