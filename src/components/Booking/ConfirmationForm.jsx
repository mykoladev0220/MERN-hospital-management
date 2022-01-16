import React from "react";

export default function ConfirmationForm(props) {
  const { dataPatient, setDataPatient } = props;

  const dateFormat = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  let newDOB = dateFormat(dataPatient.dob);

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
              <td>{dataPatient ? dataPatient.fullname : "Name"}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">NIK</td>
              <td>:</td>
              <td>{dataPatient ? dataPatient.nik : "NIK"}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">No Medical Number</td>
              <td>:</td>
              <td>RM00001</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Address</td>
              <td>:</td>
              <td>{dataPatient ? dataPatient.address : "Address"}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Date of Birth</td>
              <td>:</td>
              <td>{newDOB}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Gender</td>
              <td>:</td>
              <td>{dataPatient ? dataPatient.gender : "gender"}</td>
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
