import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, TextField, Stack, Typography } from "@mui/material";
import { UserState } from "../Context/UserContext";

export const CustomDialog = ({ open, handleClose }) => {

  const { currUser } = UserState();
  // console.log(currUser);
  return (
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
        <Stack flexDirection={"column"} gap={2} >
          <Input placeholder="To"  disableUnderline />
          <Input placeholder="From" value={currUser.email} disabled />
          <Input placeholder="Subject"  disableUnderline/>
          <TextField placeholder="Body" multiline rows={10} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button size="large" variant="contained" onClick={handleClose} autoFocus>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
