import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditPrescription() {
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

  const [resultEditPrescription, setResultEditPrescription] = useState({
    meta: {
      rc: 0,
      message: "",
      messages: [],
    },
    data: {},
  });
  const [submitted, setSubmitted] = useState(false);
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const sendDataToServer = (payload) => {
    let id = payload.id;

    payload = {
      medicine_name: payload.medicine_name,
      medication_rules: payload.medication_rules,
      id_patient: payload.id_patient,
      id_doctor: payload.id_doctor,
      id_sessionbooking: payload.id_sessionbooking,
    };

    api
      .put(`/api/v1/doctors/update/prescription/${id}`, payload)
      .then((res) => {
        setResultEditPrescription(res.data);
        setSubmitted(true);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setResultEditPrescription(err.response.data);
        setSubmitted(true);
        setProperties({
          loading: false,
          error: false,
        });
      });
  };

  return { resultEditPrescription, sendDataToServer, submitted, properties };
}
