import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddFacility() {
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

  const [dataFacility, setDataFacility] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    payload = {
      name: payload.name,
      queue: parseInt(payload.queue),
      location: payload.location,
      capacity: parseInt(payload.capacity),
    };
    api
      .post("/api/v1/admins/add/facilty", payload)
      .then((res) => {
        setDataFacility(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setDataFacility(err.response.data);
        setSubmitted(false);
      });
  };

  return { dataFacility, sendDataToServer, submitted };
}
