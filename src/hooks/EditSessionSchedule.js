import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditSessionSchedule() {
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

  const [resultEditSessionSchedule, setResultEditSessionSchedule] = useState({
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
      id_doctor: payload.id_doctor,
      id_facilty: payload.id_facilty,
      id_schedule: payload.id_schedule,
    };

    api
      .put(`/api/v1/admins/update/sessionschedule/${id}`, payload)
      .then((res) => {
        setResultEditSessionSchedule(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultEditSessionSchedule(err.response.data);
        setSubmitted(true);
      });
  };

  return { resultEditSessionSchedule, sendDataToServer, submitted };
}
