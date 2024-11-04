import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

export default function DeleteModaL({ blog, handleDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Tooltip content="Delete" placement="top">
        <span className="text-red-500 cursor-pointer" onClick={handleOpen}>
          <MdDelete size={22} />
        </span>
      </Tooltip>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do you want to delete the Blog?</DialogHeader>
        <DialogBody>
          The Blog with Title: {blog.title} will be permanantly deleted. press
          confirm to Delete.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              handleDelete(blog._id);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
