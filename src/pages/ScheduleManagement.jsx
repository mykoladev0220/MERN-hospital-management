import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSchedule from "../components/ScheduleManagement/ModalAddSchedule";
import ModalEditSchedule from "../components/ScheduleManagement/ModalEditSchedule";
import ModalDeleteSchedule from "../components/ScheduleManagement/ModalDeleteSchedule";

export default function ScheduleManagement() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleEditOpen = () => setOpenModalEdit(true);
  const handleEditClose = () => setOpenModalEdit(false);
  const handleAddOpen = () => setOpenModalAdd(true);
  const handleAddClose = () => setOpenModalAdd(false);
  const handleDeleteOpen = () => setOpenModalDelete(true);
  const handleDeleteClose = () => setOpenModalDelete(false);
  const [rowData, setRowData] = useState([]);

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "day",
      label: "Day",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "start",
      label: "Start",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "end",
      label: "End",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="flex gap-1">
                <button
                  className="btn-main btn-primary"
                  onClick={() => {
                    handleEditOpen();
                    setRowData(tableMeta.rowData);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-main btn-secondary"
                  onClick={() => {
                    handleDeleteOpen();
                    setRowData(tableMeta.rowData);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    download: false,
    print: false,
    viewColumns: false,
    actionsColumnIndex: -1,
    customToolbar: () => {
      return (
        <>
          <button
            className="btn-main btn-green"
            onClick={() => {
              handleAddOpen();
            }}
          >
            Add Schedule
          </button>
        </>
      );
    },
  };

  const data = [
    {
      id: 1,
      day: "Monday",
      start: "08:00",
      end: "16:00",
    },
    {
      id: 2,
      day: "Tuesday",
      start: "08:00",
      end: "16:00",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">
          Schedule Management
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Schedule List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddSchedule open={openModalAdd} onClose={handleAddClose} />
      <ModalEditSchedule
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeleteSchedule
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
