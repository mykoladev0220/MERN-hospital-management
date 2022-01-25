import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddSessionSchedule() {
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

  const [resultAddSessionSchedule, setresultAddSessionSchedule] = useState({
    meta: {
      rc: 0,
      message: "",
      messages: [],
    },
    data: {},
  });

  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    payload = {
      id_doctor: payload.id_doctor,
      id_facilty: payload.id_facilty,
      id_schedule: payload.id_schedule,
    };
    api
      .post("/api/v1/admins/add/sessionschedule", payload)
      .then((res) => {
        setresultAddSessionSchedule(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setresultAddSessionSchedule(err.response.data);
        setSubmitted(false);
      });
  };

  return { submitted, resultAddSessionSchedule, sendDataToServer };
}
