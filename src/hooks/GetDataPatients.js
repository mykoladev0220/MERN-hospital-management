import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetDataPatients() {
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

  const [dataPatients, setDataPatients] = useState({});

  const getDataPatients = () => {
    api.get("/api/v1/admins/list/patient").then((res) => {
      setDataPatients(res.data);
    });
    // .catch((err) => {
    //   setDataPatients(err.response.data);
    // });
  };

  useEffect(() => getDataPatients(), []);

  return { dataPatients, getDataPatients };
}
