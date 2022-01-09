import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditFacility() {
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

  const [resultEditFacility, setResultEditFacility] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    let id = payload.id;
    payload = {
      name: payload.name,
      queue: parseInt(payload.queue),
      location: payload.location,
      capacity: parseInt(payload.capacity),
    };
    api
      .put(`/api/v1/admins/update/facilty/${id}`, payload)
      .then((res) => {
        setResultEditFacility(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultEditFacility(err.response.data);
        setSubmitted(false);
      });
  };

  return { resultEditFacility, sendDataToServer, submitted };
}
