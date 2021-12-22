import React from "react";

export default function ConfirmationForm() {
  return (
    <div>
      <div className="py-4">
        <h1 className="text-xl font-bold text-center">Confirmation Form</h1>
      </div>
      <div className="flex flex-col lg:flex-row mx-4">
        <div className="flex-1 p-4">
          <table className="table-auto w-full">
            <tr className="py-5 ">
              <td className="w-48 py-2 font-semibold">Fullname</td>
              <td>:</td>
              <td>Jhon Doe</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">NIK</td>
              <td>:</td>
              <td>4523534256365645</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">No Medical Number</td>
              <td>:</td>
              <td>RM00001</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Address</td>
              <td>:</td>
              <td>Manchaster, United Kingdom</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Date of Birth</td>
              <td>:</td>
              <td>18 December 1967</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Gender</td>
              <td>:</td>
              <td>Male</td>
            </tr>
          </table>
        </div>
        <div className="flex-1  p-4">
          <table className="table-auto w-full">
            <tr>
              <td className="w-48 py-2 font-semibold">Facility</td>
              <td>:</td>
              <td>Klinik Penyakit Dalam</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Doctor</td>
              <td>:</td>
              <td>Dr. Dree</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Schedule</td>
              <td>:</td>
              <td>Senin, 27 Desember 2021</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Time</td>
              <td>:</td>
              <td>07.00</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Queue</td>
              <td>:</td>
              <td>03</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
