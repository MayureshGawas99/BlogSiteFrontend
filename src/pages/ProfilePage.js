import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { Link, useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import BlogCard from "../components/BlogCard";
import commonAxios from "../components/AxiosInstance";
import Dummy from "../context/Dummy";
import ProfileBlogCard from "../components/ProfileBlogCard";
import Modal from "../components/Modal";

const ProfilePage = () => {
  const { user, myBlogs, setMyBlogs, fetchagain, setFetchagain } =
    useContext(BlogContext);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const { data } = await commonAxios.get("/api/v1/blog/userblogs", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }); // Replace with your actual API endpoint
        console.log(data);
        setMyBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };
    getUserBlogs();
  }, [fetchagain]);

  return (
    <div className="bg-gray-100 h-full w-full">
      <div className="container w-full py-8">
        <div className="grid lg:grid-cols-12 gap-6 px-4">
          <div className=" lg:col-span-4 mb-4 lg:mb-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={user?.pic}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />
                <h1 className="text-xl font-bold">{user?.name}</h1>
                <p className="text-gray-600">Email: {user?.email}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {!update && (
                    <button
                      onClick={() => setUpdate(true)}
                      className="bg-indigo-900 hover:bg-indigo-600 text-white py-2 px-4 rounded"
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
          </div>
          <div className="lg:col-span-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">My Blogs</h2>
                {/* <button
                  onClick={() => setUpdate(true)}
                  className="bg-indigo-900 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                >
                  Create Blog
                </button> */}
                <Modal
                  setFetchagain={setFetchagain}
                  action={"create"}
                  btnName={"Create Blog"}
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 justify-items-center">
                {myBlogs?.map((blog) => (
                  <ProfileBlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
