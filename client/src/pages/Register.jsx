import React, { useState } from "react";
import { Input, Typography, Button } from "@mui/material";
import { StyledFlexColumn } from "../Styles/StyledComponents";
import { useNavigate } from "react-router-dom";
import { getResults } from "../middleware/Requests";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();
   const [errorInfo, setErroInfo] = useState();

   const handleSubmit = async (e) => {
     e.stopPropagation();
     try {
      const response = await getResults('register', userInfo);
       localStorage.setItem("token", response);
       navigate("/inbox");
     } catch (error) {
       setErroInfo("Oops! error encounterred ", error);
     }
   };

  return (
    <StyledFlexColumn // sx={{width : '40%'}}
    >
      <Typography level="h1" fontSize={100} fontStyle={"bold"}>
        Register
      </Typography>

      <StyledFlexColumn gap={4} width={"25%"} marginTop={7}>
        <Input
          fullWidth
          value={userInfo.name}
          placeholder="Name"
          variant="outlined"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
          type="password"
          placeholder="Password"
          variant="outlined"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Input
          fullWidth
          value={userInfo.avator}
          placeholder="Avator"
          variant="outlined"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, image: e.target.value }))
          }
        />
        <StyledFlexColumn gap={3}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            fontStyle={"bolder"}
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </Button>
          <Typography level="h1" fontSize={18} fontStyle="bold">
            <span>
              Already have an account{" "}
              <Typography component="a" href="/login" fontSize={20}>
                Login here..
              </Typography>
            </span>
          </Typography>
          <Typography>{errorInfo}</Typography>
        </StyledFlexColumn>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
};

export default Register;
