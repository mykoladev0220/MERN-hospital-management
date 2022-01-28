import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DeletePrescription() {
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

  const [resultDeletePrescription, setResultDeletePrescription] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const sendDataToServer = (payload) => {
    let id = payload.id;

    api
      .delete(`/api/v1/doctors/delete/prescription/${id}`)
      .then((res) => {
        setResultDeletePrescription(res.data);
        setSubmitted(true);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setResultDeletePrescription(err.response.data);
        setSubmitted(false);
        setProperties({ loading: false, error: true });
      });
  };

  return { resultDeletePrescription, sendDataToServer, submitted, properties };
}
