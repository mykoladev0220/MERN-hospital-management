import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSessionSchedule from "../components/SessionScheduleManagement/ModalAddSessionSchedule";
import ModalEditSessionSchedule from "../components/SessionScheduleManagement/ModalEditSessionSchedule";
import ModalDeleteSessionSchedule from "../components/SessionScheduleManagement/ModalDeleteSessionSchedule";

export default function SessionScheduleManagement() {
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
      name: "facilty",
      label: "Facility",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "doctor",
      label: "Doctor",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "schedule",
      label: "Schedule",
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
            Add Session Schedule
          </button>
        </>
      );
    },
  };

  const data = [
    {
      id: 1,
      facilty: "Klinik Utama",
      doctor: "Dr. A",
      schedule: "08.00 - 09.00",
    },
    {
      id: 2,
      facilty: "Klinik Utama",
      doctor: "Dr. B",
      schedule: "09.00 - 10.00",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">
          Session Schedule Management
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Session Schedule List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddSessionSchedule
        open={openModalAdd}
        onClose={handleAddClose}
      />
      <ModalEditSessionSchedule
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeleteSessionSchedule
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
