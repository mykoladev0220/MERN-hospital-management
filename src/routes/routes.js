import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardDoctor from "../pages/DashboardDoctor";
import DashboardNurse from "../pages/DashboardNurse";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";
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
import AdminRoutes from "../middleware/AdminRoutes";
import DoctorRoutes from "../middleware/DoctorRoutes";
import NurseRoutes from "../middleware/NurseRoutes";
import NotFound from "../pages/NotFound";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
        <Route path="/login-nurse" element={<LoginNurse />} />
        <Route
          path="/dashboard-admin"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <DashboardAdmin />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/dashboard-doctor"
          exact
          element={
            <DoctorRoutes>
              <Layout id="doctor">
                <DashboardDoctor />
              </Layout>
            </DoctorRoutes>
          }
        />
        <Route
          path="/dashboard-nurse"
          exact
          element={
            <NurseRoutes>
              <Layout id="nurse">
                <DashboardNurse />
              </Layout>
            </NurseRoutes>
          }
        />
        <Route
          path="/booking"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <Booking />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/patient-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <PatientManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/booking-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <BookingManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/session-schedule-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <SessionScheduleManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/facilty-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <FacilityManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/doctor-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <DoctorManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/nurse-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <NurseManagemet />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/schedule-management"
          exact
          element={
            <AdminRoutes>
              <Layout id="admin">
                <ScheduleManagement />
              </Layout>
            </AdminRoutes>
          }
        />
        <Route
          path="/patient-prescription/doctor"
          exact
          element={
            <DoctorRoutes>
              <Layout id="doctor">
                <PatientPrescription id="doctor" />
              </Layout>
            </DoctorRoutes>
          }
        />
        <Route
          path="/patient-prescription/nurse"
          exact
          element={
            <NurseRoutes>
              <Layout id="nurse">
                <PatientPrescription id="nurse" />
              </Layout>
            </NurseRoutes>
          }
        />
        <Route
          path="/patient-prescription/doctor/:id/detail"
          exact
          element={
            <DoctorRoutes>
              <Layout id="doctor">
                <PatientPrescriptionDetail id="doctor" />
              </Layout>
            </DoctorRoutes>
          }
        />
        <Route
          path="/patient-prescription/nurse/:id/detail"
          exact
          element={
            <NurseRoutes>
              <Layout id="nurse">
                <PatientPrescriptionDetail id="nurse" />
              </Layout>
            </NurseRoutes>
          }
        />
        <Route
          path="/session-prescription/doctor"
          exact
          element={
            <DoctorRoutes>
              <Layout id="doctor">
                <SessionPrescription id="doctor" />
              </Layout>
            </DoctorRoutes>
          }
        />
        <Route
          path="/session-prescription/nurse"
          exact
          element={
            <NurseRoutes>
              <Layout id="nurse">
                <SessionPrescription id="nurse" />
              </Layout>
            </NurseRoutes>
          }
        />
        <Route
          path="/prescription-session/doctor/:id/detail"
          exact
          element={
            <DoctorRoutes>
              <Layout id="doctor">
                <SessionPrescriptionDetail id="doctor" />
              </Layout>
            </DoctorRoutes>
          }
        />
        <Route
          path="/prescription-session/nurse/:id/detail"
          exact
          element={
            <NurseRoutes>
              <Layout id="nurse">
                <SessionPrescriptionDetail id="nurse" />
              </Layout>
            </NurseRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
