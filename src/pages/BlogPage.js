import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import commonAxios from "../components/AxiosInstance";
import {
  Avatar,
  CardFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import { BlogContext } from "../context/BlogContext";
import { enqueueSnackbar } from "notistack";

const BlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const { blogid } = useParams();
  const [loading, setLoading] = useState(false);
  const [isBlogLiked, setIsBlogLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const { user, commentCount, setCommentCount } = useContext(BlogContext);
  const getDate = (date) => {
    const inputDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const likeBlog = async () => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to like the blog", {
          variant: "warning",
        });
        return;
      }

      const { data } = await commonAxios.get(`/api/v1/blog/like/${blogid}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (!isBlogLiked) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
      enqueueSnackbar(data.message, { variant: "success" });
      setIsBlogLiked(!isBlogLiked);
    } catch (error) {
      console.log(error);
    }
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
        setBlogData(data?.blogs);
        setIsBlogLiked(data?.isBlogLiked);
        setLikeCount(data?.blogs?.likeCount);
        setCommentCount(data?.blogs?.totalCommentCount);

        console.log(data.blogs);
      } catch (error) {
        setTimeout(() => {
          enqueueSnackbar("Private Blog or Blog not found", {
            variant: "error",
          });
          navigate("/");
        }, 500);

        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBlogDetails(blogid);
  }, [blogid, navigate, setCommentCount]);

  return (
    <div className="flex flex-col items-center h-full bg-gray-100">
      <div className="w-[90%]  my-8 p-6 bg-white rounded-md shadow-md">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <CardFooter
              className="flex flex-row items-center gap-2 p-0 cursor-pointer"
              onClick={() => navigate(`/user/${blogData?.user._id}`)}
            >
              <Avatar
                size="md"
                variant="circular"
                alt="natali craig"
                src={blogData?.user.pic}
                className="border-2 border-white hover:z-10"
              />
              <div className="flex flex-col flex-grow text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                <div className="text-base font-bold text-black">
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
            <hr class="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="flex flex-row gap-5">
              <Tooltip content="Likes" placement="top">
                <div className="flex flex-row items-center gap-1">
                  {isBlogLiked ? (
                    <FaHeart
                      className="text-red-500 cursor-pointer"
                      onClick={likeBlog}
                    />
                  ) : (
                    <FaRegHeart onClick={likeBlog} className="cursor-pointer" />
                  )}{" "}
                  <span>{likeCount}</span>
                </div>
              </Tooltip>
              <Tooltip content="Comments" placement="top">
                <div className="flex flex-row items-center gap-1">
                  <LiaCommentSolid size={20} /> <span>{commentCount}</span>
                </div>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      <CommentSection blog={blogData} />
    </div>
  );
};

export default BlogPage;
