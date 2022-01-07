import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeleteNurse from "../../hooks/DeleteNurse";

export default function ModalDeleteNurse(props) {
  const { open, onClose, rowData } = props;
  const { resultDeleteNurse, sendDataToServer, submitted } = DeleteNurse();

  const initState = {
    id: rowData[0],
    fullname: rowData[1],
    username: rowData[2],
    password: rowData[3],
    phone_number: rowData[6],
    address: rowData[5],
    dob: rowData[7],
    gender: rowData[8],
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(valueForm);
    setSubmittedForm(true);
  };

  useEffect(() => {
    if (submittedForm === true) {
      onClose();
      // getDataPatients();
      setSubmittedForm(false);
    }
  }, [submitted, onClose, submittedForm]);

  return (
    <Modal open={open} onClose={onClose} title="Delete Nurse">
      <form onSubmit={onClick}>
        <div onSubmit={onClick}>
          <h1>{`Are you sure to delete this data with ID : ${valueForm.id} and Name : ${valueForm.fullname} `}</h1>
        </div>
        <div onSubmit={onClick} className="flex justify-end gap-2 mt-5">
          <button className="btn-main btn-primary">Submit</button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
