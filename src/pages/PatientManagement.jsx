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
                    console.log(tableMeta.rowData, "table meta");
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

  // function yyyy-MM-dd'T'HH:mm:ss.SSS'Z' to dd-MM-YYYY
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
  newData = dataPatients.data?.map((data) => {
    return {
      id: data['id:'],
      name: data.fullname,
      nik: data.nik,
      norm: data.no_rm,
      address: data.address,
      gender: data.gender,
      dob: dateFormat(data.dob),
    };
  });

  console.log(newData, "newData");
  console.log(dataPatients.data, "data Patients")
  dataPatients.data?.map((data) => {
    console.log(data.fullname, "f name")
    console.log(data['id:'])
  })
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
