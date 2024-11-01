import React, { useContext, useEffect, useState } from "react";
// import AppContext from "@/context/AppContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";
// import { addComment, getAllComments } from "@/server/commentServer";
import { dummyComments } from "../context/dummyComments";
import CommentCard from "./CommentCard";
import { Button } from "@material-tailwind/react";
import commonAxios from "./AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { BlogContext } from "../context/BlogContext";
import axios from "axios";
import Spinner from "./Spinner";

function CommentSection({ blogId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, fetchCommentsAgain, setFetchCommentsAgain } =
    useContext(BlogContext);
  //   const {
  //     jwt,
  //     comments,
  //     setComments,
  //     deleteId,
  //     loading,
  //     setLoading,
  //     elasticId,
  //   } = React.useContext(AppContext);
  //   const [comment, setComment] = useState<string>("");
  const addComment = async (parent = null) => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to comment", { variant: "warning" });
        return;
      }
      if (comment === "") return;
      const body = { content: comment, parent, blogId };
      console.log(body);
      const data = await commonAxios.post("/api/v1/comment/create", body, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setComment("");
      setFetchCommentsAgain(!fetchCommentsAgain);
      if (data) {
        enqueueSnackbar("Comment created successfully", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await commonAxios.get(
        `/api/v1/comment/get-comments/${blogId}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId, fetchCommentsAgain]);

  return (
    <div className="w-[90%] mx-6 my-5 p-6 lg:mx-32  bg-white rounded-md shadow-md">
      <h2 className="mb-4 text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Comments
      </h2>
      <div className="flex gap-2 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            className="w-full h-full px-2 py-2 rounded-lg focus:outline-none bg-white/15 backdrop-blur-md"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button
          variant="gradient"
          size="sm"
          color="indigo"
          className="rounded-lg "
          onClick={(e) => addComment(null)}
        >
          <span>Send</span>
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center w-full py-6">
          <Spinner />
        </div>
      ) : (
        <div>
          {comments?.map((comment, index) => {
            return (
              <CommentCard
                key={index}
                comment={comment}
                replyDepth={0}
                blogId={comment.blogId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
