import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import { id } from "date-fns/locale";

export default function SelectSchedule(props) {
  const {
    rowDoctors,
    rowFacilities,
    rowSchedules,
    rowSessionSchedule,
    dataSchedules,
    setDataSchedule,
  } = props;

  const session_schedule = {
    id: 0,
    id_facilty: 0,
    id_doctor: 0,
    id_schedule: 0,
  };

  const timeFormat = (time) => {
    var d = new Date(time),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  };

  let newSSchedule = [];
  newSSchedule = rowSessionSchedule.data?.map((data) => {
    return {
      id: data.id,
      id_facilty: data.id_facilty,
      id_doctor: data.id_doctor,
      id_schedule: data.id_schedule,
    };
  });

  let newFacility = [];
  newFacility = rowFacilities.data?.map((data) => {
    return {
      id: data.id,
      name: data.name,
    };
  });

  let newDoctor = [];
  newDoctor = rowDoctors.data?.map((data) => {
    return {
      id: data.id,
      fullname: data.fullname,
    };
  });

  let newSchedule = [];
  newSchedule = rowSchedules.data?.map((data) => {
    return {
      id: data.id,
      day: data.day,
      start: timeFormat(data.start),
      end: timeFormat(data.end),
    };
  });

  const [rowSSchedule, setrowSSchedule] = useState(newSSchedule);
  const [rowFacility, setrowFacility] = useState(newFacility);
  const [rowDoctor, setrowDoctor] = useState(newDoctor);
  const [rowSchedule, setrowSchedule] = useState(newSchedule);

  const [selectSession, setSessionSchedule] = useState(session_schedule);
  // console.log(newDoctor, "newDoctor");
  // console.log(rowSSchedule, rowFacility, rowDoctor, rowSchedule, "Row");
  console.log(selectSession, "selectSession");

  useEffect(() => {
    let listDoctor = [];
    let listSchedule = [];
    rowSSchedule.forEach((data) => {
      if (data.id_facilty === selectSession.id_facilty) {
        const selectDoctor = newDoctor.filter(
          (doctor) => doctor.id === data.id_doctor
        );
        listDoctor = [...listDoctor, ...selectDoctor];
      }
      if (
        data.id_facilty === selectSession.id_facilty &&
        data.id_doctor === selectSession.id_doctor
      ) {
        const selectSchedule = newSchedule.filter(
          (schedule) => schedule.id === data.id_schedule
        );
        listSchedule = [...listSchedule, ...selectSchedule];
      }
      if (
        data.id_facilty === selectSession.id_facilty &&
        data.id_doctor === selectSession.id_doctor &&
        data.id_schedule === selectSession.id_schedule
      ) {
        setSessionSchedule(data);
      }
    });
    // remove duplicate listDoctor
    const uniqueListDoctor = [...new Set(listDoctor)];
    const uniqueListSchedule = [...new Set(listSchedule)];
    setrowDoctor(uniqueListDoctor);
    setrowSchedule(uniqueListSchedule);
    // setrowDoctor(listDoctor);
    // setrowSchedule(listSchedule);
  }, [selectSession]);

  useEffect(() => {
    setDataSchedule(selectSession);
  }, [selectSession]);

  // console.log(rowDoctor, "rowDoctor");
  const handleChange = (e) => {
    setSessionSchedule({
      ...selectSession,
      [e.target.name]: e.target.value,
    });
  };

  function createData(id, facilty, doctor, schedule) {
    return { id, facilty, doctor, schedule };
  }

  let rows = [];
  rows = rowSSchedule?.map((data) => {
    return createData(
      data.id,
      rowFacility?.filter((facility) => facility?.id === data.id_facilty)[0]
        ?.name,
      rowDoctor?.filter((doctor) => doctor?.id === data.id_doctor)[0]?.fullname,
      rowSchedule?.filter((schedule) => schedule.id === data.id_schedule)[0]
        ?.day +
        " " +
        rowSchedule?.filter((schedule) => schedule.id === data.id_schedule)[0]
          ?.start +
        " - " +
        rowSchedule?.filter((schedule) => schedule.id === data.id_schedule)[0]
          ?.end
    );
  });

  console.log(rows, "rows");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 70,
    },
    {
      field: "facilty",
      headerName: "Facilty",
      width: 120,
    },
    {
      field: "doctor",
      headerName: "Doctor",
      width: 150,
    },
    {
      field: "schedule",
      headerName: "Schedule",
      width: 200,
    },
  ];

  return (
    <div className="mx-auto">
      <div className="pt-4">
        <h1 className="text-center font-semibold text-xl">Select Schedule</h1>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-items-center my-4">
        <div className="flex-1 md:my-4 mx-4 ">
          <div className="mx-auto">
            <div className="w-full h-80 rounded-xl bg-white shadow-md border-0">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 my-4 mx-4 ">
          <div className="my-auto w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md p-2">
              <div className="mb-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Facilty
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="id_facilty"
                    value={newSSchedule.id_facilty}
                    label="Select Facilty"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    {rowFacility.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Doctor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="id_doctor"
                    value={selectSession.id_doctor}
                    label="Select Doctor"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    {/* if rowDoctor empty show menuItem not found */}
                    {rowDoctor.length === 0 ? (
                      <MenuItem>Doctor Not Found</MenuItem>
                    ) : (
                      rowDoctor.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.fullname}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Schedule
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="id_schedule"
                    value={selectSession.id_schedule}
                    label="Select Schedule"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    {rowSchedule.length === 0 ? (
                      <MenuItem>Schedule Not Found</MenuItem>
                    ) : (
                      rowSchedule.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.day} {item.start} - {item.end}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
