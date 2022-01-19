import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddSessionSchedule from "../components/SessionScheduleManagement/ModalAddSessionSchedule";
import ModalEditSessionSchedule from "../components/SessionScheduleManagement/ModalEditSessionSchedule";
import ModalDeleteSessionSchedule from "../components/SessionScheduleManagement/ModalDeleteSessionSchedule";
import GetDataDoctors from "../hooks/GetDataDoctors";
import GetDataFacilities from "../hooks/GetDataFacilities";
import GetDataSchedules from "../hooks/GetDataSchedules";
import GetDataSessionSchedule from "../hooks/GetDataSessionSchedule";

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

  const { dataDoctors, getDataDoctors } = GetDataDoctors();
  const { dataFacilities, getDataFacilities } = GetDataFacilities();
  const { dataSchedules, getDataSchedules } = GetDataSchedules();

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

  const transformFacility = (data) => {
    let result = [];
    dataFacilities.data?.map((item) => {
      if (data === item.id) {
        result.push(item.name);
      }
    });
    return result;
  };

  const transformDoctor = (data) => {
    let result = [];
    dataDoctors.data?.map((item) => {
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
    dataSchedules.data?.map((item) => {
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

  console.log(newData, "newData");

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
            Add Session Schedule
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
