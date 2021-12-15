import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard.jsx";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
