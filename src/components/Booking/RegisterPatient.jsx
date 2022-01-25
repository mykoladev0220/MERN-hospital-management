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
  const { dataPatientsByNoRM, getDataPatientsByNoRM } =
    GetDataPatientByNoRM(refresh);
  const { resultAddNewPatien, sendDataToServer, submitted } = AddNewPatient();

  const [rmValue, setrmValue] = useState(true);
  const [noRM, setnoRM] = useState();
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  const initStatePatient = {
    id: "",
    fullname: "",
    nik: "",
    no_rm: "",
    address: "",
    dob: "2022-01-08T07:01:38.000Z",
    gender: "",
    age: "",
  };

  const initFormErr = {
    fullname: "",
    nik: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
  };

  const [valueForm, setValueForm] = useState(dataPatient);
  const [formErr, setformErr] = useState(initFormErr);

  const regexName = /^[A-Za-z ]*$/;
  const regexNIK = /^[0-9]{16}$/;
  const regexAddress = /^[A-Za-z0-9 ]*$/;
  const regexAge = /^[0-9]{2}$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "fullname") {
      if (regexName.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Nama tidak boleh mengandung huruf" });
      }
    }

    if (name === "nik") {
      if (regexNIK.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "NIK harus 16 Digit" });
      }
    }

    if (name === "address") {
      if (regexAddress.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Address" });
      }
    }

    if (name === "age") {
      if (regexAge.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Age" });
      }
    }

    if (name === "dob") {
      if (value !== "") {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Date" });
      }
    }

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
    } else if (resultAddNewPatien.meta?.rc === 400) {
      setErrorSnackbar(true);
      setSubmittedForm(false);
    }
  }, [resultAddNewPatien, setDataPatient]);

  const handleClickRM = (e) => {
    e.preventDefault();
    getDataPatientsByNoRM(valueForm.no_rm);
    setRefresh(false);
    setSubmittedForm(true);
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    if (
      formErr.fullname === "" &&
      formErr.nik === "" &&
      formErr.address === "" &&
      formErr.age === "" &&
      formErr.dob === ""
    ) {
      sendDataToServer(valueForm);
      setRefresh(false);
      // setValueForm(initStatePatient);
    }
  };

  useEffect(() => {
    if (dataPatientsByNoRM.data?.id !== undefined) {
      setValueForm({
        ...valueForm,
        id: dataPatientsByNoRM.data?.id,
        fullname: dataPatientsByNoRM.data?.fullname,
        nik: dataPatientsByNoRM.data?.nik,
        no_rm: dataPatientsByNoRM.data?.no_rm,
        age: dataPatientsByNoRM.data?.age,
        address: dataPatientsByNoRM.data?.address,
        gender: dataPatientsByNoRM.data?.gender,
        dob: dataPatientsByNoRM.data?.dob,
      });
    }
  }, [refresh, dataPatientsByNoRM]);

  const handleMouseDownRM = (event) => {
    event.preventDefault();
  };

  const handleCloseSucces = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbar(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };

  console.log(noRM, rmValue, valueForm, "rmValue");

  return (
    <div className="max-w-md mx-auto">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSucces}
      >
        <Alert
          onClose={handleCloseSucces}
          severity="success"
          className="bg-maingreen-100"
          sx={{ width: "100%" }}
        >
          Patient Berhasil Terdaftar!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          This is an error message!
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
              {...(formErr.fullname !== ""
                ? { error: true, helperText: formErr.fullname }
                : null)}
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
              {...(formErr.nik !== ""
                ? { error: true, helperText: formErr.nik }
                : null)}
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
              {...(formErr.address !== ""
                ? { error: true, helperText: formErr.address }
                : null)}
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
            <TextField
              {...(formErr.age !== ""
                ? { error: true, helperText: formErr.age }
                : null)}
              fullWidth
              required
              disabled={rmValue === true ? true : false}
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
          <div className="mb-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack>
                <DesktopDatePicker
                  {...(formErr.dob !== ""
                    ? { error: true, helperText: formErr.dob }
                    : null)}
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
              disabled={rmValue === true ? true : false}
              onClick={handleRegisterPatient}
              className={
                rmValue === true
                  ? `btn-main  bg-slate-300 text-white font-medium w-full`
                  : `btn-main btn-green w-full`
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
