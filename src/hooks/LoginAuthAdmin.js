import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../context/apiContext";

export default function LoginAuthAdmin() {
  
  const api = axios.create({
    baseURL: "http://localhost:9090/http://127.0.0.1:8080",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
    },
  });

  const [resultLogin, setResultLogin] = useState({});
  
  const sendDataToServer = (payload) => {
    payload = {
      username: payload.username,
      password: payload.password,
    };
    
    api
      .post("/api/v1/admins/login", payload)
      .then((res) => {
        if (res.data.meta.rc === 200) {
          setResultLogin(res.data);
          localStorage.setItem(ACCESS_TOKEN_NAME, res.data.data.token);
        } else if (res.data.meta.rc === 500) {
          setResultLogin(res.data);
        } else {
          setResultLogin(res.data);
        }
        console.log(res, "res");
        setResultLogin(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  console.log(resultLogin, "resultLogin");

  return { resultLogin, sendDataToServer };
}
