import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddNurse() {
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

  const [resultAddNurse, setResultAddNurse] = useState({
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
      username: payload.username,
      password: payload.password,
      fullname: payload.fullname,
      address: payload.address,
      phone_number: payload.phone_number,
      dob: payload.dob,
      gender: payload.gender,
    };
    api
      .post("/api/v1/admins/add/nurse", payload)
      .then((res) => {
        setResultAddNurse(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultAddNurse(err.response.data);
        setSubmitted(false);
      });
  };

  return { submitted, resultAddNurse, sendDataToServer };
}
