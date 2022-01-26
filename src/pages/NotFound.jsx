import React from "react";
import NotFoundImg from "../assets/img/404.svg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={NotFoundImg} alt="404" className=" w-80 h-auto" />
        <h1 className="text-xl font-semibold text-maingreen-100 m-2">
          Page Not Found
        </h1>
        <button onClick={() => navigate(-1)} className="btn-main btn-green">
          Go Back
        </button>
      </div>
    </>
  );
}
