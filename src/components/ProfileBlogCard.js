import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import commonAxios from "./AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { BlogContext } from "../context/BlogContext";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import DeleteModaL from "./DeleteModal";
const ProfileBlogCard = ({ blog }) => {
  const { myBlogs, setMyBlogs, setFetchagain } = useContext(BlogContext);
  const navigate = useNavigate();

  const inputDate = new Date(blog.createdAt);
  const options = { month: "long", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  const handleDelete = (blogid) => {
    try {
      const { data } = commonAxios.delete(`/api/v1/blog/delete/${blogid}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      let updatedlogs = myBlogs.filter((item) => item._id !== blogid);
      // console.log(updatedlogs);
      setMyBlogs(updatedlogs);
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  const handleUpdate = () => {};
  return (
    <Card className="w-full max-h-[30rem] overflow-hidden border-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-[20rem] cursor-pointer"
        onClick={() => navigate(`/view/${blog._id}`)}
      >
        <img
          src={blog.image}
          alt="ui/ux review check"
          className="w-full h-full object-contain"
        />
      </CardHeader>
      <CardBody
        className="cursor-pointer"
        onClick={() => navigate(`/view/${blog._id}`)}
      >
        <Typography variant="h6" color="blue-gray" className="truncate">
          {blog.title}
        </Typography>
        <div className="max-h-[7.2em] overflow-hidden">
          {/* <Typography
            variant="small"
            color="gray"
            className="mt-3 font-normal line-clamp-3 text-justify"
          >
            {blog.text}
          </Typography> */}
          <div
            className="mt-3 font-normal line-clamp-3 text-justify text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.text }}
          ></div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-3">
          {/* <Modal
            setFetchagain={setFetchagain}
            action={"update"}
            btnName={"Edit"}
            blogid={blog._id}
          /> */}
          {/* <Button color="red" onClick={() => handleDelete(blog._id)}>
            Delete
          </Button> */}
          <button
            onClick={() => navigate(`/blog/edit?id=${blog._id}`)}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] block w-full"
          >
            Edit
          </button>

          <DeleteModaL blog={blog} handleDelete={handleDelete} />
        </div>
        {blog.visibility === "private" && (
          <span className="material-symbols-outlined">lock</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileBlogCard;
