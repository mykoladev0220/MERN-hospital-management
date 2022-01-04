import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function ModalDeletePatient(props) {
  const { open, onClose, rowData } = props;

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

  return (
    <Modal open={open} onClose={onClose} title="Delete Patient">
      <div>
        <h1>{`Are you sure to delete this data with id ${valueForm.id} and name ${valueForm.fullname} `}</h1>
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
