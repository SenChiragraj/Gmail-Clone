import React, { useState } from 'react'
import { Input, Typography, Button } from '@mui/material'
import { StyledFlexColumn } from '../Styles/StyledComponents';
import { getResults } from '../middleware/Requests';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [userInfo, setUserInfo ] = useState({email : '', password : ''});
  const [errorInfo, setErroInfo] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.stopPropagation();
    try {
      const response = await getResults('login', userInfo);
      localStorage.setItem('token', response);
      navigate('/inbox');
    } catch (error) {
      setErroInfo('Oops! error encounterred ', error);
    }
  }


  return (
    <StyledFlexColumn>
      <Typography level="h1" fontSize={100} fontStyle={"bold"}>
        Login
      </Typography>

      <StyledFlexColumn gap={4} marginTop={7}>
        <Input
          fullWidth
          value={userInfo.email}
          placeholder="Email"
          size="lg"
          variant="outlined"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          fullWidth
          value={userInfo.password}
          placeholder="Password"
          variant="outlined"
          type='password'
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <StyledFlexColumn gap={3}>
          <Button fullWidth variant="contained" onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
          <Typography level="h1" fontSize={18} fontStyle="bold">
            <span>
              Don't have an account{" "}
              <Typography component="a" href="/register" fontSize={20}>
                Register here..
              </Typography>
            </span>
          </Typography>
          <Typography>{errorInfo}</Typography>
        </StyledFlexColumn>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
}

export default Login