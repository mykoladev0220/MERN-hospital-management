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

export default function ModalAddPatient(props) {
  const { open, onClose } = props;
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      id="add-modal"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-md max-w-sm w-full shadow-md shadow-maingreen-200/70 transition ease-in-out delay-200">
          <div className="bg-maingreen-100 rounded-t-md py-4">
            <h1 className="text-white text-xl text-center">Add Patient</h1>
          </div>
          <div>
            <div className="my-4 px-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Fullname"
                color="primary"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="my-4 px-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="NIK"
                color="primary"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="my-4 px-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Address"
                color="primary"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="my-4 px-4">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DesktopDatePicker
                    label="Date of Birth"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="my-4 px-4">
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="my-4 mx-4 flex md:justify-end flex-col md:flex-row justify-center gap-2">
            <button className="bg-maingreen-200 text-white px-4 py-1 rounded-md">
              Submit
            </button>
            <button
              className="bg-red-400 text-white px-4 py-1 rounded-md "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
