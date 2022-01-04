import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Modal from "../Modal";

export default function ModalDeleteFacility(props) {
  const { open, onClose, rowData } = props;

  const initState = {
    id: rowData[0],
    facility: rowData[1],
    capacity: rowData[2],
    location: rowData[3],
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
    <Modal open={open} onClose={onClose} title="Delete Facility">
      <div>
        <h1>{`Are you sure to delete this data with ID : ${valueForm.id} and Facility : ${valueForm.facility} `}</h1>
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
