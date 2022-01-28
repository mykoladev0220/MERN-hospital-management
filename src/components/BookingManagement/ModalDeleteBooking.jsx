import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeleteBooking from "../../hooks/DeleteBooking";

export default function ModalDeleteBooking(props) {
  const { open, onClose, rowData, refresh, setRefresh } = props;
  const { submitted, sendDataToServer } = DeleteBooking();

  let initState = {
    id: rowData[0],
    fullname: rowData[1],
    facility: rowData[2],
    doctor: rowData[3],
    date: rowData[4],
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
    <Modal open={open} onClose={onClose} title="Delete Booking">
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
