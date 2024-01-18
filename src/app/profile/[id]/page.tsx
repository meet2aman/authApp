"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/navigation";

export default function UserProfile({ params }: any) {
  const router = useRouter();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <div className="flex flex-col text-white justify-center items-center align-middle text-center min-h-screen max-sm:scale-75">
        <div className="bg-[#000] py-[20px] px-[24px] rounded-[16px]  w-[100%] max-w-[600px] min-h-[50vh] gap-0 ">
          <Stack
            direction="row"
            spacing={2}
            className="w-full flex justify-center items-center
            "
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 90, height: 90 }}
              >
                <h1 className="text-2xl text-black">{params.id}</h1>
              </Avatar>
            </StyledBadge>
          </Stack>
          <div className="mt-20">
            <h1 className="text-4xl mb-4">Profile</h1>
            <h1 className="text-2xl text-gray-400">User Profile Page</h1>
          </div>
          <div className="action-buttons mt-[30px]">
            <button
              className="primary-button"
              onClick={() => {
                router.back();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
