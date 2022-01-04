import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../context/apiContext";
import LoginAuthAdmin from "../hooks/LoginAuthAdmin";

export default function LoginAdmin() {
  const { resultLogin, sendDataToServer } = LoginAuthAdmin();

  const navigate = useNavigate();

  const initLogin = {
    username: "",
    password: "",
  };

  const initMessage = {
    status: true,
    message: "",
  };

  const [messageLogin, setMessageLogin] = useState(initMessage);

  const [loginForm, setLoginForm] = useState(initLogin);
  console.log(loginForm, "loginForm");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const loginAuth = () => {
    sendDataToServer(loginForm);
    if (resultLogin.meta.rc === 200) {
      setMessageLogin({
        status: true,
        message: "Login Success",
      });
      localStorage.setItem(ACCESS_TOKEN_NAME, resultLogin.data.token);
      navigate("/dashboard-admin");
    } else if (resultLogin.meta.rc === 500) {
      setMessageLogin({
        status: false,
        message: "Login Failed",
      });
    } else {
      setMessageLogin({
        status: false,
        message: "Login Failed",
      });
    }
  }

  // useEffect(() => {
  //   if (messageLogin.status === true) {
  //     navigate("/dashboard-admin");
  //   }else{

  //   }
  // }, [messageLogin.status]);

  const onClick = (e) => {
    e.preventDefault();
    loginAuth();
    console.log(resultLogin, "dataLogin");
  };

  const redirectToDashboard = () => {
    navigate("/dashboard-admin");
  };

  return (
    <>
      <div className=" bg-maingreen-300">
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="px-12 py-12 rounded-lg bg-white shadow-lg">
            <div>
              <h1 className="text-center font-bold text-2xl">Login Admin</h1>
            </div>
            <div>
              <h5>Enter your credentials to access your account</h5>
            </div>
            <div className="my-3">
              <form onSubmit={onClick}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Username"
                    color="primary"
                    name="username"
                    value={loginForm.username}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={onChange}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <button
                    onSubmit={onClick}
                    className="bg-maingreen-200 text-white w-full px-2 py-2 rounded-md hover:bg-maingreen-100"
                  >
                    Login
                  </button>
                </div>
                {messageLogin.status === true ? (
                  <div className="text-red-500 text-sm">
                    {messageLogin.message}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
