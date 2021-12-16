import React, { useState } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "@heroicons/react/solid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

export default function RegisterPatient() {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="py-4">
        <h1 className="text-center font-semibold text-xl">Register Patient</h1>
      </div>
      <div>
        <form>
          <div className="mb-4">
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Have a Medical Record Number?
              </FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="No Medical Number"
              color="primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="w-5 h-5" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </div>
          <div className="bg-maingreen-200 p-1 my-4 rounded-md" />
          <div className="mb-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Fullname"
              color="primary"
              variant="outlined"
              size="small"
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="NIK"
              color="primary"
              variant="outlined"
              size="small"
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              color="primary"
              variant="outlined"
              size="small"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div>
            <button className="bg-maingreen-200 text-white font-medium w-full py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
