import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditNurse() {
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

  const [resultEditNurse, setResultEditNurse] = useState({
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
      username: payload.username,
      password: payload.password,
      fullname: payload.fullname,
      address: payload.address,
      phone_number: "62" + payload.phone_number,
      dob: payload.dob,
      gender: payload.gender,
    };
    api
      .put(`/api/v1/admins/update/nurse/${id}`, payload)
      .then((res) => {
        setResultEditNurse(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setResultEditNurse(err.response.data);
        setSubmitted(false);
      });
  };

  return { submitted, resultEditNurse, sendDataToServer };
}
