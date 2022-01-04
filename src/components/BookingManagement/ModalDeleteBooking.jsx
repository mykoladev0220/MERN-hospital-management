import React, {useState, useEffect} from "react";
import Modal from "../Modal";

export default function ModalDeleteBooking(props) {
  const { open, onClose, rowData } = props;
  // console.log("object", rowData)
  let initState = {
    id: rowData[0],
    fullname: rowData[1],
    facility: rowData[2],
    doctor: rowData[3],
    date: rowData[4],
  };
  // console.log(open, onClose);
  useEffect(() => {
    setvalueForm(initState);
  }, [rowData]);

  const [valueForm, setvalueForm] = useState(initState);

  return (
    <Modal open={open} onClose={onClose}  title="Delete Booking">
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
