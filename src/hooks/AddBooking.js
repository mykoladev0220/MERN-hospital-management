import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddBooking() {
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

  const [resultAddBooking, setResultAddBooking] = useState({
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
      id_patient: payload.patient_id,
      id_session_schedule: payload.session_schedule_id,
      status: payload.status,
    };

    api
      .post("/api/v1/admins/add/sessionbook", payload)
      .then((res) => {
        setResultAddBooking(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultAddBooking(err.response.data);
        setSubmitted(false);
      });
  };
  return { submitted, resultAddBooking, sendDataToServer };
}
