import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalDeleteBooking from "../components/BookingManagement/ModalDeleteBooking";
import GetDataBooking from "../hooks/GetDataBooking";
import GetDataPatients from "../hooks/GetDataPatients";
import GetDataSessionSchedule from "../hooks/GetDataSessionSchedule";
import GetDataDoctors from "../hooks/GetDataDoctors";
import GetDataFacilities from "../hooks/GetDataFacilities";
import GetDataSchedules from "../hooks/GetDataSchedules";
import { Link } from "react-router-dom";
import ModalAddRecipe from "../components/PatientPrescriptionDoctor/ModalAddRecipe";

export default function SessionPrescription(props) {
  const { id } = props;
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleAddOpen = () => setOpenModalAdd(true);
  const handleAddClose = () => setOpenModalAdd(false);
  const [rowData, setRowData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { dataBooking, getDataBooking, properties } = GetDataBooking(refresh);
  const { dataPatients, getDataPatients } = GetDataPatients();
  const { dataSessionSchedules, getDataSessionSchedules } =
    GetDataSessionSchedule();

  const { dataDoctors } = GetDataDoctors();
  const { dataFacilities } = GetDataFacilities();
  const { dataSchedules } = GetDataSchedules();

  const transformPatient = (data) => {
    let result = "";
    dataPatients.data?.map((item) => {
      if (item.id === data) {
        result = item.fullname;
      }
    });
    return result;
  };

  const transformFacility = (data) => {
    let result = "";
    dataFacilities.data?.map((item) => {
      if (data === item.id) {
        result = item.name;
      }
    });
    return result;
  };

  const transformDoctor = (data) => {
    let result = "";
    dataDoctors.data?.map((item) => {
      if (data === item.id) {
        result = item.fullname;
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
    let result = " ";
    dataSchedules.data?.map((item) => {
      if (data === item.id) {
        result =
          item.day +
          " : " +
          timeFormat(item.start) +
          " - " +
          timeFormat(item.end);
      }
    });
    return result;
  };

  const transformSessionSchedule = (data) => {
    let result = [];
    dataSessionSchedules.data?.map((item) => {
      if (item.id === data) {
        result.push(
          transformFacility(item.id_facilty),
          transformDoctor(item.id_doctor),
          transformSchedule(item.id_schedule)
        );
      }
    });
    return result;
  };

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
  newData = dataBooking.data?.map((item) => {
    return {
      id: item.id,
      id_patient: item.id_patient,
      name_patient: transformPatient(item.id_patient),
      id_session_schedule: transformSessionSchedule(item.id_session_schedule),
      date: dateFormat(item.date),
      status: item.status,
    };
  });

  let newData2 = [];
  newData2 = newData?.map((item) => {
    return {
      id: item.id,
      patient: item.name_patient,
      patient_id: item.id_patient,
      facility: item.id_session_schedule[0],
      doctor: item.id_session_schedule[1],
      schedule: item.id_session_schedule[2],
      date: item.date,
      status: item.status,
    };
  });

  const columns = [
    { name: "id", label: "ID", options: { sort: true } },
    {
      name: "patient_id",
      label: "ID Patient",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "patient",
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
      name: "schedule",
      label: "Schedule",
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
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {value === "Not Checked" ? (
                <div className="border-solid border-2 text-center border-yellow-400 text-yellow-500 rounded-md">
                  <span>{value}</span>
                </div>
              ) : value === "Checked" ? (
                <div className="border-solid border-2 text-center border-green-400 text-green-500 rounded-md">
                  <span>{value}</span>
                </div>
              ) : null}
            </div>
          );
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
          console.log(tableMeta.rowData);

          return (
            <>
              <div className="flex gap-1">
                {id === "doctor" ? (
                  <>
                    <button
                      className="btn-main btn-primary"
                      onClick={() => {
                        handleAddOpen();
                        setRowData(tableMeta.rowData);
                      }}
                    >
                      Add Recipe
                    </button>
                    <Link
                      to={`/prescription-session/doctor/${tableMeta.rowData[0]}/detail`}
                      className="btn-main btn-green"
                    >
                      View Recipe
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/prescription-session/nurse/${tableMeta.rowData[0]}/detail`}
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
    sortOrder:{
      name: "id",
      direction: "desc"
    }
  };
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">
          Session Prescription
        </h1>
      </div>
      <div>
        <MUIDataTable
          title={"Session List"}
          data={newData2}
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
