import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddPrescription() {
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

  const [resultAddPrescription, setResultAddPrescription] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const sendDataToServer = (payload) => {
    payload = {
      medicine_name: payload.medicine_name,
      medication_rules: payload.medication_rules,
      id_patient: payload.id_patient,
      id_doctor: payload.id_doctor,
      id_sessionbooking: payload.id_sessionbooking,
    };
    console.log(payload, "payload");

    api
      .post("/api/v1/doctors/add/prescription", payload)
      .then((res) => {
        setResultAddPrescription(res.data);
        setSubmitted(true);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setResultAddPrescription(err.response.data);
        setSubmitted(false);
        setProperties({ loading: false, error: true });
      });
  };

  return { resultAddPrescription, sendDataToServer, submitted, properties };
}
