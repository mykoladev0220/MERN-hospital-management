import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSchedule from "../components/ScheduleManagement/ModalAddSchedule";
import ModalEditSchedule from "../components/ScheduleManagement/ModalEditSchedule";
import ModalDeleteSchedule from "../components/ScheduleManagement/ModalDeleteSchedule";
import GetDataSchedules from "../hooks/GetDataSchedules";
import CircularProgress from "@mui/material/CircularProgress";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export default function ScheduleManagement() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleEditOpen = () => setOpenModalEdit(true);
  const handleEditClose = () => setOpenModalEdit(false);
  const handleAddOpen = () => setOpenModalAdd(true);
  const handleAddClose = () => setOpenModalAdd(false);
  const handleDeleteOpen = () => setOpenModalDelete(true);
  const handleDeleteClose = () => setOpenModalDelete(false);
  const [rowData, setrowData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { dataSchedules, properties } = GetDataSchedules(refresh);

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
        customBodyRender: (value, tableMeta, updateValue) => {
          return timeFormat(value);
        },
      },
    },
    {
      name: "end",
      label: "End",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return timeFormat(value);
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
                    setrowData(tableMeta.rowData);
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
                    setrowData(tableMeta.rowData);
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
              Add Schedule
            </div>
          </button>
        </>
      );
    },
  };

  const timeFormat = (time) => {
    var d = new Date(time),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  };

  let newData = [];
  newData = dataSchedules.data?.map((data) => {
    return {
      id: data.id,
      day: data.day,
      start: data.start,
      end: data.end,
    };
  });

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
          data={newData}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddSchedule
        refresh={refresh}
        setRefresh={setRefresh}
        open={openModalAdd}
        onClose={handleAddClose}
      />
      <ModalEditSchedule
        refresh={refresh}
        setRefresh={setRefresh}
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeleteSchedule
        refresh={refresh}
        setRefresh={setRefresh}
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
