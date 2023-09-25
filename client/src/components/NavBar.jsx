import {
  Box,
  Tooltip,
  Menu,
  Avatar,
  IconButton,
  MenuItem,
  Typography,Button,
  Input, Badge, Stack
} from "@mui/material";
import { useState } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { NotificationsNoneOutlined, KeyboardArrowDownRounded } from "@mui/icons-material";
import { UserState } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
// import { Stack } from "@mui/system";
// import Icon from "@mui/icons-material/NotificationsNoneOutlined";
const NavBar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { currUser, setCurrUser } = UserState();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrUser({});
    setAnchorEl(null);
    navigate('/login');
  }

  return (
    <Box
      sx={{ flexGrow: 0 }}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Input
        sx={{
          backgroundColor: "#141415",
          color: "#b5b5b6",
          width: "15%",
          margin: 2,
          padding: "5px 10px",
          borderRadius: 10,
          gap: 2,
        }}
        disableUnderline
        placeholder="Search"
        startAdornment={<SearchRoundedIcon />}
      />
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot">
            <NotificationsNoneOutlined />
          </Badge>
        </Tooltip>
        <Tooltip title="Profile">
          <Avatar src={currUser.image}/>
        </Tooltip>
        <Box sx={{ '& > p' : { fontSize : '12px' }}}>
          <Typography>{currUser.name}</Typography>
          <Typography>{currUser.email}</Typography>
        </Box>
        <Button
        onClick={handleClick}
      >
        <KeyboardArrowDownRounded/>
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </Stack>
    </Box>
  );
};

export default NavBar;
