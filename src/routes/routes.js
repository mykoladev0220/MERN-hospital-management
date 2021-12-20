import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard.jsx";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";
import Main from "../containers/Main";
import LoginAdmin from "../pages/LoginAdmin.jsx";
import PatientManagement from "../pages/PatientManagement.jsx";
import Try from "../pages/TryDatables";

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
        <Route
          path="/patient-management"
          exact
          element={
            <Layout>
              <PatientManagement />
            </Layout>
          }
        />
        <Route  
          path="/try"
          exact
          element={
            <Layout>
              <Try />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
