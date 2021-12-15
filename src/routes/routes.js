import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard.jsx";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";
import Main from "../containers/Main";
import LoginAdmin from "../pages/LoginAdmin.jsx";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route
          path="/dashboard"
          exact
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/booking"
          exact
          element={
            <Layout>
              <Booking />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
