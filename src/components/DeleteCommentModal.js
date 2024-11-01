import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DeleteCommentModaL({ commentId, handleDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div
        className="pl-5 text-sm cursor-pointer"
        //   onClick={() => {
        //     setDeleteId(comment?._id);
        //     setIsDisclaimerOpen(true);
        //   }}
        onClick={handleOpen}
      >
        Delete
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do you want to delete the Comment?</DialogHeader>
        <DialogBody>
          The Comment will be permanantly deleted. press confirm to Delete.
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
              handleDelete(commentId);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
