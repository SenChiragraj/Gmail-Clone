import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackBar = ({ success, message }) => {
  const [openAlert, setOpenAlert] = useState(success);

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const severity = success ? "success" : "error";

  return (
    <Snackbar
      open={openAlert} // Use the open state to control whether the Snackbar is displayed
      autoHideDuration={6000}
      onClose={handleCloseAlert}
    >
      <Alert
        severity={severity}
        sx={{ width: "100%" }}
        onClose={handleCloseAlert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
