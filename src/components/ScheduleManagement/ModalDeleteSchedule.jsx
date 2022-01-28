import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeleteSchedule from "../../hooks/DeleteSchedule";

export default function ModalDeleteSchedule(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, sendDataToServer } =
    DeleteSchedule();

  const initState = {
    id: rowData[0],
    day: rowData[1],
    start: rowData[2],
    end: rowData[3],
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  useEffect(() => {
    setvalueForm(initState);
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
    <Modal open={open} onClose={onClose} title="Delete Schedule">
      <form onSubmit={onClick}>
        <h1>{`Are you sure to delete this data with ID: ${valueForm.id} `}</h1>

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
