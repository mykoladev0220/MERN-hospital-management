import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddSchedule() {
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

  const [resultAddSchedule, setResultAddSchedule] = useState({
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
      day: payload.day,
      start: payload.start,
      end: payload.end,
    };
    api
      .post("/api/v1/admins/add/schedule", payload)
      .then((res) => {
        setResultAddSchedule(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultAddSchedule(err.response.data);
        setSubmitted(false);
      });
  };
  return { submitted, resultAddSchedule, sendDataToServer };
}
