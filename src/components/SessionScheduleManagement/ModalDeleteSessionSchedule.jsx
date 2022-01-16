import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function ModalDeleteSessionSchedule(props) {
  const { open, onClose, rowData } = props;
  const session_schedule = {
    id: rowData[0],
    facilty: rowData[1],
    doctor: rowData[2],
    schedule: rowData[3],
  };

  const [SessionSchedule, setSessionSchedule] = useState(session_schedule);
 
  useEffect(() => {
    setSessionSchedule(session_schedule);
  }, [rowData]);

  return (
    <Modal open={open} onClose={onClose} title="Delete Session Schedule">
      <div>
        <h1>{`Are you sure to delete this data with id ${SessionSchedule.id}`}</h1>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button className="btn-main btn-primary">Submit</button>
        <button className="btn-main btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
