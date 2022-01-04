import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function ModalDeleteSchedule(props) {
  const { open, onClose, rowData } = props;
  console.log(rowData);
  const initState = {
    id: rowData[0],
    day: rowData[1],
    start: rowData[2],
    end: rowData[3],
  };
  const [valueForm, setvalueForm] = useState(initState);
  console.log(valueForm);

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);
  return (
    <Modal open={open} onClose={onClose} title="Delete Schedule">
      <div>
        <h1>{`Are you sure to delete this data with ID: ${valueForm.id} `}</h1>
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
