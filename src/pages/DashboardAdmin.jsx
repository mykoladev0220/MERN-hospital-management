import React, { useState } from "react";
import DoctorIcon from "../assets/img/icons8-medical-doctor-48.png";
import NursesIcon from "../assets/img/icons8-nurse-48.png";
import PatientsIcon from "../assets/img/icons8-protection-mask-48.png";
import GetDataDoctors from "../hooks/GetDataDoctors";
import GetDataNurses from "../hooks/GetDataNurses";
import GetDataPatients from "../hooks/GetDataPatients";
import GetDataBooking from "../hooks/GetDataBooking";
import MedicalIcon from "../assets/img/icons8-medical-prescription-64.png";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(true);
  const { dataDoctors } = GetDataDoctors(refresh);
  const { dataNurses } = GetDataNurses(refresh);
  const { dataPatients } = GetDataPatients(refresh);
  const { dataBooking } = GetDataBooking(refresh);

  const countDoctors = dataDoctors.data?.length;
  const countNurses = dataNurses.data?.length;
  const countPatients = dataPatients.data?.length;
  const countBooking = dataBooking.data?.length;

  const CardStatistics = [
    {
      icon: <img src={DoctorIcon} alt="doctor" className="h-8 w-8" />,
      title: "Doctors",
      number: countDoctors,
    },
    {
      icon: <img src={NursesIcon} alt="nurse" className="h-8 w-8" />,
      title: "Nurses",
      number: countNurses,
    },
    {
      icon: <img src={PatientsIcon} alt="patient" className="h-8 w-8" />,
      title: "Patients",
      number: countPatients,
    },
    {
      icon: <img src={MedicalIcon} alt="patient" className="h-8 w-8" />,
      title: "Booking",
      number: countBooking,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-left text-2xl font-semibold">Dashboard Admin</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {CardStatistics.map((item, index) => (
          <div
            className="bg-white rounded-md flex px-4 py-5 shadow-md items-center relative"
            key={index}
          >
            <div className="absolute inset-x-0 top-0 bg-maingreen-100 h-1 w-full rounded-t-md"></div>
            <div className="bg-maingreen-300 rounded-full w-12 h-12 flex justify-center items-center">
              {item.icon}
            </div>
            <div className="mx-4">
              <h4 className="text-md font-medium">{item.title}</h4>
              <h2 className="text-2xl font-bold">{item.number}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
