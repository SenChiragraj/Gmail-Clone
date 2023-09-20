import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { DisplayMail } from "../../middleware/DisplayMail";
import { Typography } from "@mui/material";

const Inbox = () => {
  const { mails, mailType } = useContext(UserContext);

  return (
    <>
      <Typography>{mailType}</Typography>
      {mails.length > 0 ? mails.map((mail) => (
        <>
          <DisplayMail key={mail.id} data={mail} />
        </>
      )) :
        <Typography>
          No Emails Yet. Get started by sending some...
        </Typography>
      }
    </>
  );
};

export default Inbox;