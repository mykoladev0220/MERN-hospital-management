import React, { useState, useEffect } from "react";

export default function ConfirmationForm(props) {
  const {
    dataPatient,
    dataSchedules,
    setBookingFinish,
    rowDoctors,
    rowFacilities,
    rowSchedules,
  } = props;

  const transformFacility = (data) => {
    let result = "";
    rowFacilities.data?.forEach((item) => {
      if (data === item.id) {
        result = item.name;
      }
    });
    return result;
  };

  const transformDoctor = (data) => {
    let result = "";
    rowDoctors.data?.forEach((item) => {
      if (data === item.id) {
        result = item.fullname;
      }
    });
    return result;
  };

  const timeFormat = (time) => {
    var d = new Date(time),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  };

  const transformScheduleDay = (data) => {
    let result = " ";
    rowSchedules.data?.forEach((item) => {
      if (data === item.id) {
        result = item.day;
      }
    });
    return result;
  };

  const transformScheduleTime = (data) => {
    let result = " ";
    rowSchedules.data?.forEach((item) => {
      if (data === item.id) {
        result = timeFormat(item.start) + " - " + timeFormat(item.end);
      }
    });
    return result;
  };

  const initState = {
    patient_id: 0,
    session_schedule_id: 0,
    status: "Not Checked",
  };

  const [valueForm, setvalueForm] = useState(initState);

  useEffect(() => {
    setvalueForm({
      ...valueForm,
      patient_id: dataPatient.id,
      session_schedule_id: dataSchedules.id,
    });
  }, [dataPatient, dataSchedules]);

  useEffect(() => {
    setBookingFinish(valueForm);
  }, [valueForm]);

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
              <td>{dataPatient ? dataPatient.no_rm : "norm"}</td>
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
              <td className="py-2 font-semibold">Age</td>
              <td>:</td>
              <td>{dataPatient ? dataPatient.age : "age"}</td>
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
              <td>
                {dataSchedules
                  ? transformFacility(dataSchedules.id_facilty)
                  : "Facilty"}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Doctor</td>
              <td>:</td>
              <td>
                {dataSchedules
                  ? transformDoctor(dataSchedules.id_doctor)
                  : "Doctor"}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Day</td>
              <td>:</td>
              <td>
                {dataSchedules
                  ? transformScheduleDay(dataSchedules.id_schedule)
                  : "Day"}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Time</td>
              <td>:</td>
              <td>
                {dataSchedules
                  ? transformScheduleTime(dataSchedules.id_schedule)
                  : "Time"}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
