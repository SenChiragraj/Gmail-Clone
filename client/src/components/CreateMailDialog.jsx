import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { UserState } from "../Context/UserContext";
import { sendUserMail } from "../middleware/Requests";
import {SnackBar} from "./SnackBar";

const CustomDialog = ({ open, handleClose }) => {
  const { currUser } = UserState();
  const [userInfo, setUserInfo] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarProps, setSnackBarProps] = useState({});
  const draftKey = "emailDraft"; // Key to save draft data in localStorage

  // Load draft data from localStorage when the dialog opens
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setUserInfo(JSON.parse(savedDraft));
    }
  }, [open]);

  // Function to save the current email data as a draft
  const saveDraft = () => {
    localStorage.setItem(draftKey, JSON.stringify(userInfo));
  };

  const handleSendMail = async () => {
    try {
      const collection = await sendUserMail(currUser.token, userInfo);
      console.log("collection", collection);

      // Clear the draft from localStorage on successful send
      if (collection) {
        localStorage.removeItem(draftKey);
      }

      // Show the Snackbar when the "Send" button is pressed
      setShowSnackBar(true);
      setSnackBarProps({
        success: collection,
        message: collection
          ? "Mail sent successfully"
          : "Error in sending Mail!!",
      });
    } catch (error) {
      console.error("Error sending mail:", error);
    } finally {
      // Close the dialog
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "75%",
            width: "100%", // Adjust the height as needed
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Compose Mail"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
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
      {showSnackBar && <SnackBar {...snackBarProps} />}
    </div>
  );
};

export default CustomDialog;
