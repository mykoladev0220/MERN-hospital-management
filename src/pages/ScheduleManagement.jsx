import React from "react";
import MUIDataTable from "mui-datatables";

export default function ScheduleManagement() {
  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "day",
      label: "Day",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "start",
      label: "Start",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "end",
      label: "End",
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
                <a href={`#edit-schedule-modal-${tableMeta.rowData[0]}`}>
                  Edit
                </a>
                <a href={`#delete-schedule-modal-${tableMeta.rowData[0]}`}>
                  Delete
                </a>
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

  const data = [
    {
      id: 1,
      day: "Monday",
      start: "08:00",
      end: "16:00",
    },
    {
      id: 2,
      day: "Tuesday",
      start: "08:00",
      end: "16:00",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">
          Schedule Management
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Schedule List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
