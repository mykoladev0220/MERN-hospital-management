import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import GetDataPrescription from "../hooks/GetDataPrescription";
import ModalEditPrescription from "../components/PatientPrescriptionDetail/ModalEditPrescription";
import ModalDeletePrescription from "../components/PatientPrescriptionDetail/ModalDeletePrescription";
import Skeleton from "@mui/material/Skeleton";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export default function PatientPrescriptionDetail(props) {
  const { id } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const { dataPrescription, properties } = GetDataPrescription(refresh);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleEditOpen = () => setOpenModalEdit(true);
  const handleEditClose = () => setOpenModalEdit(false);
  const handleDeleteOpen = () => setOpenModalDelete(true);
  const handleDeleteClose = () => setOpenModalDelete(false);
  const [rowData, setRowData] = useState({});

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
  newData = dataPrescription.data?.map((item) => {
    return {
      id: item.id,
      name: item.medicine_name,
      rules: item.medication_rules,
      id_patient: item.id_patient,
      id_doctor: item.id_doctor,
      id_sessionbooking: item.id_sessionbooking,
      date: dateFormat(item.created_at),
    };
  });

  if (newData) {
    newData = newData.filter((item) => item.id_patient === parseInt(params.id));
  }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-left text-2xl font-semibold">
          Patient Prescription Detail
        </h1>
        <div className="my-4">
          <button
            className="text-left font-medium flex items-center"
            onClick={() => navigate(-1)}
          >
            <span>
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div>
        {properties.loading ? (
          <Skeleton
            animation="wave"
            className="rounded-md"
            variant="rectangular"
            width="100%"
            height={100}
          />
        ) : null}
        {newData?.map((data) => (
          <div className=" bg-white p-4 rounded-md shadow-lg my-4">
            <div className="flex justify-between">
              <div>
                <table className="table-auto">
                  <tr>
                    <td className="py-1">Medicine Name</td>
                    <td> : </td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Medicine Rules</td>
                    <td> : </td>
                    <td>{data.rules}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Date</td>
                    <td> : </td>
                    <td> {data.date}</td>
                  </tr>
                </table>
              </div>
              <div className="flex flex-col gap-1 md:flex-row items-center">
                {id === "doctor" ? (
                  <>
                    <button
                      className="btn-main btn-primary"
                      onClick={() => {
                        handleEditOpen();
                        setRowData(data);
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
                        setRowData(data);
                      }}
                    >
                      <div className="flex items-center">
                        <TrashIcon className="mr-1 w-4 h-4" />
                        Delete
                      </div>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalEditPrescription
        open={openModalEdit}
        onClose={handleEditClose}
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
      />
      <ModalDeletePrescription
        open={openModalDelete}
        onClose={handleDeleteClose}
        refresh={refresh}
        setRefresh={setRefresh}
        rowData={rowData}
      />
    </div>
  );
}
