import React, { useState } from "react";
import Modal from "@mui/material/Modal";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function ModalEditPatient(props) {
  const { open, onClose, data, id } = props;
  //   console.log(alldata,"alldata");
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  console.log(data, "data");
  const newData = data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        fullname: "",
        nik: "",
        address: "",
        dob: "",
        gender: "",
      };
    }
  });
  console.log(id, "id");
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const initState = {
    id: data[0],
    fullname: data[1],
    nik: data[2],
    address: data[3],
    dob: "",
    gender: data[5],
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
    <div id={`edit-modal-${id}`} className="modal">
      {/* <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        {/* <div className="min-h-screen flex items-center justify-center"> */}
          <div className="relative modal-box rounded-b-md ">
            <div className="bg-maingreen-100 rounded-t-md absolute inset-x-0 top-0 py-4">
              <h1 className="text-white text-xl text-center">Edit Patient</h1>
            </div>
            <div class="mt-14">
              <div className="px-4 my-4">
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
              <div className="px-4 my-4">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="NIK"
                  //   placeholder={data[2]}
                  value={valueForm.nik}
                  onChange={onChange}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="px-4 my-4">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address"
                  value={valueForm.address}
                  onChange={onChange}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="px-4 my-4">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="px-4 my-4">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      onChange={onChange}
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      onChange={onChange}
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 mx-4 my-4 md:justify-end md:flex-row">
              <button className="px-4 py-1 text-white rounded-md bg-maingreen-200">
                Submit
              </button>
              <a
                href="#"
                className="px-4 py-1 text-white bg-red-400 rounded-md "
                onClick={onClose}
              >
                Cancel
              </a>
            </div>
          </div>
        {/* </div> */}
      {/* </Modal> */}
    </div>
  );
}
