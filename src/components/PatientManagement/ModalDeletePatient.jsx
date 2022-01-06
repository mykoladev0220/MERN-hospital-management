import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeletePatient from "../../hooks/DeletePatient";
import GetDataPatients from "../../hooks/GetDataPatients";

export default function ModalDeletePatient(props) {
  const { open, onClose, rowData } = props;
  const { resultDeletePatient, sendDataToServer, submitted } = DeletePatient();
  const { dataPatients, getDataPatients } = GetDataPatients();

  let initState = {
    id: rowData[0],
    fullname: rowData[1],
    nik: rowData[2],
    norm: rowData[3],
    address: rowData[4],
    dob: new Date(rowData[6]),
    gender: rowData[5],
  };

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  // console.log(submitted, "ini submitted");
  // console.log(submittedForm, "ini submitted form");

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(valueForm);
    setSubmittedForm(true);
  };

  useEffect(() => {
    if (submittedForm === true) {
      onClose();
      getDataPatients();
      setSubmittedForm(false);
    }
  }, [submitted, onClose, submittedForm]);

  return (
    <Modal open={open} onClose={onClose} title="Delete Patient">
      <form onSubmit={onClick}>
        <div>
          <h1>{`Are you sure to delete this data with id ${valueForm.id} and name ${valueForm.fullname} `}</h1>
        </div>
        <div className="flex justify-end gap-2 mt-5">
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
