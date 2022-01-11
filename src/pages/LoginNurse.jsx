import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import LoginAuthNurse from "../hooks/LoginAuthNurse";
import { useDispatch } from "react-redux";
import { login } from "../store/loginSlice";

export default function LoginNurse() {
  const { resultLogin, sendDataToServer } = LoginAuthNurse();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (resultLogin) {
      if (resultLogin.meta.rc === null) {
        console.log("No User");
        setMessageLogin({
          status: true,
          message: "",
        });
      } else {
        if (resultLogin.meta.rc === 200) {
          dispatch(
            login({
              isLoggedIn: true,
              token: resultLogin.data.token,
            })
          );
          setMessageLogin({
            status: true,
            message: resultLogin.data.message,
          });
          redirectToDashboard();
        } else if (resultLogin.meta.rc === 500) {
          dispatch(
            login({
              isLoggedIn: false,
              token: null,
            })
          );
          setMessageLogin({
            status: false,
            message: resultLogin.meta.messages,
          });
        } else {
          dispatch(
            login({
              isLoggedIn: false,
              token: null,
            })
          );
          setMessageLogin({
            status: false,
            message: "Login Failed",
          });
        }
      }
    }
  }, [resultLogin, dispatch, navigate]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(loginForm);
  };

  const redirectToDashboard = () => {
    navigate("/dashboard-nurse");
  };
  return (
    <>
      <div className=" bg-maingreen-300">
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="px-12 py-12 rounded-lg bg-white shadow-lg">
            <div>
              <h1 className="text-center font-bold text-2xl">Login Nurse</h1>
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
                    name="username"
                    value={loginForm.username}
                    onChange={onChange}
                    color="primary"
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
                    type="password"
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
                {messageLogin.status === false ? (
                  <div className="text-red-500 text-sm my-2">
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
