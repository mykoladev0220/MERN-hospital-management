import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import { TextField } from "@mui/material";
import idLocale from "date-fns/locale/id";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import EditSchedule from "../../hooks/EditSchedule";

export default function ModalEditSchedule(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, sendDataToServer } = EditSchedule();

  const initState = {
    id: rowData[0],
    day: rowData[1],
    start: rowData[2],
    end: rowData[3],
  };
  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const onChangeStart = (newValue) => {
    setvalueForm({
      ...valueForm,
      start: newValue,
    });
  };

  const onChangeEnd = (newValue) => {
    setvalueForm({
      ...valueForm,
      end: newValue,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(valueForm);
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
    <Modal title="Edit Schedule" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
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
                type="time"
                value={valueForm.start}
                onChange={onChangeStart}
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
                onChange={onChangeEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="my-4"></div>
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
