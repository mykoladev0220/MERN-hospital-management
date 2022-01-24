import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardDoctor from "../pages/DashboardDoctor";
import DashboardNurse from "../pages/DashboardNurse";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";
import Main from "../containers/Main";
import LoginAdmin from "../pages/LoginAdmin.jsx";
import LoginDoctor from "../pages/LoginDoctor.jsx";
import LoginNurse from "../pages/LoginNurse.jsx";
import PatientManagement from "../pages/PatientManagement.jsx";
import BookingManagement from "../pages/BookingManagement.jsx";
import SessionScheduleManagement from "../pages/SessionScheduleManagement.jsx";
import FacilityManagement from "../pages/FacilityManagement.jsx";
import DoctorManagement from "../pages/DoctorManagement.jsx";
import NurseManagemet from "../pages/NurseManagemet";
import ScheduleManagement from "../pages/ScheduleManagement.jsx";
import PatientPrescription from "../pages/PatientPrescription";
import PatientPrescriptionDetail from "../pages/PatientPrescriptionDetail";
import SessionPrescription from "../pages/SessionPrescription";
import SessionPrescriptionDetail from "../pages/SessionPrescriptionDetail";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
        <Route path="/login-nurse" element={<LoginNurse />} />
        <Route
          path="/dashboard-admin"
          exact
          element={
            <Layout id="admin">
              <DashboardAdmin />
            </Layout>
          }
        />
        <Route
          path="/dashboard-doctor"
          exact
          element={
            <Layout id="doctor">
              <DashboardDoctor />
            </Layout>
          }
        />
        <Route
          path="/dashboard-nurse"
          exact
          element={
            <Layout id="nurse">
              <DashboardNurse />
            </Layout>
          }
        />
        <Route
          path="/booking"
          exact
          element={
            <Layout id="admin">
              <Booking />
            </Layout>
          }
        />
        <Route
          path="/patient-management"
          exact
          element={
            <Layout id="admin">
              <PatientManagement />
            </Layout>
          }
        />
        <Route
          path="/booking-management"
          exact
          element={
            <Layout id="admin">
              <BookingManagement />
            </Layout>
          }
        />
        <Route
          path="/session-schedule-management"
          exact
          element={
            <Layout id="admin">
              <SessionScheduleManagement />
            </Layout>
          }
        />
        <Route
          path="/facilty-management"
          exact
          element={
            <Layout id="admin">
              <FacilityManagement />
            </Layout>
          }
        />
        <Route
          path="/doctor-management"
          exact
          element={
            <Layout id="admin">
              <DoctorManagement />
            </Layout>
          }
        />
        <Route
          path="/nurse-management"
          exact
          element={
            <Layout id="admin">
              <NurseManagemet />
            </Layout>
          }
        />
        <Route
          path="/schedule-management"
          exact
          element={
            <Layout id="admin">
              <ScheduleManagement />
            </Layout>
          }
        />
        <Route
          path="/patient-prescription/doctor"
          exact
          element={
            <Layout id="doctor">
              <PatientPrescription id="doctor" />
            </Layout>
          }
        />
        <Route
          path="/patient-prescription/nurse"
          exact
          element={
            <Layout id="nurse">
              <PatientPrescription id="nurse" />
            </Layout>
          }
        />
        <Route
          path="/patient-prescription/doctor/:id/detail"
          exact
          element={
            <Layout id="doctor">
              <PatientPrescriptionDetail id="doctor" />
            </Layout>
          }
        />
        <Route
          path="/patient-prescription/nurse/:id/detail"
          exact
          element={
            <Layout id="nurse">
              <PatientPrescriptionDetail id="nurse" />
            </Layout>
          }
        />
        <Route
          path="/session-prescription/doctor"
          exact
          element={
            <Layout id="doctor">
              <SessionPrescription id="doctor" />
            </Layout>
          }
        />
        <Route
          path="/session-prescription/nurse"
          exact
          element={
            <Layout id="nurse">
              <SessionPrescription id="nurse" />
            </Layout>
          }
        />
        <Route
          path="/prescription-session/doctor/:id/detail"
          exact
          element={
            <Layout id="doctor">
              <SessionPrescriptionDetail id="doctor" />
            </Layout>
          }
        />
        <Route
          path="/prescription-session/nurse/:id/detail"
          exact
          element={
            <Layout id="nurse">
              <SessionPrescriptionDetail id="nurse" />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
