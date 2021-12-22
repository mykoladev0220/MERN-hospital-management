import React from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSessionSchedule from "../components/SessionScheduleManagement/ModalAddSessionSchedule";
import ModalEditSessionSchedule from "../components/SessionScheduleManagement/ModalEditSessionSchedule";
import ModalDeleteSessionSchedule from "../components/SessionScheduleManagement/ModalDeleteSessionSchedule";

export default function SessionScheduleManagement() {
  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "facilty",
      label: "Facility",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "doctor",
      label: "Doctor",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "schedule",
      label: "Schedule",
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
                <a
                  href={`#edit-modal-${tableMeta.rowData[0]}`}
                  className="btn-main btn-primary"
                >
                  Edit
                </a>
                <a
                  href={`#delete-modal-${tableMeta.rowData[0]}`}
                  className="btn-main btn-secondary"
                >
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
    actionsColumnIndex: -1,
    customToolbar: () => {
      return (
        <>
          <a
            href={`#add-session-schedule-modal`}
            className="btn-main btn-green"
          >
            Add Session Schedule
          </a>
        </>
      );
    },
  };

  const data = [
    {
      id: 1,
      facilty: "Klinik Utama",
      doctor: "Dr. A",
      schedule: "08.00 - 09.00",
    },
    {
      id: 2,
      facilty: "Klinik Utama",
      doctor: "Dr. B",
      schedule: "09.00 - 10.00",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">
          Session Schedule Management
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Session Schedule List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
