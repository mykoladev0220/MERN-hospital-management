import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalEditNurse from "../components/NurseManagement/ModalEditNurse";
import ModalAddNurse from "../components/NurseManagement/ModalAddNurse";
import ModalDeleteNurse from "../components/NurseManagement/ModalDeleteNurse";
import GetDataNurses from "../hooks/GetDataNurses";

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
  const { dataNurses, getDataNurses } = GetDataNurses();

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "fullname",
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
      name: "phone_number",
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

  const dateFormat = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  let newData = [];
  newData = dataNurses.data?.map((item) => {
    return {
      id: item.id,
      fullname: item.fullname,
      username: item.username,
      address: item.address,
      phone_number: item.phone_number,
      dob: dateFormat(item.dob),
      gender: item.gender,
    };
  });

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Nurse Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Nurse List"}
          data={newData}
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
