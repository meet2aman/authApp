"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

import Logo from "@/components/Logo";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    // username: "",
  });
  const isSubmitDisabled = !(user.email.length && user.password.length);
  const oncross = () => {
    router.push("/");
  };
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response) {
        toast.success("Login Successfully");
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error("Check Credentials", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center max-sm:scale-75 items-center min-h-screen text-white shadow-lg ">
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
        theme="dark"
      />
      {/* Same as */}

      <div className="bg-[#000] py-[20px] px-[24px] rounded-[16px] flex flex-col justify-between w-[100%] max-w-[600px] min-h-[50vh]">
        <div className="text-[#d6d9db] w-[100%] flex justify-center align-middle relative">
          <button
            className="absolute top-0 right-0 text-[20px] py-[7px] px-[7px] rounded-[50%] hover:bg-[#212222] "
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
            {loading ? "Processing..." : "Login to Techocity"}
          </h1>

          <div className="flex flex-col gap-[24px] mt-[36px] justify-center items-center">
            <button
              className="primary-button sign-in-button"
              title="Not Working"
            >
              <FcGoogle className="text-2xl" />
              <span>Sign in with google</span>
            </button>
            <button
              className="primary-button sign-in-button"
              title="Not Working"
            >
              <FaFacebook className="text-[1.4rem] text-blue-600" />
              <span>Sign in with facebook</span>
            </button>
          </div>

          <div className="divider w-[100%] my-[20px] relative">
            <p>or</p>
          </div>

          {/* log in using credentials  */}

          {/* username  */}

          {/* <div className="email-log-in my-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="log-in">Username</label>
          </div> */}

          {/* Email */}

          <div className="email-log-in my-4">
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="log-in">Email</label>
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
            <label htmlFor="log-in">Password</label>
          </div>

          {/* final submit Button */}

          <div className="action-buttons flex flex-col gap-3 mt-[20px]">
            <button
              className="primary-button"
              onClick={onLogin}
              disabled={isSubmitDisabled}
            >
              LogIn Here
            </button>
            <button className="secondary-button">
              <Link href="/forgot">Forgot Password</Link>
            </button>
          </div>

          <div className="sign-up flex justify-center align-middle items-center gap-2 my-4">
            <p>Don't Have an account ?</p>
            <Link
              href="/signup"
              className="text-[#fd0012] font-[500] hover:underline decoration-red-600"
            >
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
