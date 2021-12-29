import React, { useState } from "react";
import { TextField } from "@mui/material";
import Modal from "../Modal";

export default function ModalAddFacility(props) {
  const { open, onClose } = props;
  console.log(open, onClose);
  const initState = {
    facility: "",
    capacity: "",
    location: "",
  };

  const [valueForm, setvalueForm] = useState(initState);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  return (
    <Modal title="Add Facilty" open={open} onClose={onClose}>
      <div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Facility"
            name="facility"
            value={valueForm.facility}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Capacity"
            name="capacity"
            value={valueForm.capacity}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Location"
            name="location"
            value={valueForm.location}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 mx-4  md:justify-end md:flex-row">
          <button className="btn-main btn-primary">Submit</button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
