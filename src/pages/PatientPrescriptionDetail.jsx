import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import GetDataPrescription from "../hooks/GetDataPrescription";

export default function PatientPrescriptionDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const { dataPrescription } = GetDataPrescription(refresh);

  console.log(dataPrescription, "dataPrescription");

  let newData = [];
  newData = dataPrescription.data?.map((item) => {
    return {
      id: item.id,
      name: item.medicine_name,
      rules: item.medication_rules,
      id_patient: item.id_patient,
      id_doctor: item.id_doctor,
      id_sessionbooking: item.id_sessionbooking,
    };
  });
  newData = newData?.filter((item) => item.id_patient === params.id);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-left text-2xl font-semibold">
          Patient Prescription Detail
        </h1>
        <div className="my-4">
          <button
            className="text-left font-medium flex items-center"
            onClick={() => navigate(-1)}
          >
            <span>
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div>
        {newData?.map((data) => (
          <div className=" bg-white p-4 rounded-md shadow-lg my-4">
            <div className="flex justify-between">
              <div>
                <table className="table-auto">
                  <tr>
                    <td className="py-2">Medicine Name</td>
                    <td> : </td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>Medicine Rules</td>
                    <td> : </td>
                    <td>{data.rules}</td>
                  </tr>
                </table>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <button className="bg-blue-500 text-white font-medium py-1 px-4 m-1 rounded-md">
                  Edit
                </button>
                <button className="bg-red-500 text-white font-medium py-1 px-4 m-1 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
