import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddNewPatient() {
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

  const [resultAddNewPatien, setResultAddNewPatien] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    payload = {
      fullname: payload.fullname,
      NIK: parseInt(payload.nik),
      no_rm: payload.norm,
      address: payload.address,
      dob: payload.dob,
      gender: payload.gender,
    };

    api
      .post("/api/v1/admins/add/patient", payload)
      .then((res) => {
        setResultAddNewPatien(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultAddNewPatien(err.response.data);
        setSubmitted(false);
      });
  };

  // useEffect(() => sendDataToServer(), []);

  return { submitted, resultAddNewPatien, sendDataToServer };
}
