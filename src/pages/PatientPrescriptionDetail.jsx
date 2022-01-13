import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";

export default function PatientPrescriptionDetail() {
  const resep = [
    {
      id: 1,
      name: "Obat 1",
      rules: "1 tablet sehari",
    },
    {
      id: 2,
      name: "Obat 2",
      rules: "2 tablet sehari",
    },
    {
      id: 3,
      name: "Obat 3",
      rules: "3 tablet sehari",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-left text-2xl font-semibold">
          Patient Prescription Detail
        </h1>
        <div className="my-4">
          <button className="text-left font-medium flex items-center">
            <span>
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div>
        {resep.map((data) => (
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
