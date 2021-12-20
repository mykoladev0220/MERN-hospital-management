import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";

export default function ModalEdit(props) {
  const { open, onClose, data, id, alldata } = props;
  console.log(data, "data");
  return (
    <div id={`edit-modal-${id}`}>
      <Dialog open={open} onClose={onClose}>
        <Dialog.Overlay />

        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>
        {/* <h1>{data[1]}</h1> */}
        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        {/* <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
        <button onClick={onClose}>Cancel</button>
      </Dialog>
    </div>
  );
}
