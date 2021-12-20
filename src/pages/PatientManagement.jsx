import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { PencilIcon } from "@heroicons/react/outline";
import ModalAddPatient from "../components/PatientManagement/ModalAddPatient";
import ModalEditPatient from "../components/PatientManagement/ModalEditPatient";
import ModalEdit from "../components/PatientManagement/ModalEdit";
import Button from "../components/Button";

export default function PatientManagement() {
  const [openModalAddPatient, setOpenModalAddPatient] = useState(false);
  const handleOpenModalAddPatient = () => setOpenModalAddPatient(true);
  const handleCloseModalAddPatient = () => setOpenModalAddPatient(false);
  const [openModalEditPatient, setopenModalEditPatient] = useState(false);
  const handleOpenModalEditPatient = () => setopenModalEditPatient(true);
  const handleCloseModalEditPatient = () => setopenModalEditPatient(false);

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
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="flex gap-1">
                <a
                  href={`#edit-modal-${tableMeta.rowData[0]}`}
                  className="btn btn-primary"
                  onClick={handleOpenModalEditPatient}
                >
                  Edit
                </a>
                <Button className="btn-secondary">Delete</Button>
              </div>
              <ModalEditPatient
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
        <button
          className="px-2 py-0 mr-1 text-white rounded-md bg-maingreen-100"
          onClick={handleOpenModalAddPatient}
        >
          Add Patient
        </button>
      );
    },
    customRowRender: (data) => {
      const [id, name, nik, norm, gender, dob] = data;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{nik}</td>
          <td>{norm}</td>
          <td>{gender}</td>
          <td>{dob}</td>
          <td>
            <a
              href={`#edit-modal-${id}`}
              className="btn btn-primary"
              onClick={handleOpenModalEditPatient}
            >
              Edit
            </a>
            <Button className="btn-secondary">Delete</Button>
            <ModalEditPatient open={openModalEditPatient} onCLose={handleCloseModalEditPatient} id={id} data={data} />
          </td>
        </tr>
      );
    },
  };

  const data = [
    {
      id: 1,
      name: "Joe James",
      nik: 1231243432452345,
      norm: "RM000001",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 2,
      name: "John Walsh",
      nik: 1231243432452345,
      norm: "RM000001",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 3,
      name: "Bob Herm",
      nik: 1231243432452345,
      norm: "RM000001",
      gender: "male",
      dob: "27-08-1997",
    },
    {
      id: 4,
      name: "James Houston",
      nik: 1231243432452345,
      norm: "RM000001",
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
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddPatient
        open={openModalAddPatient}
        onClose={handleCloseModalAddPatient}
      />
    </div>
  );
}
