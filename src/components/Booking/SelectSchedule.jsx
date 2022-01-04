import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";

export default function SelectSchedule() {
  const session_schedule = {
    facilty: "",
    doctor: "",
    schedule: "",
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

  const [SessionSchedule, setSessionSchedule] = useState(session_schedule);

  const handleChange = (e) => {
    setSessionSchedule({
      ...SessionSchedule,
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
                    name="facilty"
                    value={SessionSchedule.facilty}
                    label="Select Facilty"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    <MenuItem value={10}>UGD</MenuItem>
                    <MenuItem value={20}>Klinik THT</MenuItem>
                    <MenuItem value={30}>Klinik Umum</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl  fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Doctor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="doctor"
                    value={SessionSchedule.doctor}
                    label="Select Doctor"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    <MenuItem value={10}>Dr. Budi</MenuItem>
                    <MenuItem value={20}>Dr. Alma</MenuItem>
                    <MenuItem value={30}>Dr. David</MenuItem>
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
                    name="schedule"
                    value={SessionSchedule.schedule}
                    label="Select Schedule"
                    onChange={handleChange}
                    className="shadow-md border-0 bg-white"
                  >
                    {schedules.map((schedule) => (
                      <MenuItem key={schedule.id} value={schedule.schedule}>
                        {schedule.schedule}
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
