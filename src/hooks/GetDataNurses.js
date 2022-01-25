import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetDataNurses(refresh) {
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

  const [dataNurses, setDataNurses] = useState({});

  const getDataNurses = () => {
    api.get("/api/v1/admins/list/nurse").then((res) => {
      setDataNurses(res.data);
    });
  };

  useEffect(() => getDataNurses(), [refresh]);

  return { dataNurses, getDataNurses };
}
