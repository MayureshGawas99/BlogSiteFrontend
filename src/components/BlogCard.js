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

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const inputDate = new Date(blog.createdAt);
  const options = { month: "long", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return (
    <Card
      className="w-full max-h-[30rem] overflow-hidden border-2 cursor-pointer"
      onClick={() => navigate(`/view/${blog._id}`)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-[20rem]"
      >
        <img
          src={blog.image}
          alt="ui/ux review check"
          className="w-full h-full object-contain"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="truncate">
          {blog.title}
        </Typography>
        <div className="max-h-[7.2em] overflow-hidden">
          <Typography
            variant="small"
            color="gray"
            className="mt-3 font-normal line-clamp-3 text-justify"
          >
            {blog.text}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content={blog.user.name}>
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src={blog.user.pic}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">{formattedDate}</Typography>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
