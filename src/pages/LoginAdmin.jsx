import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import LoginAuthAdmin from "../hooks/LoginAuthAdmin";
import { useDispatch } from "react-redux";
import { login } from "../store/loginSlice";
import { set } from "date-fns";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function LoginAdmin() {
  const { resultLogin, sendDataToServer } = LoginAuthAdmin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initLogin = {
    username: "",
    password: "",
    showPassword: false,
  };

  const initMessage = {
    status: true,
    message: "",
  };

  const [messageLogin, setMessageLogin] = useState(initMessage);
  const [loginForm, setLoginForm] = useState(initLogin);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setLoginForm({
      ...loginForm,
      showPassword: !loginForm.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(loginForm);
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
                    required
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
                    required
                    id="outlined-basic"
                    label="Password"
                    name="password"
                    type={loginForm.showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={onChange}
                    color="primary"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {loginForm.showPassword ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
