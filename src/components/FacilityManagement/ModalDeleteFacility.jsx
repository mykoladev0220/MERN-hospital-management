import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeleteFacility from "../../hooks/DeleteFacility";

export default function ModalDeleteFacility(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { sendDataToServer, submitted } = DeleteFacility();

  const initState = {
    id: rowData[0],
    name: rowData[1],
    capacity: rowData[2],
    location: rowData[3],
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
    <Modal open={open} onClose={onClose} title="Delete Facility">
      <form onSubmit={onClick}>
        <h1>{`Are you sure to delete this data with ID : ${valueForm.id} and Facility : ${valueForm.facility} `}</h1>
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
