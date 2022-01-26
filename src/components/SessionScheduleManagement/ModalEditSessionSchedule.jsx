import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditSessionSchedule from "../../hooks/EditSessionSchedule";

export default function ModalEditSessionSchedule(props) {
  const {
    open,
    rowDoctors,
    rowFacilities,
    rowSchedules,
    onClose,
    rowData,
    refresh,
    setRefresh,
  } = props;

  const session_schedule = {
    id: rowData[0],
    id_facilty: rowData[1],
    id_doctor: rowData[2],
    id_schedule: rowData[3],
  };
  const { submitted, sendDataToServer } = EditSessionSchedule();

  const [SessionSchedule, setSessionSchedule] = useState(session_schedule);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  const timeFormat = (time) => {
    var d = new Date(time),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  };

  let newSchedules = [];
  newSchedules = rowSchedules.data?.map((data) => {
    return {
      id: data.id,
      day: data.day,
      start: timeFormat(data.start),
      end: timeFormat(data.end),
    };
  });

  useEffect(() => {
    setSessionSchedule(session_schedule);
  }, [rowData]);

  const handleChange = (e) => {
    setSessionSchedule({
      ...SessionSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(SessionSchedule);
    setRefresh(false);
    setSubmittedForm(true);
  };

  useEffect(() => {
    if (submittedForm === true) {
      onClose();
      setSubmittedForm(false);
      setRefresh(true);
    }
  }, [submitted, onClose, submittedForm, refresh]);

  return (
    <Modal title="Edit Session Schedule" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
        <div className="mb-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Facilty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="id_facilty"
              placeholder={rowData[1]}
              value={SessionSchedule.id_facilty}
              label="Select Facilty"
              onChange={handleChange}
              className="shadow-md border-0 bg-white"
            >
              {rowFacilities.data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="id_doctor"
              value={SessionSchedule.id_doctor}
              label="Select Doctor"
              onChange={handleChange}
              className="shadow-md border-0 bg-white"
            >
              {rowDoctors.data?.map((item) => (
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
              value={SessionSchedule.id_schedule}
              label="Select Schedule"
              onChange={handleChange}
              className="shadow-md border-0 bg-white"
            >
              {newSchedules?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.day} {item.start} - {item.end}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col justify-center gap-2 mx-4  md:justify-end md:flex-row">
          <button onSubmit={onClick} className="btn-main btn-primary">
            Submit
          </button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
