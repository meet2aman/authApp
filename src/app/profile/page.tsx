"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [data, setData] = React.useState("nothing");

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log("Logged out");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response.data.data.username);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col text-white justify-center items-center align-middle text-center min-h-screen max-sm:scale-75 ">
        <ToastContainer />
        <div className="bg-[#000] p-8 rounded-[16px] flex flex-col justify-between w-[100%] max-w-[600px] min-h-[50vh]">
          <h1 className="text-4xl">ProfilePage</h1>
          <h2 className="text-2xl text-white bg-green-500 rounded-md text-center p-2 mt-4  ">
            {data === " nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>
          <hr className="text-red-700 text-xl bg-red-700" />

          <button
            className="p-3 mt-6 text-white bg-black text-xl text-center rounded-xl transition shadow-md shadow-white hover:text-red-600 hover:bg-white hover:shadow-red-600 hover:ease-in hover:transition "
            onClick={getUserDetails}
          >
            Get User Details
          </button>
          <button
            className="p-3 mt-6 text-white bg-black text-xl text-center rounded-xl transition shadow-md shadow-white hover:text-red-600 hover:bg-white hover:shadow-red-600 hover:ease-in hover:transition "
            onClick={logout}
          >
            LogOUT
          </button>
        </div>
      </div>
    </>
  );
}
