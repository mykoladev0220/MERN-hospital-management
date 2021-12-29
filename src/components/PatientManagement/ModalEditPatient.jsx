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

export default function ModalEditPatient(props) {
  const { open, onClose, rowData } = props;

  let initState = {
    id: rowData[0],
    fullname: rowData[1],
    nik: rowData[2],
    norm: rowData[3],
    address: rowData[4],
    dob: new Date(rowData[6]),
    gender: rowData[5],
  };

  const [valueForm, setvalueForm] = useState(initState);

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Patient"
    >
      <div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Fullname"
            name="fullname"
            //   placeholder={data[1]}
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
            id="outlined-basic"
            label="NIK"
            name="nik"
            //   placeholder={data[2]}
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
            name="norm"
            value={valueForm.norm}
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
                onChange={onChange}
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
          <button className="btn-main btn-primary">Submit</button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
