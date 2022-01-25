import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditPatient() {
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

  const [resultEditPatien, setResultEditPatien] = useState({
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
      fullname: payload.fullname,
      NIK: parseInt(payload.nik),
      no_rm: payload.norm,
      address: payload.address,
      age: parseInt(payload.age),
      dob: payload.dob,
      gender: payload.gender,
    };

    api
      .put(`/api/v1/admins/update/patient/${id}`, payload)
      .then((res) => {
        setResultEditPatien(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultEditPatien(err.response.data);
        setSubmitted(true);
      });
  };

  return { resultEditPatien, sendDataToServer, submitted };
}
