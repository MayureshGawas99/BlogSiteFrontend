import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import commonAxios from "../components/AxiosInstance";
import ProfileBlogCard from "../components/ProfileBlogCard";
import { FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const { user, myBlogs, setMyBlogs, fetchagain } = useContext(BlogContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get("/api/v1/blog/userblogs", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        setMyBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getUserBlogs();
  }, [fetchagain]);

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="container w-full py-8">
        <div className="grid gap-6 px-4 lg:grid-cols-12">
          <div className="mb-4 lg:col-span-4 lg:mb-0">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex flex-col items-center">
                <img
                  alt="profile pic"
                  src={user?.pic}
                  className="object-cover w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
                />
                <h1 className="text-xl font-bold">{user?.name}</h1>
                <p className="text-gray-600">Email: {user?.email}</p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {!update && (
                    <button
                      onClick={() => setUpdate(true)}
                      className="px-4 py-2 text-white bg-indigo-900 rounded hover:bg-indigo-600"
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
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">My Blogs</h2>

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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 justify-items-center">
                  {myBlogs?.map((blog) => (
                    <ProfileBlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
