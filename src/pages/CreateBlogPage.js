import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Radio,
  Tooltip,
} from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import commonAxios from "../components/AxiosInstance";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BsMagic } from "react-icons/bs";
import TypingText from "../components/TypingText";
import { MdSend } from "react-icons/md";

export default function CreateBlogPage() {
  const { action } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Retrieve a specific query parameter
  const blogid = searchParams.get("id");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleRadioChange = (event) => {
    setVisibility(event.target.value);
  };
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const generateBlog = async () => {
    try {
      if (!prompt) {
        setTimeout(() => {
          enqueueSnackbar("Description is required", { variant: "error" });
        }, 500);
        return;
      }
      setLoading(true);
      const { data } = await commonAxios.post(
        "/api/v1/blog/generate-blog",
        {
          title: prompt,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      setGeneratedBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      if (action === "create") {
        handleCreate();
      } else if (action === "edit") {
        handleEdit(blogid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    try {
      let formData = {
        title,
        visibility,
        text,
      };
      // console.log(formData);
      if (image) {
        const cloudinaryUrl =
          "https://api.cloudinary.com/v1_1/djuseai07/image/upload";
        const cloudData = new FormData();
        cloudData.append("file", image);
        cloudData.append("upload_preset", "chat-app");

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: cloudData,
        });

        if (response.ok) {
          // Request was successful
          const responseData = await response.json();
          formData.image = responseData.url;
        } else {
          // Handle the error or non-successful response here
          console.error("Request failed with status:", response.status);
        }
      }

      const { data } = await commonAxios.post("/api/v1/blog/create", formData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      // console.log(data);
      setTitle("");
      setImage(null);
      setVisibility("public");
      setText("");
      setTimeout(() => {
        enqueueSnackbar("Blog Created Succesfully", { variant: "success" });
      }, 500);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleEdit = async () => {
    try {
      let formData = {
        title,
        visibility,
        text,
      };
      // console.log(formData);
      if (image) {
        const cloudinaryUrl =
          "https://api.cloudinary.com/v1_1/djuseai07/image/upload";
        const cloudData = new FormData();
        cloudData.append("file", image);
        cloudData.append("upload_preset", "chat-app");

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: cloudData,
        });

        if (response.ok) {
          // Request was successful
          const responseData = await response.json();
          formData.image = responseData.url;
        } else {
          // Handle the error or non-successful response here
          console.error("Request failed with status:", response.status);
        }
      }

      const { data } = await commonAxios.put(
        `/api/v1/blog/update/${blogid}`,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      // console.log(data);
      setTitle("");
      setImage(null);
      setVisibility("public");
      setText("");
      setTimeout(() => {
        enqueueSnackbar("Blog Edited Succesfully", { variant: "success" });
      }, 500);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  useEffect(() => {
    console.log(text);
  }, [text]);

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const { data } = await commonAxios.get(
          `/api/v1/blog/single/${blogid}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setTitle(data.blogs.title);
        setText(data.blogs.text);
        setVisibility(data.blogs.visibility);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (action === "edit") {
      getBlogDetails(blogid);
    }
  }, []);

  return (
    <>
      <div className="py-5 bg-gray-100">
        <Card className="mx-auto w-[80%] ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {action === "create" ? "Create Blog" : "Edit Blog"}
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Blog Title
            </Typography>

            <Input
              label="Blog Title"
              required
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Thumbnail
            </Typography>
            <Input
              type="file"
              label="Blog Title"
              onChange={(e) => handleImageChange(e)}
              size="lg"
            />
            {/* <Typography className="-mb-2" variant="h6">
              Blog Content
            </Typography> */}
            <div>
              <div className="flex flex-row items-center justify-between">
                {/* <p className="text-xs md:text-sm ">
                  Stuck? Need help ? Use our AI assistant
                </p> */}
                <Typography className="-mb-2" variant="h6">
                  Blog Content
                </Typography>
                <Tooltip content="Stuck? Need help ? Use our AI assistant">
                  <Button
                    color="purple"
                    variant="gradient"
                    className="p-2"
                    onClick={handleOpen}
                  >
                    <BsMagic size={24} />
                    {/* <WiStars size={32} /> */}
                  </Button>
                </Tooltip>
              </div>
              {open && (
                <div className="flex flex-row gap-2 mt-2 ">
                  <Input
                    label="Describe your Blog"
                    required
                    className="w-auto"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button
                    color="green"
                    variant="gradient"
                    className="p-2 overflow-visible "
                    onClick={generateBlog}
                  >
                    {loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      // <span>Generate</span>
                      <MdSend size={16} />
                    )}
                  </Button>
                </div>
              )}
              <div className="p-4 mt-2 text-black border border-gray-300 rounded-lg">
                {generatedBlog?.length > 0 && (
                  <TypingText text={generatedBlog} />
                )}
              </div>
            </div>

            <ReactQuill
              className="h-[20rem] flex flex-col"
              theme="snow"
              value={text}
              onChange={setText}
            />
            <Typography className="-mb-2" variant="h6">
              Visibility
            </Typography>
            <div className="flex gap-10">
              <Radio
                name="type"
                value={"public"}
                label="Public"
                defaultChecked
                checked={visibility === "public"}
                onChange={handleRadioChange}
              />
              <Radio
                name="type"
                value={"private"}
                label="Private"
                checked={visibility === "private"}
                onChange={handleRadioChange}
              />
            </div>
          </CardBody>
          <CardFooter className="flex gap-3 pt-0">
            <Button
              color="indigo"
              variant="gradient"
              onClick={handleClick}
              fullWidth
            >
              {action === "create" ? "Create" : "Edit"}
            </Button>
            <Button
              color="red"
              variant="gradient"
              onClick={() => navigate("/profile")}
              fullWidth
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
