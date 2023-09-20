import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'

import { UserState } from '../Context/UserContext'

const Home = () => {

  const { currUser } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    if(!currUser) {
      navigate('/login');
    }
  })

  return (
    <Box bgcolor={'#141416'} display={'flex'} flexDirection={'row'} sx={{width : '100%', height : '100vh', color : '#b5b5b6'}}>
      <Box width={'15%'}><SideBar/></Box>
      <Box width={'85%'} bgcolor={'#1d1e23'}>
        <NavBar/>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Home