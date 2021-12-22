import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { PencilIcon } from "@heroicons/react/outline";
import ModalAddPatient from "../components/PatientManagement/ModalAddPatient";
import ModalEditPatient from "../components/PatientManagement/ModalEditPatient";
import ModalDeletePatient from "../components/PatientManagement/ModalDeletePatient";
import Button from "../components/Button";
import { DataPatients } from "../data/DataPatients";
import GetDataPatients from "../hooks/GetDataPatients";

export default function PatientManagement() {
  const [openModalAddPatient, setOpenModalAddPatient] = useState(false);
  const handleOpenModalAddPatient = () => setOpenModalAddPatient(true);
  const handleCloseModalAddPatient = () => setOpenModalAddPatient(false);
  const [openModalEditPatient, setopenModalEditPatient] = useState(false);
  const handleOpenModalEditPatient = () => setopenModalEditPatient(true);
  const handleCloseModalEditPatient = () => setopenModalEditPatient(false);
  const { dataPatients } = GetDataPatients();
  console.log(dataPatients, "DataPatients");
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
                <a
                  href={`#edit-modal-${tableMeta.rowData[0]}`}
                  className="btn-main btn-primary"
                  onClick={() => handleOpenModalEditPatient}
                  // onClick={() => {window.alert(`clicked row #edit-modal-${tableMeta.rowData[0]} with data ${tableMeta.rowData}`)}}
                >
                  Edit
                </a>
                <a
                  href={`#delete-modal-${tableMeta.rowData[0]}`}
                  className="btn-main btn-secondary"
                  onClick={() => handleOpenModalEditPatient}
                >
                  Delete
                </a>
              </div>
              <ModalEditPatient
                id={tableMeta.rowData[0]}
                open={openModalEditPatient}
                data={tableMeta.rowData}
                alldata={tableMeta.tableData}
                onClose={handleCloseModalEditPatient}
              />
              <ModalDeletePatient
                id={tableMeta.rowData[0]}
                open={openModalEditPatient}
                data={tableMeta.rowData}
                alldata={tableMeta.tableData}
                onClose={handleCloseModalEditPatient}
              />
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
          <a
            href={`#add-modal-patient`}
            className="btn-main btn-green"
            onClick={() => handleOpenModalAddPatient()}
          >
            Add Patient
          </a>
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
      <ModalAddPatient />
    </div>
  );
}
