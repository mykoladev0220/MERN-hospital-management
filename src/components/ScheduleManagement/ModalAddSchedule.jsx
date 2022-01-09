import React, { useState } from "react";
import Modal from "../Modal";
import { TextField } from "@mui/material";
import idLocale from "date-fns/locale/id";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";

export default function ModalAddSchedule(props) {
  const { open, onClose, refresh, setRefresh } = props;

  const initState = {
    day: "",
    start: "",
    end: "",
  };

  const [valueForm, setvalueForm] = useState(initState);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  return (
    <Modal title="Add Schedule" open={open} onClose={onClose}>
      <div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Day"
            name="day"
            value={valueForm.day}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4 w-full">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={idLocale}>
            <Stack>
              <DesktopTimePicker
                label="Start"
                name="start"
                value={valueForm.start}
                onChange={(newValue) => {
                  setvalueForm({ start: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="my-4 w-full">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={idLocale}>
            <Stack>
              <DesktopTimePicker
                label="End"
                name="end"
                value={valueForm.end}
                onChange={(newValue) => {
                  setvalueForm({ end: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="my-4"></div>
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
