import React, { useState } from "react";
import axios from "axios";

export default function LoginAuthAdmin() {
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
    },
  });

  const [resultLogin, setResultLogin] = useState({
    meta: {
      rc: null,
      message: "",
    },
    data: {
      token: "",
    },
  });
  
  const sendDataToServer = (payload) => {
    payload = {
      username: payload.username,
      password: payload.password,
    };
    
    api
      .post("/api/v1/admins/login", payload)
      .then((res) => {
        setResultLogin(res.data);
      })
      .catch((err) => {
        setResultLogin(err.response.data);
      });
  };

  return { resultLogin, sendDataToServer };
}
