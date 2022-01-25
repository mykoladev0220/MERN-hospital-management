import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeletePrescription from "../../hooks/DeletePrescription";

export default function ModalDeletePrescription(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, resultDeletePrescription, sendDataToServer } =
    DeletePrescription();

  const initState = {
    id: parseInt(rowData.id),
  };

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

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
    <Modal open={open} onClose={onClose} title="Edit Prescription">
      <form onSubmit={onClick}>
        <div>
          <h1>{`Are you sure to delete this data with id ${valueForm.id}  `}</h1>
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
