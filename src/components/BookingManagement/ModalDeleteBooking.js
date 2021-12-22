import React from "react";
import Modal from "../Modal";

export default function ModalDeleteBooking({data,id}) {
  return (
    <Modal title="Delete Booking" id={`delete-booking-modal-${id}`}>
      <div>
        <h1>{`Are you sure to delete this data with id ${data[0]} `}</h1>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button className="btn-main btn-primary">Delete</button>
        <a href="#" className="btn-main btn-secondary">
          Cancel
        </a>
      </div>
    </Modal>
  );
}
