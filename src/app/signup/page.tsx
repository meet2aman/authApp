"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Logo from "../../../components/Logo";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("Signup");
  const [bg, setBg] = useState("");
  const isSubmitDisabled = !(
    user.username.length &&
    user.email.length &&
    user.password.length
  );

  const [signupStatus, setSignupStatus] = useState<"success" | "error" | null>(
    null
  );

  let bg1 = "#4ade80";
  let bg2 = "#ef4444";
  const myStyle = {
    backgroundColor:
      signupStatus === "success"
        ? bg
        : signupStatus === "error"
        ? bg
        : "default",
  };

  const onSignup = async () => {
    if (user.username && user.password) {
      setSignupStatus("success");
    } else {
      setSignupStatus("error");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Sign Up Successfully");
      console.log("Signup success", response.data);
      setName("SignedUp");
      setBg(bg1);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      setName("Already Exists");
      setBg(bg2);
      console.log("Signup failed", error.message);
      toast.error("User already Exist, Login please!");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setName("Signup  ✅");
      setBg("");
    } else {
      setName("Signup ");
    }
  }, [user]);

  return (
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

      <div className="bg-[#000] py-[20px] px-[24px] rounded-[16px] flex flex-col justify-between w-[100%] max-w-[600px] min-h-[50vh] ">
        <div className="text-[#d6d9db] w-[100%] flex justify-center align-middle relative">
          <button
            className="absolute top-0 right-0 text-[20px] py-[7px] px-[7px] rounded-[50%] hover:bg-[#212222]"
            onClick={() => {
              router.push("/");
            }}
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
            {loading ? "Processing..." : "SignUp to Techocity"}
          </h1>

          {/* log in using credentials  */}

          {/* username  */}

          <div className="email-log-in my-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="username">Username</label>
          </div>

          {/* Email */}

          <div className="email-log-in my-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Password */}

          <div className="email-log-in my-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* final submit Button */}

          <div className="action-buttons mt-[20px]">
            <button
              style={myStyle}
              disabled={isSubmitDisabled}
              className="primary-button"
              onClick={() => {
                onSignup();
              }}
            >
              {name}
            </button>
          </div>
          {/* Login */}
          <div className="sign-up flex justify-center align-middle items-center gap-2 my-4">
            <p>If You Have an account . </p>
            <Link
              href="/login"
              className="text-[#fd0012] font-[500] hover:underline decoration-red-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
function success(prevState: null): null {
  throw new Error("Function not implemented.");
}
