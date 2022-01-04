import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddFacility from "../components/FacilityManagement/ModalAddFacility";
import ModalEditFacility from "../components/FacilityManagement/ModalEditFacility";
import ModalDeleteFacility from "../components/FacilityManagement/ModalDeleteFacility";

export default function FaciltyManagement() {
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
      name: "name",
      label: "Name Facility",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "capacity",
      label: "Capacity",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "location",
      label: "Location",
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
            Add Facility
          </button>
        </>
      );
    },
  };

  const data = [
    {
      id: 1,
      name: "Facility 1",
      capacity: "100",
      location: "Gedung A",
    },
    {
      id: 2,
      name: "Facility 2",
      capacity: "200",
      location: "Gedung B",
    },
    {
      id: 3,
      name: "Facility 3",
      capacity: "300",
      location: "Gedung A",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Facilty Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Facilty List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddFacility open={openModalAdd} onClose={handleAddClose} />
      <ModalEditFacility
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeleteFacility
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
