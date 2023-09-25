import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { Button, Box, Divider, Avatar} from '@mui/material'

import { Close } from "@mui/icons-material";

const ShowMailDialog = ({ mail, open, handleClose }) => {
  const [op, setOP] = useState(true);
  // console.log(mail);
  return (
    <Dialog
      open={open && op}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      padding="0"
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "80%",
          minWidth: "70%",
        },
      }}
    >
      <DialogContent>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={40}
          sx={{
            backgroundColor: "whitesmoke",
          }}
        >
          <Typography variant="h6" color="initial">
            Email
          </Typography>
          <Button variant="text" color="primary" onClick={() => setOP(false)}>
            <Close />
          </Button>
        </Box>
        <Stack spacing={2}>
          <Typography variant="h3" color="initial">
            {mail.subject}
          </Typography>
          <Typography variant="h6" color="initial">
            {mail.body}
          </Typography>
          <Divider />
          <Box display={"flex"} flexDirection={"row"} gap={3}>
            <Typography variant="p" color="initial">
              From :
            </Typography>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
              <Avatar
                alt={mail.from.name}
                src={mail.from.image}
                sizes="large"
                sx={{ width: 50, height: 50 }}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="p" sx={{ opacity: ".7" }} color="initial">
                  {mail.from.name}
                </Typography>
                <Typography variant="p" sx={{ opacity: ".7" }} color="initial">
                  {mail.from.email}
                </Typography>
                {/* <Typography variant="p" sx={{opacity :'.7'}} color="initial">{...mail.from}</Typography> */}
                <Typography variant="p" sx={{ opacity: ".7" }} color="initial">
                  {mail.date.split("T")[0]}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ShowMailDialog;
