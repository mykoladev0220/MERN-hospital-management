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
import AddNewPatient from "../../hooks/AddNewPatient";

export default function ModalAddPatient(props) {
  const { open, onClose, refresh, setRefresh } = props;
  const { submitted, sendDataToServer } = AddNewPatient();

  const initState = {
    fullname: "",
    nik: "",
    no_rm: "",
    age: "",
    address: "",
    dob: "",
    gender: "",
  };

  const initFormErr = {
    fullname: "",
    nik: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);
  const [formErr, setformErr] = useState(initFormErr);

  const regexName = /^[A-Za-z ]*$/;
  const regexNIK = /^[0-9]{16}$/;
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
  const regexAge = /^[0-9]{1,2}$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "fullname") {
      if (regexName.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Name cannot contain numbers" });
      }
    }

    if (name === "nik") {
      if (regexNIK.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "NIK must be 16 digits" });
      }
    }

    if (name === "address") {
      if (regexAddress.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Address" });
      }
    }

    if (name === "no_rm") {
      if (value !== "") {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "RM number must be filled" });
      }
    }

    if (name === "age") {
      if (regexAge.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Age must be 1 - 2 digits" });
      }
    }

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
    if (
      formErr.fullname === "" &&
      formErr.nik === "" &&
      formErr.address === "" &&
      formErr.age === "" &&
      formErr.no_rm === "" &&
      valueForm.dob !== "" &&
      valueForm.gender !== ""
    ) {
      sendDataToServer(valueForm);
      setRefresh(false);
      setSubmittedForm(true);
    }
  };

  useEffect(() => {
    if (submittedForm === true) {
      onClose();
      setSubmittedForm(false);
      setRefresh(true);
    }
  }, [submittedForm, refresh]);

  return (
    <Modal title="Add Patient" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
        <div className="my-4">
          <TextField
            {...(formErr.fullname !== ""
              ? { error: true, helperText: formErr.fullname }
              : null)}
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
            {...(formErr.nik !== ""
              ? { error: true, helperText: formErr.nik }
              : null)}
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
            {...(formErr.no_rm !== ""
              ? { error: true, helperText: formErr.no_rm }
              : null)}
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
            {...(formErr.age !== ""
              ? { error: true, helperText: formErr.age }
              : null)}
            fullWidth
            id="outlined-basic"
            label="Age"
            name="age"
            type="number"
            value={valueForm.age}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.address !== ""
              ? { error: true, helperText: formErr.address }
              : null)}
            fullWidth
            multiline
            rows={2}
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
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                onChange={onChange}
                value="female"
                name="gender"
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
