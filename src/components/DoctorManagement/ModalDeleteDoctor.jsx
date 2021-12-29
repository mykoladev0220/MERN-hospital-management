import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function ModalDeleteDoctor(props) {
  const { open, onClose, rowData } = props;

  const initState = {
    id: rowData[0],
    fullname: rowData[1],
    username: rowData[2],
    password: rowData[3],
    specialist: rowData[4],
    phone: rowData[7],
    address: rowData[6],
    dob: rowData[8],
    gender: rowData[5],
  };

  const [valueForm, setvalueForm] = useState(initState);

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  return (
    <Modal open={open} onClose={onClose} title="Delete Doctor">
      <div>
        <h1>{`Are you sure to delete this data with ID : ${valueForm.id} and Name : ${valueForm.fullname} `}</h1>
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
