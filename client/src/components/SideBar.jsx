import React, { useState } from 'react'
import {  Box, Typography } from '@mui/material'
import { StyledButton } from '../Styles/StyledComponents';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuItem from '../components/MenuItems';
import { CustomDialog } from "./CustomDialog"; // Replace "./CustomDialog" with the correct path to your file


const SideBar = () => {

 const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'left'} >
      <Typography color={'white'} margin={2} fontSize={30}>Email</Typography>
      <CustomDialog open={dialogOpen} handleClose={handleClose} />
      <StyledButton onClick={handleClick}>
        <AddOutlinedIcon/> Create New Mail
      </StyledButton>
      <MenuItem/>
    </Box>
  )
}

export default SideBar