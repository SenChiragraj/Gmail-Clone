import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { DisplayMail } from "../../middleware/DisplayMail";
import { Typography, Box } from "@mui/material";
import { getMailsFormUser } from "../../middleware/Requests";

const Inbox = () => {
  const { currUser, mails, mailType, setMails, typeChange } = useContext(UserContext);

  useEffect(() => {
    if (currUser) {
      // Check if currUser is available
      (async () => {
        try {
          const fetchMails = await getMailsFormUser(currUser, mailType.toLowerCase());

          if (fetchMails && fetchMails.length > 0) {
            setMails(fetchMails);
            console.log(fetchMails); // Use fetchMails instead of mails
          } else {
            setMails([]);
          }
        } catch (error) {
          console.error("Error fetching emails:", error);
        }
      })();
    }
  }, [currUser, mailType, typeChange]);

  return (
    <>
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "700px",
          scrollBehavior: "smooth",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            position: "sticky",
            top: 0,
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {mailType}
        </Typography>
        {mails.length > 0 ? (
          mails.map((mail) => <DisplayMail key={mail.id} data={mail} />)
        ) : (
          <Typography>No Emails Yet. Get started by sending some...</Typography>
        )}
      </Box>
    </>
  );
};

export default Inbox;
