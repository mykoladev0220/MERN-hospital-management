import React, { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../context/apiContext";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin(props) {
  const { username, password } = props;
  const navigate = useNavigate();
  console.log(username, password, "username, password");
  const api = axios.create({
    baseURL: "127.0.0.1:8080",
  });

  const [dataLogin, setDataLogin] = useState({});

  const payload = {
    username: username,
    password: password,
  };


  useEffect(() => {
    api
      .post("/api/v1/admins/login", payload)
      .then((res) => {
        if (res.rc === 200) {
          setDataLogin(res.data);
          localStorage.setItem(ACCESS_TOKEN_NAME, res.data.token);
          redirectToDashboard();
        } else if (res.rc === 500) {
          alert("Login Failed");
          redirectToLogin();
        } else {
          alert("Login Failed");
          redirectToLogin();
        }
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const redirectToDashboard = () => {
    navigate("/dashboard-admin");
  };

  const redirectToLogin = () => {
    navigate("/login-admin");
  };

  return { dataLogin };
}
