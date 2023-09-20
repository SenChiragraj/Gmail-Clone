import { StarBorder, Star } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

export const DisplayMail = ({ data }) => {

  const formattedDate = data.date?.toLocaleString();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      fontSize={10}
      sx={{ margin: "15px" }}
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
          <Typography>{data.subject}</Typography>
          <Typography>{data.body}</Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          "& > p": {
            fontSize: 13,
          },
        }}
        display={'flex'}
        flexDirection={'column'}
        gap={'5px'}
        alignItems={'end'}
        marginRight={5}
      >
        <Typography>{formattedDate}</Typography>
        {data.starred ? <Star /> : <StarBorder />}
      </Box>
    </Stack>
  );
};
