import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DeleteNurse() {
  const bearerToken = useSelector((state) => state.login.token);
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  const [resultDeleteNurse, setResultDeleteNurse] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    let id = payload.id;
    api
      .delete(`/api/v1/admins/delete/nurse/${id}`)
      .then((res) => {
        setResultDeleteNurse(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultDeleteNurse(err.response.data);
        setSubmitted(false);
      });
  };

  return { resultDeleteNurse, sendDataToServer, submitted };
}
