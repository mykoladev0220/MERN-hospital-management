import React, { useState, useEffect } from "react";
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
import GetDataPatientByNoRM from "../../hooks/GetDataPatientByNoRM";
import AddNewPatient from "../../hooks/AddNewPatient";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterPatient(props) {
  const { dataPatient, setDataPatient } = props;
  const [refresh, setRefresh] = useState(true);
  const { dataPatientsByNoRM, getDataPatientsByNoRM, properties } =
    GetDataPatientByNoRM(refresh);
  const { resultAddNewPatien, sendDataToServer, submitted } = AddNewPatient();

  const [rmValue, setrmValue] = useState(true);
  const [noRM, setnoRM] = useState();
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  const initStatePatient = {
    id: "",
    fullname: "",
    nik: "",
    no_rm: "",
    address: "",
    dob: "2022-01-08T07:01:38.000Z",
    gender: "",
  };

  const [valueForm, setValueForm] = useState(dataPatient);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const onChangeDate = (newValue) => {
    setValueForm({
      ...valueForm,
      dob: newValue,
    });
  };

  const createRandomNumber = () => {
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  useEffect(() => {
    setDataPatient(valueForm);
    setnoRM(valueForm.no_rm);
  }, [valueForm, setDataPatient]);

  useEffect(() => {
    if (rmValue === false) {
      setValueForm({ ...valueForm, no_rm: "RM" + createRandomNumber() });
    }
  }, [rmValue]);

  useEffect(() => {
    if (resultAddNewPatien.meta?.rc === 200) {
      setValueForm({ ...valueForm, id: resultAddNewPatien.data?.id });
      setSuccessSnackbar(true);
      setSubmittedForm(false);
    }
  }, [resultAddNewPatien, setDataPatient]);

  console.log(rmValue, "rmValue");

  const handleClickRM = (e) => {
    e.preventDefault();
    getDataPatientsByNoRM(valueForm.no_rm);
    setRefresh(false);
    setSubmittedForm(true);
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    sendDataToServer(valueForm);
    setRefresh(false);
  };

  useEffect(() => {
    if (dataPatientsByNoRM.data?.id !== undefined) {
      setValueForm({
        ...valueForm,
        id: dataPatientsByNoRM.data?.id,
        fullname: dataPatientsByNoRM.data?.fullname,
        nik: dataPatientsByNoRM.data?.nik,
        no_rm: dataPatientsByNoRM.data?.no_rm,
        address: dataPatientsByNoRM.data?.address,
        gender: dataPatientsByNoRM.data?.gender,
        dob: dataPatientsByNoRM.data?.dob,
      });
    }
  }, [refresh, dataPatientsByNoRM]);

  const handleMouseDownRM = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    setSuccessSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbar(false);
  };

  console.log(noRM, rmValue, valueForm, "rmValue");

  return (
    <div className="max-w-md mx-auto">
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Patient Berhasil Terdaftar!
        </Alert>
      </Snackbar>
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
                  checked={rmValue === true}
                  onClick={() => setrmValue(true)}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  checked={rmValue === false}
                  onClick={() => setrmValue(false)}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            {rmValue === true ? (
              <TextField
                fullWidth
                id="outlined-basic"
                label="No Medical Number"
                name="no_rm"
                value={valueForm.no_rm}
                onChange={onChange}
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <button onClick={handleClickRM}>
                        <SearchIcon
                          className="w-6 h-6 p-0.5 hover:bg-gray-100 rounded-full"
                          onMouseDown={handleMouseDownRM}
                        />
                      </button>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            ) : null}
          </div>
          <div className="bg-maingreen-200 p-1 my-4 rounded-md" />
          <div className="mb-4">
            <TextField
              fullWidth
              required
              disabled={rmValue === true ? true : false}
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
          <div className="mb-4">
            <TextField
              fullWidth
              required
              disabled={rmValue === true ? true : false}
              id="outlined-basic"
              label="NIK"
              type="number"
              name="nik"
              value={valueForm.nik}
              onChange={onChange}
              color="primary"
              variant="outlined"
              size="small"
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              required
              disabled={rmValue === true ? true : false}
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
          <div className="mb-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack>
                <DesktopDatePicker
                  label="Date of Birth"
                  required
                  disabled={rmValue === true ? true : false}
                  inputFormat="MM/dd/yyyy"
                  name="dob"
                  value={valueForm.dob}
                  onChange={onChangeDate}
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
                required
              >
                <FormControlLabel
                  onChange={onChange}
                  disabled={rmValue === true ? true : false}
                  value="male"
                  name="gender"
                  checked={valueForm.gender === "male"}
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  onChange={onChange}
                  disabled={rmValue === true ? true : false}
                  value="female"
                  name="gender"
                  checked={valueForm.gender === "female"}
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <button
              onClick={handleRegisterPatient}
              className="bg-maingreen-200 text-white font-medium w-full py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
