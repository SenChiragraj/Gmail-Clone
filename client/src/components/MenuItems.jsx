import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { sideBarIcons } from '../content/SideBarIconList';
import { UserState } from '../Context/UserContext';
import { useEffect } from 'react';
import { getMails } from '../middleware/Requests'
const MenuItem = () => {

  const { mailType, setMailType, setMail, currUser } = UserState();

  useEffect(() => {
    (async () => {
      if (currUser) {
        const respMails = await getMails(currUser.token, mailType); //.getMails(mailType);
        console.log(respMails); // Use respMails, not mails
        setMail(respMails);
      }
    })();

  }, [mailType]);


  return (
    <List>
      {sideBarIcons.map((ele, index) => {
        // const isActive = true; // You need to set this condition based on your logic

        return (
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => setMailType(() => ele.name.toLowerCase())}
              className={
                mailType === ele.name.toLowerCase() ? "active" : "default"
              }
              sx={{
                color: "#b5b5b6",
                gap: 2,
                fontSize: 14,
                margin: "5px 10px",
              }}
            >
              <ele.element />
              <ListItemText primary={ele.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MenuItem;
