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
import BookingManagement from "../pages/BookingManagement.jsx";
import SessionScheduleManagement from "../pages/SessionScheduleManagement.jsx";
import FaciltyManagement from "../pages/FaciltyManagement.jsx";
import DoctorManagement from "../pages/DoctorManagement.jsx";
import NurseManagemet from "../pages/NurseManagemet";
import ScheduleManagement from "../pages/ScheduleManagement";

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
          path="/booking-management"
          exact
          element={
            <Layout>
              <BookingManagement />
            </Layout>
          }
        />
        <Route
          path="/session-schedule-management"
          exact
          element={
            <Layout>
              <SessionScheduleManagement />
            </Layout>
          }
        />
        <Route
          path="/facilty-management"
          exact
          element={
            <Layout>
              <FaciltyManagement />
            </Layout>
          }
        />
        <Route
          path="/doctor-management"
          exact
          element={
            <Layout>
              <DoctorManagement />
            </Layout>
          }
        />
         <Route
          path="/nurse-management"
          exact
          element={
            <Layout>
              <NurseManagemet />
            </Layout>
          }
        />
         <Route
          path="/schedule-management"
          exact
          element={
            <Layout>
              <ScheduleManagement />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
