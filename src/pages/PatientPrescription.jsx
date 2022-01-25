import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import GetDataPatients from "../hooks/GetDataPatients";
import { Link } from "react-router-dom";
import ModalAddRecipe from "../components/PatientPrescriptionDoctor/ModalAddRecipe";

export default function PatientPrescription(props) {
  const { id } = props;
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleAddOpen = () => setOpenModalAdd(true);
  const handleAddClose = () => setOpenModalAdd(false);
  const [rowData, setRowData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { dataPatients } = GetDataPatients(refresh);

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
      name: "age",
      label: "Age",
      options: {
        filter: true,
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
                {id === "doctor" ? (
                  <>
                    <Link
                      to={`/patient-prescription/doctor/${tableMeta.rowData[0]}/detail`}
                      className="btn-main btn-green"
                    >
                      View Recipe
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/patient-prescription/nurse/${tableMeta.rowData[0]}/detail`}
                    className="btn-main btn-green"
                  >
                    View Recipe
                  </Link>
                )}
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
      id: data.id,
      name: data.fullname,
      nik: data.nik,
      norm: data.no_rm,
      age: data.age,
      address: data.address,
      gender: data.gender,
      dob: dateFormat(data.dob),
    };
  });

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-left text-2xl font-semibold">
          Patient Prescription
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Patient List"}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddRecipe
        open={openModalAdd}
        onClose={handleAddClose}
        rowData={rowData}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
}
