import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetDataPatientByNoRM(refresh) {
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

  const [dataPatientsByNoRM, setDataPatientsByNoRM] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataPatientsByNoRM = (no_rm) => {
    console.log(no_rm + "", "payload norm");

    api
      .get(`/api/v1/admins/patient/?no_rm=${no_rm + ""}`)
      .then((res) => {
        setDataPatientsByNoRM(res.data);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setDataPatientsByNoRM(err.response.data);
        setProperties({ loading: false, error: true });
      });
  };

  useEffect(() => {
    getDataPatientsByNoRM();
  }, [refresh]);

  return { dataPatientsByNoRM, getDataPatientsByNoRM, properties };
}
