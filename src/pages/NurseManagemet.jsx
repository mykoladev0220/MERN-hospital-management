import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalEditNurse from "../components/NurseManagement/ModalEditNurse";
import ModalAddNurse from "../components/NurseManagement/ModalAddNurse";
import ModalDeleteNurse from "../components/NurseManagement/ModalDeleteNurse";

export default function NurseManagemet() {
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
      label: "Name Nurse",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "password",
      label: "Password",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "dob",
      label: "Date of Birth",
      options: {
        filter: true,
        sort: false,
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
            Add Nurse
          </button>
        </>
      );
    },
  };

  const data = [
    {
      id: "1",
      name: "Nurse 1",
      username: "nurse1",
      password: "nurse1",
      gender: "male",
      address: "jakarta",
      phone: "08635335434",
      dob: "12-08-1978",
    },
    {
      id: "2",
      name: "Nurse 2",
      username: "nurse2",
      password: "nurse2",
      gender: "male",
      address: "jakarta",
      phone: "08635335434",
      dob: "12-08-1978",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Nurse Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Nurse List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ModalEditNurse
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalAddNurse open={openModalAdd} onClose={handleAddClose} />
      <ModalDeleteNurse
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
