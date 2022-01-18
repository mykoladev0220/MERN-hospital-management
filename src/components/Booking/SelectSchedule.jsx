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

  const schedules = [
    {
      id: 1,
      schedule: "8:00 AM - 9:00 AM",
    },
    {
      id: 2,
      schedule: "9:00 AM - 10:00 AM",
    },
  ];

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
      start: data.start,
      end: data.end,
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
    setrowDoctor(listDoctor);
    setrowSchedule(listSchedule);
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

  const rows = [
    createData(1, "Facilty 1", "Doctor 1", "8:00 AM - 9:00 AM"),
    createData(2, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(3, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(4, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(5, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(6, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(7, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
    createData(8, "Facilty 2", "Doctor 2", "9:00 AM - 10:00 AM"),
  ];

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
                    {rowDoctor.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.fullname}
                      </MenuItem>
                    ))}
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
                    {rowSchedule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.day} {item.start} - {item.end}
                      </MenuItem>
                    ))}
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
