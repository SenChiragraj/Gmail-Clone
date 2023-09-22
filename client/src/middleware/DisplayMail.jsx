import { StarBorder, Star, DeleteOutline, Delete } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { changeMailType } from "./Requests";
import { SnackBar } from "../components/SnackBar";

export const DisplayMail = ({ data }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarProps, setSnackBarProps] = useState(false);
  const { currUser, setTypeChange, typeChange } = useContext(UserContext);

  const formattedDate = data.date?.toLocaleString().split("T")[0];
  const handleMailChange = async (type, id) => {
    console.log(currUser.token);
    const change = await changeMailType(currUser.token, type, id);
    if(change) setTypeChange(!typeChange);
    setShowSnackBar(true);
    setSnackBarProps({
      success: change,
      message: change
        ? ` Mail added to ${type}`
        : `Error in adding Mail!!`,
    });
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={10}
        sx={{ margin: "15px" }}
        gap={5}
      >
        <Stack
          direction={"row"}
          gap={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            alt={data.name}
            src={data.avator}
            sizes="large"
            sx={{ width: 50, height: 50 }}
          />
          <Box
            sx={{
              "& > p": {
                fontSize: 13,
              },
            }}
          >
            <Typography>{data.name}</Typography>
            <Typography sx={{ maxWidth: "100px" }}>{data.subject}</Typography>
            <Typography>{data.body}</Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            "& > p": {
              fontSize: 13,
            },
          }}
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          alignItems={"end"}
          marginRight={5}
        >
          <Typography>
            {formattedDate}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"5px"}
            sx={{
              "& > div > svg:hover": {
                fill: "#3a5dff", // Change the fill color on hover
                cursor: "pointer", // Change the cursor to a pointer on hover
              },
            }}
          >
            <div onClick={() => handleMailChange("starred", data._id)}>
              {data.type === "starred" ? <Star /> : <StarBorder />}
            </div>
            <div onClick={() => handleMailChange("delete", data._id)}>
              {" "}
              {data.type === "delete" ? <Delete /> : <DeleteOutline />}
            </div>
          </Box>
        </Box>
      </Stack>
      {showSnackBar && <SnackBar {...snackBarProps} />}
    </>
  );
};
