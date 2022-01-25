import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import EditPrescription from "../../hooks/EditPrescription";
import { TextField } from "@mui/material";

export default function ModalEditPrescription(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, sendDataToServer } = EditPrescription();

  const initState = {
    id: parseInt(rowData.id),
    medicine_name: rowData.name,
    medication_rules: rowData.rules,
    id_patient: rowData.id_patient,
    id_doctor: rowData.id_doctor,
    id_sessionbooking: rowData.id_sessionbooking,
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
    <Modal title="Edit Prescription" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
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
