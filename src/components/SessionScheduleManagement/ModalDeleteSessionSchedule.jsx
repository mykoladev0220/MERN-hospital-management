import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import DeleteSessionSchedule from "../../hooks/DeleteSessionSchedule";

export default function ModalDeleteSessionSchedule(props) {
  const {
    open,
    onClose,
    rowData,
    refresh,
    setRefresh,
  } = props;
  const { submitted, resultDeleteSessionSchedule, sendDataToServer } =
    DeleteSessionSchedule();

  const session_schedule = {
    id: rowData[0],
    id_facilty: rowData[1],
    id_doctor: rowData[2],
    id_schedule: rowData[3],
  };

  const [SessionSchedule, setSessionSchedule] = useState(session_schedule);
  const [submittedForm, setSubmittedForm] = useState(submitted);

  useEffect(() => {
    setSessionSchedule(session_schedule);
  }, [rowData]);

  const onClick = (e) => {
    e.preventDefault();
    sendDataToServer(SessionSchedule);
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
    <Modal open={open} onClose={onClose} title="Delete Session Schedule">
      <form onSubmit={onClick}>
        <div>
          <h1>{`Are you sure to delete this data with id ${SessionSchedule.id}`}</h1>
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
