import React from "react";
import { TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
    const navigate = useNavigate();

    const onClick = () => {
        console.log("clicked") ;
        navigate("/dashboard-admin");
    };

  return (
    <>
      <div className=" bg-maingreen-300">
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="px-12 py-12 rounded-lg bg-white shadow-lg">
            <div>
              <h1 className="text-center font-bold text-2xl">Login Admin</h1>
            </div>
            <div>
              <h5>Enter your credentials to access your account</h5>
            </div>
            <div className="my-3">
              <form onSubmit={onClick}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Username"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <button onSubmit={onClick} className="bg-maingreen-200 text-white w-full px-2 py-2 rounded-md hover:bg-maingreen-100">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
