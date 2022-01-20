import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import Modal from "../Modal";
import EditPatient from "../../hooks/EditPatient";

export default function ModalEditPatient(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { resultEditPatien, sendDataToServer, submitted } = EditPatient();

  let initState = {
    id: rowData[0],
    fullname: rowData[1],
    nik: rowData[2],
    no_rm: rowData[3],
    address: rowData[4],
    dob: rowData[6],
    gender: rowData[5],
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


  const onChangeDate = (newValue) => {
    setvalueForm({
      ...valueForm,
      dob: newValue,
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

  console.log(valueForm);

  return (
    <Modal open={open} onClose={onClose} title="Edit Patient">
      <form onSubmit={onClick}>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Fullname"
            name="fullname"
            value={valueForm.fullname}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-number"
            label="NIK"
            name="nik"
            type="number"
            value={valueForm.nik}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="No RM"
            name="no_rm"
            value={valueForm.no_rm}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Address"
            name="address"
            value={valueForm.address}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="dd/MM/yyyy"
                name="dob"
                value={valueForm.dob}
                onChange={onChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="my-4">
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel
                onChange={onChange}
                name="gender"
                value="male"
                checked={valueForm.gender === "male"}
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                onChange={onChange}
                value="female"
                name="gender"
                checked={valueForm.gender === "female"}
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
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
