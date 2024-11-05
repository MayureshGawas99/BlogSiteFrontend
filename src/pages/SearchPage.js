import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import blog from "../assets/blog2.jpg";
import BlogCard from "../components/BlogCard";
import commonAxios from "../components/AxiosInstance";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const { blogs, setBlogs, searchTerm } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchedBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get(
          `/api/v1/blog/search?searchTerm=${searchTerm}`
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const getSearchedUsers = async () => {
      try {
        setLoading(true);
        const { data } = await commonAxios.get(
          `/api/v1/auth/search?searchTerm=${searchTerm}`
        );
        setSearchedUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      getSearchedBlogs();
      getSearchedUsers();
    }
  }, [searchTerm, setBlogs]);

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
            <div className="mb-2 text-lg font-bold">
              <span>Users:</span>
            </div>
            <div>
              {loading ? (
                <Spinner />
              ) : (
                <div>
                  {searchedUsers?.map((user) => (
                    <Card
                      className="flex flex-row items-center gap-2 p-1 mb-2 cursor-pointer"
                      onClick={() => {
                        navigate(`/user/${user._id}`);
                      }}
                    >
                      <Avatar
                        size="md"
                        variant="circular"
                        alt="natali craig"
                        src={user.pic}
                        className="border-2 border-white hover:z-10"
                      />
                      <span className="font-bold text-black">{user.name}</span>
                    </Card>
                  ))}
                  {searchedUsers?.length === 0 && (
                    <div className="mt-2">
                      <span className="text-gray-500">No users found.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-0 text-2xl font-bold md:text-4xl">Blogs :</h2>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 justify-items-center">
                  {blogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
                {blogs?.length === 0 && (
                  <div className="">
                    <span className="text-gray-500">No blogs found.</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
