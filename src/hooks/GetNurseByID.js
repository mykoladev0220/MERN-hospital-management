import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetNurseByID(refresh) {
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

  const [dataNurseByID, setDataNurseByID] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataNurseByID = (id) => {
    api
      .get(`/api/v1/admins/nurse/${id}`)
      .then((res) => {
        setDataNurseByID(res.data);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setDataNurseByID(err.response.data);
        setProperties({ loading: false, error: true });
      });
  };

  useEffect(() => {
    setDataNurseByID();
  }, [refresh]);

  return { dataNurseByID, getDataNurseByID, properties };
}
