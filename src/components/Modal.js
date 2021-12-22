import React from "react";

export default function Modal({
  children,
  open,
  onClose,
  title,
  id,
  data,
  onEdit,
  ...props
}) {
  return (
    <div id={id} className="modal">
      <div className="relative modal-box rounded-b-md max-w-sm">
        <div className="bg-maingreen-100 rounded-t-md absolute inset-x-0 top-0 py-4">
          <h1 className="text-white text-xl text-center">{title}</h1>
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </div>
  );
}
