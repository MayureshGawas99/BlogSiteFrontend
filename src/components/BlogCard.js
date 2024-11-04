import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const inputDate = new Date(blog?.createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return (
    <Card className="flex flex-col justify-between w-full overflow-hidden border-2 cursor-pointer">
      <div>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center -space-x-3">
            <Tooltip content={blog?.user.name}>
              <Avatar
                variant="circular"
                alt="natali craig"
                src={blog?.user.pic}
                onClick={() => navigate(`/profile/${blog?.user._id}`)}
                className="border-2 border-white hover:z-10"
              />
            </Tooltip>
          </div>
          <Typography className="font-normal">{formattedDate}</Typography>
        </div>
        <div
          className="flex justify-center m-0 rounded-none "
          onClick={() => navigate(`/view/${blog?._id}`)}
        >
          <img
            src={blog?.image}
            alt="ui/ux review check"
            className=" max-h-[15rem] object-cover "
          />
        </div>
        <CardBody
          className="pb-0"
          onClick={() => navigate(`/view/${blog?._id}`)}
        >
          <Typography variant="h6" color="blue-gray" className="truncate ">
            {blog?.title}
          </Typography>
          <div
            className="mt-3 font-normal text-justify text-gray-700 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog?.text }}
          ></div>
        </CardBody>
      </div>
      <CardFooter
        className="flex flex-row gap-5"
        onClick={() => navigate(`/view/${blog?._id}`)}
      >
        <Tooltip content="Likes" placement="top">
          <div className="flex flex-row items-center gap-1">
            <FaHeart className="text-red-500 " />

            <span>{blog?.likeCount}</span>
          </div>
        </Tooltip>
        <Tooltip content="Comments" placement="top">
          <div className="flex flex-row items-center gap-1">
            <LiaCommentSolid size={20} /> <span>{blog?.totalCommentCount}</span>
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
