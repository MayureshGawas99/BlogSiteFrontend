import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import commonAxios from "../components/AxiosInstance";
import ProfileBlogCard from "../components/ProfileBlogCard";
import { FaSortAmountDownAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { MdOpenInNew } from "react-icons/md";

const UserProfilePage = () => {
  const { userId } = useParams();

  const { myBlogs, setMyBlogs, fetchagain } = useContext(BlogContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [publicBlogs, setPublicBlogs] = useState(0);
  const [privateBlogs, setPrivateBlogs] = useState(0);
  const [userData, setUserData] = useState(null);

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
    const getUserInfo = async () => {
      try {
        const { data } = await commonAxios.get(
          `/api/v1/auth/getuser/${userId}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        ); // Replace with your actual API endpoint
        // console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        localStorage.removeItem("auth-token");
      }
    };
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get(
          `/api/v1/blog/otheruserblogs/${userId}?sort=${selectedSort}&page=${currentPage}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        console.log(data.blogs);
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
  }, [fetchagain, selectedSort, currentPage, setMyBlogs, userId]);

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="container w-full py-8">
        <div className="grid gap-6 px-4 lg:grid-cols-12">
          <div className=" lg:col-span-4 lg:mb-0">
            <div className="p-6 mb-4 bg-white rounded-lg shadow">
              <div className="flex flex-col items-center">
                <img
                  alt="profile pic"
                  src={userData?.pic}
                  className="object-cover w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
                />
                <h1 className="text-xl font-bold">{userData?.name}</h1>
                <p className="text-gray-600">Email: {userData?.email}</p>

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
          <div className="lg:col-span-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="mb-0 text-xl font-bold">
                  Blogs {"( " + (privateBlogs + publicBlogs) + " )"}{" "}
                </h2>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
