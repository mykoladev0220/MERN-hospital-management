import React from "react";
import ModalMUI from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Modal({
  children,
  open,
  onClose,
  title,
  rowData,
  onEdit,
  ...props
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };
  return (
    <ModalMUI
      {...props}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div  className="max-w-md bg-white rounded-md p-4 mt-4">
          <div className="modal-box rounded-b-md max-w-sm">
            <div className="bg-maingreen-100 rounded-t-md absolute inset-x-0 top-0 py-4">
              <h1 className="text-white text-xl text-center">{title}</h1>
            </div>
            <div className="mt-14">{children}</div>
          </div>
        </div>
      </Box>
    </ModalMUI>
  );
}
