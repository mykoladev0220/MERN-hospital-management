import React from "react";
import MUIDataTable from "mui-datatables";

export default function FaciltyManagement() {
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
          <>
            <div className="flex gap-1">
              <a
                href={`#edit-modal-facilty-${tableMeta.rowData[0]}`}
                className="btn-main btn-primary"
              >
                Edit
              </a>
              <a
                href={`#delete-modal-facilty-${tableMeta.rowData[0]}`}
                className="btn-main btn-secondary"
              >
                Delete
              </a>
            </div>
          </>;
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
          <a href={`#add-modal-facilty`} className="btn-main btn-green">
            Add Facilty
          </a>
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
    </div>
  );
}
