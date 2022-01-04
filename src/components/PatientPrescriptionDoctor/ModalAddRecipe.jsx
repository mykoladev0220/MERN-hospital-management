import React, { useState } from "react";
import { TextField } from "@mui/material";
import Modal from "../Modal";

export default function ModalAddRecipe(props) {
  const { open, onClose, rowData } = props;

  const initState = {
    medicine_name: "",
    medicine_rules: "",
  };

  const [valueForm, setvalueForm] = useState(initState);
  console.log(props);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };
  return (
    <Modal title="Add Recipe" open={open} onClose={onClose}>
      <div>
        <div className="my-4">
          <table class="table-auto">
            <tr>
              <td className="font-semibold">Name Patient </td>
              <td> : </td>
              <td> {rowData[1]}</td>
            </tr>
          </table>
        </div>
        <div className="my-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Medicine Name"
            name="medicine_name"
            value={valueForm.medicine_name}
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
            label="Medicine Rules"
            name="medicine_rules"
            value={valueForm.medicine_rules}
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
