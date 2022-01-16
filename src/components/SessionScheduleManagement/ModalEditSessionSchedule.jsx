import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ModalEditSessionSchedule(props) {
  const { open, onClose, rowData } = props;
  const session_schedule = {
    id: rowData[0],
    facilty: rowData[1],
    doctor: rowData[2],
    schedule: rowData[3],
  };

  const [SessionSchedule, setSessionSchedule] = useState(session_schedule);
  // console.log(rowData, "rowData");
  // console.log(SessionSchedule, "SessionSchedule");
  useEffect(() => {
    setSessionSchedule(session_schedule);
  }, [rowData]);

  const handleChange = (e) => {
    setSessionSchedule({
      ...SessionSchedule,
      [e.target.name]: e.target.value,
    });
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
  return (
    <Modal title="Edit Session Schedule" open={open} onClose={onClose}>
      <div>
        <div className="mb-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Facilty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="facilty"
              placeholder={rowData[1]}
              value={SessionSchedule.facilty}
              label="Select Facilty"
              onChange={handleChange}
              className="shadow-md border-0 bg-white"
            >
              <MenuItem value="UGD">UGD</MenuItem>
              <MenuItem value={20}>Klinik THT</MenuItem>
              <MenuItem value={30}>Klinik Umum</MenuItem>
              <MenuItem value="Utama">Klinik Utama</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mb-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
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
        <div className="flex flex-col justify-center gap-2 mx-4  md:justify-end md:flex-row">
          <button className="btn-main btn-primary">Submit</button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
