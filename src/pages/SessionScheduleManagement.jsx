import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSessionSchedule from "../components/SessionScheduleManagement/ModalAddSessionSchedule";
import ModalEditSessionSchedule from "../components/SessionScheduleManagement/ModalEditSessionSchedule";
import ModalDeleteSessionSchedule from "../components/SessionScheduleManagement/ModalDeleteSessionSchedule";
import GetDataDoctors from "../hooks/GetDataDoctors";
import GetDataFacilities from "../hooks/GetDataFacilities";
import GetDataSchedules from "../hooks/GetDataSchedules";
import GetDataSessionSchedule from "../hooks/GetDataSessionSchedule";
import CircularProgress from "@mui/material/CircularProgress";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export default function SessionScheduleManagement() {
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
  const [refresh, setRefresh] = useState(true);
  const { dataSessionSchedules, properties } = GetDataSessionSchedule(refresh);
  const { dataDoctors } = GetDataDoctors();
  const { dataFacilities } = GetDataFacilities();
  const { dataSchedules } = GetDataSchedules();

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "id_facilty",
      label: "Facility",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_doctor",
      label: "Doctor",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_schedule",
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
                <button
                  className="btn-main btn-primary"
                  onClick={() => {
                    handleEditOpen();
                    setRowData(tableMeta.rowData);
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
                    setRowData(tableMeta.rowData);
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

  const transformFacility = (data) => {
    let result = [];
    dataFacilities.data?.forEach((item) => {
      if (data === item.id) {
        result.push(item.name);
      }
    });
    return result;
  };

  const transformDoctor = (data) => {
    let result = [];
    dataDoctors.data?.forEach((item) => {
      if (data === item.id) {
        result.push(item.fullname);
      }
    });
    return result;
  };

  const timeFormat = (time) => {
    var d = new Date(time),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  };

  const transformSchedule = (data) => {
    let result = [];
    dataSchedules.data?.forEach((item) => {
      if (data === item.id) {
        result.push(item.day, timeFormat(item.start), timeFormat(item.end));
      }
    });
    return result;
  };

  let newData = [];
  newData = dataSessionSchedules.data?.map((data) => {
    return {
      id: data.id,
      id_facilty: transformFacility(data.id_facilty),
      id_doctor: transformDoctor(data.id_doctor),
      id_schedule: transformSchedule(data.id_schedule).join(" - "),
    };
  });

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
              Add Session Schedule
            </div>
          </button>
        </>
      );
    },
  };

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
          data={newData}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddSessionSchedule
        setRefresh={setRefresh}
        refresh={refresh}
        open={openModalAdd}
        onClose={handleAddClose}
        rowDoctors={dataDoctors}
        rowFacilities={dataFacilities}
        rowSchedules={dataSchedules}
      />
      <ModalEditSessionSchedule
        setRefresh={setRefresh}
        refresh={refresh}
        open={openModalEdit}
        onClose={handleEditClose}
        rowData={rowData}
        rowDoctors={dataDoctors}
        rowFacilities={dataFacilities}
        rowSchedules={dataSchedules}
      />
      <ModalDeleteSessionSchedule
        setRefresh={setRefresh}
        refresh={refresh}
        open={openModalDelete}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
