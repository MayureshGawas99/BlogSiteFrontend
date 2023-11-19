import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { enqueueSnackbar } from "notistack";
import commonAxios from "./AxiosInstance";

export default function Modal({ action, blogid, btnName, setFetchagain }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleRadioChange = (event) => {
    setVisibility(event.target.value);
  };
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      if (action === "create") {
        handleCreate();
      } else if (action === "update") {
        handleUpdate(blogid);
      }
      //   setOpen((cur) => !cur);
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
      console.log(formData);
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

      console.log(data);
      setTitle("");
      setImage(null);
      setVisibility("public");
      setText("");
      setFetchagain((cur) => !cur);
      handleOpen();
      setTimeout(() => {
        enqueueSnackbar("Blog Created Succesfully", { variant: "success" });
      }, 500);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      let formData = {
        title,
        visibility,
        text,
      };
      console.log(formData);
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

      console.log(data);
      setTitle("");
      setImage(null);
      setVisibility("public");
      setText("");
      setFetchagain((cur) => !cur);
      handleOpen();
      setTimeout(() => {
        enqueueSnackbar("Blog Updated Succesfully", { variant: "success" });
      }, 500);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (action === "update") {
      getBlogDetails(blogid);
    }
  }, []);

  return (
    <>
      <Button color="indigo" onClick={handleOpen}>
        {btnName}
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {action === "create" ? "Create Blog" : "Update Blog"}
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
            <Typography className="-mb-2" variant="h6">
              Blog Description
            </Typography>
            <Textarea
              label="Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
          <CardFooter className="pt-0 flex gap-3">
            <Button
              color="indigo"
              variant="gradient"
              onClick={handleClick}
              fullWidth
            >
              {action === "create" ? "Create Blog" : "Update Blog"}
            </Button>
            <Button
              color="red"
              variant="gradient"
              onClick={handleOpen}
              fullWidth
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
