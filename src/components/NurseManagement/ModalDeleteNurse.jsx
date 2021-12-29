import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function ModalDeleteNurse(props) {
  const { open, onClose, rowData } = props;
  console.log(rowData);
  const initState = {
    id: rowData[0],
    fullname: rowData[1],
    username: rowData[2],
    password: rowData[3],
    phone: rowData[6],
    address: rowData[5],
    dob: rowData[7],
    gender: rowData[8],
  };

  const [valueForm, setvalueForm] = useState(initState);

  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };
  return (
    <Modal open={open} onClose={onClose} title="Delete Nurse">
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
  );;
}
