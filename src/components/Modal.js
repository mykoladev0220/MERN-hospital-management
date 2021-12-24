import React from "react";
import ModalMUI from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Modal({
  children,
  open,
  onClose,
  title,
  id,
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
    // bgcolor: "background.paper",
    // border: "2px solid #000",
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
        <div id={id} className="max-w-md">
          <div className="relative modal-box rounded-b-md max-w-sm">
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
