import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard.jsx";
import Booking from "../pages/Booking.jsx";
import Layout from "../containers/Layout";

export default function routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/booking" exact element={<Booking />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
