import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditSchedule() {
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

  const [resultEditSchedule, setResultEditSchedule] = useState({
    meta: {
      rc: 0,
      message: "",
      messages: [],
    },
    data: {},
  });

  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    let id = payload.id;
    payload = {
      day: payload.day,
      start: payload.start, 
      end: payload.end,
    };
    
    api
      .put(`/api/v1/admins/update/schedule/${id}`, payload)
      .then((res) => {
        setResultEditSchedule(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultEditSchedule(err.response.data);
        setSubmitted(true);
      });
  };

  return { resultEditSchedule, sendDataToServer, submitted };
}
