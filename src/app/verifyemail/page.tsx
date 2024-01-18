"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../components/Logo";
import Image from "next/image";

const verifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Verified Successfully");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 max-sm:scale-75">
        <ToastContainer
          position="top-center"
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
        <div className="py-[20px] px-[24px] rounded-[16px] flex flex-col w-[100%] max-w-[450px] min-h-[50vh] bg-black items-center shadow-md">
          <a href="" className="scale-[0.8] justify-center pb-2">
            <Logo />
          </a>

          <h1 className="text-2xl flex tracking-wider items-start w-full text-white pt-4">
            Verify Email
          </h1>
          {/* <h2 className="p-2 bg-orange-600 text-black text-xl font-bold rounded">
            {token ? `${token}` : "no token"}
          </h2> */}
          {verified && (
            <div className=" flex  justify-center items-start flex-col w-full">
              <p className="text-gray-400 mb-8">
                Your Email has been verified Successfully.
              </p>
              <div className="flex text-center justify-center gap-4 flex-col items-center w-full mb-4">
                <Image
                  src="/email.png"
                  height={40}
                  width={40}
                  alt="Email"
                  className="flex justify-center items-center"
                />
                {verified ? (
                  <p className="text-white">Verified</p>
                ) : (
                  <p className="text-white">Not Verified</p>
                )}
              </div>
              <Link
                href="/login"
                className="text-white p-2 mt-2 text-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] rounded flex items-center justify-center w-full hover:bg-green-400 hover:text-white"
              >
                LOGIN
              </Link>
            </div>
          )}
          {error && (
            <div className="mt-2 flex flex-col justify-center items-center">
              <p className=" text-gray-400">
                There is some error by which your emai not verified successfully
                But You Can Still Login.
              </p>

              <Image
                src="/emailFailed.png"
                height={50}
                width={50}
                alt="Email"
                className="flex justify-center items-center mt-16"
              />

              <Link
                href="/login"
                className="text-white p-2 mt-12 text-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] rounded flex items-center justify-center w-full hover:bg-green-400 hover:text-white mb-2"
              >
                LOGIN
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default verifyEmailPage;
