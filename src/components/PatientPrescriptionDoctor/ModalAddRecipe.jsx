import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Modal from "../Modal";
import AddPrescription from "../../hooks/AddPrescription";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export default function ModalAddRecipe(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, properties, resultAddPrescription, sendDataToServer } =
    AddPrescription();

  const [token, setToken] = useState({
    id: "",
  });

  const bearerToken = useSelector((state) => state.login.token);

  useEffect(() => {
    let decoded = jwt_decode(bearerToken);
    setToken(decoded);
  }, [bearerToken]);

  var initState = {
    medicine_name: "",
    medication_rules: "",
    id_patient: 0,
    id_doctor: 0,
    id_sessionbooking: 1,
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  console.log("rowData", rowData);
  console.log("valueForm", valueForm);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };


  console.log("valueForm", valueForm);
  
  useEffect(() => {
    setvalueForm({
      ...valueForm,
      id_patient: rowData[1],
      id_sessionbooking: rowData[0],
      id_doctor: token.id,
    });
  }, [rowData]);

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
  }, [submittedForm, refresh]);

  return (
    <Modal title="Add Prescription" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
        <div className="my-4">
          <table className="table-auto">
            <tr>
              <td className="font-semibold">Name Patient </td>
              <td> : </td>
              <td> {rowData[2]}</td>
              {/* <td>ID : {rowData[0]}</td> */}
            </tr>
          </table>
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Medicine Name"
            name="medicine_name"
            value={valueForm.medicine_name}
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
            label="Medicine Rules"
            name="medication_rules"
            value={valueForm.medication_rules}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
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
