import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetDataPrescription(refresh) {
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

  const [dataPrescription, setDataPrescription] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataPrescription = () => {
    api
      .get("api/v1/doctors/list/prescription")
      .then((res) => {
        setDataPrescription(res.data);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        // setDataPrescription(err.response.data);
        setProperties({ loading: false, error: true });
      });
  };

  useEffect(() => getDataPrescription(), [refresh]);

  return { dataPrescription, getDataPrescription, properties };
}
