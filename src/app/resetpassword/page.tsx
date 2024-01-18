"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import Logo from "@/components/Logo";
import Link from "next/link";
import axios from "axios";

const resetPassword = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [token, setToken] = useState<string | "">("");

  const isPasswordMatch = newPassword === confirmPassword;
  const isButtonDisabled =
    newPassword.length === 0 ||
    confirmPassword.length === 0 ||
    !isPasswordMatch;

  const oncross = () => {
    router.push("/");
  };

  const onResetPassword = async () => {
    //checking if password entered are same or not
    //if not
    if (newPassword !== confirmPassword) {
      setErrorMessage("Password Don't Match");
      return;
    }
    //if equal
    try {
      setButtonDisabled(false);
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMessage("Password reset successful");
        toast.success("Password updated Successfully!");
        console.log("Password updated Successfully!", response.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setErrorMessage("Password reset failed");
      }
    } catch (error: any) {
      console.log("Password Reset Failed", error.message, error);
      toast.error("Password Updation Failed");
    } finally {
      setLoading(false);
    }
  };

  // Getting token from url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen max-sm:scale-75 text-white ">
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
              {loading ? "Processing..." : "Reset Password"}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
            </h1>

            <div className="email-log-in my-4">
              <input
                type="password"
                id="password"
                placeholder="New-Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <label>Password</label>
            </div>
            <div className="email-log-in my-4">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label>Confirm Password</label>
            </div>

            {/* final submit Button */}

            <div className="action-buttons mt-[20px]">
              <button
                className="primary-button"
                onClick={onResetPassword}
                disabled={isButtonDisabled}
              >
                {buttonDisabled ? "Send" : "Sent"}
              </button>
            </div>
            {/* Link to Login  */}
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

export default resetPassword;
