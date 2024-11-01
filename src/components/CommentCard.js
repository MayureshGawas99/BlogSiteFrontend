import React, { useContext, useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
// import { addComment, deleteComment, likeComment } from "@/server/commentServer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { toast } from "react-toastify";
import { BlogContext } from "../context/BlogContext";
import { dummyComments } from "../context/dummyComments";
import { Avatar, Button, Tooltip } from "@material-tailwind/react";
import { formatDistanceToNow, set } from "date-fns";
import commonAxios from "./AxiosInstance";
import Spinner from "./Spinner";
import { enqueueSnackbar } from "notistack";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import DeleteCommentModaL from "./DeleteCommentModal";

function CommentCard({ comment, replyDepth, blogId }) {
  // hi
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [commentLike, setCommentLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const { user, fetchCommentsAgain, setFetchCommentsAgain } =
    useContext(BlogContext);
  const [state, setState] = React.useState("reply");
  const [replies, setReplies] = useState([]);

  const editOrReplyComment = async () => {
    try {
      if (state === "edit") {
        editComment();
      } else {
        addComment(comment._id);
      }
      setReply("");
      setOpenReplyBox(false);
      setFetchCommentsAgain(!fetchCommentsAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const likeComment = async () => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to like the comment", {
          variant: "warning",
        });
        return;
      }
      const { data } = await commonAxios.get(
        `/api/v1/comment/like/${comment?._id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      enqueueSnackbar(data.message, { variant: "success" });
      setFetchCommentsAgain(!fetchCommentsAgain);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to delete the comment", {
          variant: "warning",
        });
        return;
      }
      const { data } = await commonAxios.delete(
        `/api/v1/comment/delete/${commentId}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      enqueueSnackbar(data, { variant: "success" });
      setFetchCommentsAgain(!fetchCommentsAgain);
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = async (parent = null) => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to Reply a comment", {
          variant: "warning",
        });
        return;
      }
      if (reply === "") return;
      const body = {
        content: reply,
        parent,
        blogId: comment.blogId,
      };
      console.log(body);
      const data = await commonAxios.post("/api/v1/comment/create", body, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setReply("");
      setFetchCommentsAgain(!fetchCommentsAgain);
      if (data) {
        enqueueSnackbar("Comment created successfully", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const editComment = async () => {
    try {
      if (!user) {
        enqueueSnackbar("Please login to edit the comment", {
          variant: "warning",
        });
        return;
      }
      const body = {
        newContent: reply,
        commentId: comment._id,
      };
      const data = await commonAxios.put("/api/v1/comment/edit", body, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      setReply("");
      setOpenReplyBox(false);
      setFetchCommentsAgain(!fetchCommentsAgain);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCommentsReplies = async () => {
    try {
      setLoading(true);
      const { data } = await commonAxios.get(
        `/api/v1/comment/get-replies/${comment?._id}`
      );
      console.log(data);
      setReplies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (comment) {
      fetchCommentsReplies();
      setCommentLike(comment?.isLiked);
    }
  }, [fetchCommentsAgain]);
  return (
    <div className={` flex flex-col ou overflow-x-auto my-2`}>
      <div className={`flex flex-row items-center`}>
        <div
          className={`comment-line flex flex-col px-2 py-1 w-full rounded-lg border  border-black bg-gray-100`}
        >
          <div className="flex flex-row items-center gap-2">
            <Avatar
              size="md"
              variant="circular"
              alt="natali craig"
              src={comment?.author?.pic}
              className="border-2 border-white cursor-pointer hover:z-10"
            />
            <div className="flex-grow overflow-x-hidden">
              <div className="w-full overflow-x-auto text-sm font-bold cursor-pointer md:text-base">
                <div className="flex flex-row items-center gap-2">
                  <span className="whitespace-nowrap h-fit">
                    {comment?.author?.name}
                  </span>
                  <span className="text-xs text-gray-500 md:text-sm whitespace-nowrap h-fit">
                    {"("}
                    {formatDistanceToNow(new Date(comment?.createdAt), {
                      addSuffix: true,
                    })}
                    {")"}
                  </span>
                </div>
              </div>
              <div className={`text-sm md:text-base`}>
                {comment.content === "" ? (
                  <span className="text-gray-500">Comment was deleted</span>
                ) : (
                  comment.content
                )}
              </div>
              <div className="flex flex-row items-center w-full overflow-x-auto ">
                <div className="flex flex-row items-center text-lg">
                  {commentLike ? (
                    <FaHeart
                      className="text-red-500 cursor-pointer"
                      onClick={likeComment}
                    />
                  ) : (
                    <FaRegHeart
                      className="cursor-pointer "
                      onClick={likeComment}
                    />
                  )}
                  <div className="pl-2 text-base">{comment?.likeCount}</div>
                </div>
                <div
                  className="pl-5 text-sm cursor-pointer"
                  onClick={() => {
                    if (openReplyBox && state === "edit") {
                      // setReply("");
                      setReply("");
                      setState("reply");
                      return;
                    }
                    setReply("");

                    setState("reply");
                    setOpenReplyBox(!openReplyBox);
                  }}
                >
                  Reply
                </div>
                {comment?.content !== "" &&
                  comment?.author._id === user?._id && (
                    <>
                      {/* <div
                        className="pl-5 text-sm cursor-pointer"
                          onClick={() => {
                            setDeleteId(comment?._id);
                            setIsDisclaimerOpen(true);
                          }}
                      >
                        Delete
                      </div> */}
                      <DeleteCommentModaL
                        commentId={comment._id}
                        handleDelete={deleteComment}
                      />
                      <div
                        className="pl-5 text-sm cursor-pointer"
                        onClick={() => {
                          if (openReplyBox && state === "reply") {
                            // setReply("");
                            setReply(comment.content);
                            setState("edit");
                            return;
                          }
                          setReply(comment.content);
                          setState("edit");
                          setOpenReplyBox(!openReplyBox);
                        }}
                      >
                        Edit
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>

          <div
            className={`flex flex-row overflow-y-hidden gap-2 h-0 ${
              openReplyBox && "h-auto"
            } transition-all duration-500`}
          >
            <input
              placeholder={"Reply..."}
              className={`w-full  ${
                openReplyBox && "p-2"
              } rounded-md  focus:outline-none bg-white/15 backdrop-blur-sm`}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></input>
            <div className="flex justify-start">
              {/* <button
                // onClick={submitReply}
                className="px-2 py-1 mb-2 text-white transition-colors duration-500 border-2 border-solid rounded-md border-secondary hover:bg-secondary hover:border-secondary"
              >
                {state === "reply" ? "Submit" : "Edit"}
              </button> */}
              <Button
                variant="gradient"
                size="sm"
                color="indigo"
                className="rounded-lg "
                onClick={(e) => editOrReplyComment(comment._id)}
              >
                {state === "reply" ? "Reply" : "Edit"}
              </Button>
            </div>
          </div>
          {/* )} */}
        </div>
        {comment?.replies.length > 0 && (
          <div
            className="text-3xl cursor-pointer"
            onClick={() => setReplyOpen(!replyOpen)}
          >
            {replyOpen ? (
              <Tooltip content="Hide replies">
                <p>
                  <IoIosArrowUp />
                </p>
              </Tooltip>
            ) : (
              <Tooltip content="Show replies">
                <p>
                  <IoIosArrowDown />
                </p>
              </Tooltip>
            )}
          </div>
        )}
      </div>
      {replyOpen && (
        <div
          className={`border-l-2 border-gray-500  overflow-y-hidden ${
            replyOpen && "h-auto"
          } transition-all duration-700 pl-5`}
        >
          {loading ? (
            <Spinner />
          ) : (
            replies.map((reply, index) => {
              return (
                <CommentCard
                  key={index}
                  comment={reply}
                  replyDepth={replyDepth + 1}
                  blogId={blogId}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
