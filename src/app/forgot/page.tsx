"use client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import Logo from "../../../components/Logo";
import Link from "next/link";
import axios from "axios";

const forgotPassword = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
  });
  const oncross = () => {
    router.push("/");
  };
  const onForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotPassword", user);
      toast.success("Check Your Mailbox");
      console.log("Password updated Successfully!", response.data);
    } catch (error: any) {
      console.log("Password Reset Failed", error.message, error);
      toast.error("Email not Sent");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex max-sm:scale-75 justify-center items-center min-h-screen text-white ">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}

        <div className="bg-[#000] py-[20px] px-[24px] rounded-[16px] flex flex-col justify-center w-[100%] max-w-[600px] min-h-[50vh] ">
          <div className="text-[#d6d9db] w-[100%] flex justify-center align-middle relative">
            <button
              className="absolute top-0 right-0 text-[20px] py-[7px] px-[7px] rounded-[50%] hover:bg-[#212222]"
              onClick={oncross}
            >
              <AiOutlineClose />
            </button>
            <a className="scale-[0.8]">
              <Logo />
            </a>
          </div>

          {/* sign using social network */}

          <div className="w-[300px] text-center m-auto">
            <h1 className="text-[1.5rem] font-[500]">
              {loading ? "Processing..." : "Forgot Password"}
            </h1>

            {/* Email */}

            <div className="email-log-in my-4">
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label htmlFor="email">Email</label>
            </div>

            {/* final submit Button */}

            <div className="action-buttons mt-[20px]">
              <button className="primary-button" onClick={onForgotPassword}>
                {buttonDisabled ? "Sent" : "Send"}
              </button>
            </div>

            <div>
              <Link href="/login">
                <div className="action-buttons mt-[20px]">
                  <button className="primary-button">Login</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
