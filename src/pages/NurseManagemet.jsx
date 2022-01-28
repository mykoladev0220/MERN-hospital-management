import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalEditNurse from "../components/NurseManagement/ModalEditNurse";
import ModalAddNurse from "../components/NurseManagement/ModalAddNurse";
import ModalDeleteNurse from "../components/NurseManagement/ModalDeleteNurse";
import GetDataNurses from "../hooks/GetDataNurses";
import idLocale from "date-fns/locale/id";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

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
  const [refresh, setRefresh] = useState(true);
  const { dataNurses, properties } = GetDataNurses(refresh);

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
        customBodyRender: (value, tableMeta, updateValue) => {
          return format(new Date(value), "dd/MM/yyyy", {
            locale: idLocale,
          });
        },
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
                  <div className="flex items-center">
                    <PencilAltIcon className="mr-1 w-4 h-4" />
                    Edit
                  </div>
                </button>
                <button
                  className="btn-main btn-secondary"
                  onClick={() => {
                    handleDeleteOpen();
                    setRowData(tableMeta.rowData);
                  }}
                >
                  <div className="flex items-center">
                    <TrashIcon className="mr-1 w-4 h-4" />
                    Delete
                  </div>
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
    textLabels: {
      body: {
        noMatch: properties.loading ? (
          <CircularProgress className="my-5" size={35} color={"success"} />
        ) : (
          "Sorry, there is no matching data to display"
        ),
      },
    },
    customToolbar: () => {
      return (
        <>
          <button
            className="btn-main btn-green"
            onClick={() => {
              handleAddOpen();
            }}
          >
            <div className="flex items-center">
              <PlusIcon className="mr-1 w-4 h-4" />
              Add Nurse
            </div>
          </button>
        </>
      );
    },
  };

  let newData = [];
  newData = dataNurses.data?.map((item) => {
    return {
      id: item.id,
      fullname: item.fullname,
      username: item.username,
      address: item.address,
      phone_number: item.phone_number,
      gender: item.gender,
      dob: item.dob,
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
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalAddNurse
        open={openModalAdd}
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleAddClose}
      />
      <ModalDeleteNurse
        open={openModalDelete}
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
