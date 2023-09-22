import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, TextField, Stack, Snackbar, Alert } from "@mui/material";
import { UserState } from "../Context/UserContext";
import { sendUserMail } from "../middleware/Requests";
import { SnackBar } from "./SnackBar";

export const CustomDialog = ({ open, handleClose }) => {
  const { currUser } = UserState();
  const [userInfo, setUserInfo] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [showSnackBar, setShowSnackBar] = useState(false); // State for controlling Snackbar
  const [snackBarProps, setSnackBarProps] = useState({});
  const handleSendMail = async () => {
    const collection = await sendUserMail(currUser.token, userInfo);
    console.log("collection", collection);

    // Show the Snackbar when the "Send" button is pressed
    setShowSnackBar(true);
    setSnackBarProps({
      success: collection,
      message: collection ? "Mail sent successfully" : "Error in sending Mail!!",
    });

    // Close the dialog
    handleClose();
  };

  return (
    <>
      <Dialog
        fu
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "75%",
            width: "60%", // Adjust the height as needed
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Compose Mail"}</DialogTitle>
        <DialogContent>
          <Stack flexDirection={"column"} gap={2}>
            <Input
              placeholder="To"
              disableUnderline
              value={userInfo.to}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, to: e.target.value }))
              }
            />
            <Input placeholder="From" value={currUser.email} disabled />
            <Input
              placeholder="Subject"
              disableUnderline
              value={userInfo.subject}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
            <TextField
              placeholder="Body"
              value={userInfo.body}
              multiline
              rows={10}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, body: e.target.value }))
              }
            />
          </Stack>
        </DialogContent>
        <Button
          size="large"
          variant="contained"
          onClick={handleSendMail}
          autoFocus
        >
          Send
        </Button>
      </Dialog>

      {/* Conditionally render the Snackbar */}
      {showSnackBar && (
        <SnackBar {...snackBarProps}/>
      )}
    </>
  );
};
