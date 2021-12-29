import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddPatient from "../components/PatientManagement/ModalAddPatient";
import ModalEditPatient from "../components/PatientManagement/ModalEditPatient.jsx";
import ModalDeletePatient from "../components/PatientManagement/ModalDeletePatient";
import GetDataPatients from "../hooks/GetDataPatients";

export default function PatientManagement() {
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
  const { dataPatients } = GetDataPatients();

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "name",
      label: "Name Patient",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nik",
      label: "NIK",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "norm",
      label: "No RM",
      options: {
        filter: false,
        sort: false,
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
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "dob",
      label: "DOB",
      options: {
        filter: false,
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
            Add Patient
          </button>
        </>
      );
    },
  };

  let newData = [];
  newData = dataPatients?.map((data) => {
    return {
      id: data.id,
      name: data.fullName,
      nik: data.col1,
      norm: data.D,
      address: data.C,
      gender: data.E,
      dob: data.F,
    };
  });

  const data = [
    {
      id: 1,
      name: "Joe James",
      nik: 1231243432452345,
      norm: "RM000001",
      address: "Malang",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 2,
      name: "John Walsh",
      nik: 1231243432452345,
      norm: "RM000001",
      address: "Jogja",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 3,
      name: "Bob Herm",
      nik: 1231243432452345,
      norm: "RM000001",
      address: "Jakarta",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 4,
      name: "James Houston",
      nik: 1231243432452345,
      norm: "RM000001",
      address: "Malang",
      gender: "male",
      dob: "27-08-1997",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Patient Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Patient List"}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddPatient open={openModalAdd} onClose={handleAddClose} />
      <ModalEditPatient
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeletePatient
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
