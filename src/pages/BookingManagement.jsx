import React from "react";
import MUIDataTable from "mui-datatables";
import ModalDeleteBooking from "../components/BookingManagement/ModalDeleteBooking";

export default function BookingManagement() {
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
      name: "facility",
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
      name: "queue",
      label: "Queue",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: false,
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
                  href={`#delete-booking-modal-${tableMeta.rowData[0]}`}
                  className="btn-main btn-secondary"
                >
                  Delete
                </a>
              </div>
              <ModalDeleteBooking
                id={tableMeta.rowData[0]}
                data={tableMeta.rowData}
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
  };

  const data = [
    {
      id: "1",
      name: "John Doe",
      facility: "Klinik Utama",
      doctor: "Dr. A",
      queue: "1",
      date: "2020-01-01",
    },
    {
      id: "2",
      name: "John Doe",
      facility: "Klinik Utama",
      doctor: "Dr. A",
      queue: "2",
      date: "2020-01-01",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Booking Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Booking List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
