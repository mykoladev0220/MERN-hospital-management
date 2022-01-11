import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import ModalAddFacility from "../components/FacilityManagement/ModalAddFacility";
import ModalEditFacility from "../components/FacilityManagement/ModalEditFacility";
import ModalDeleteFacility from "../components/FacilityManagement/ModalDeleteFacility";
import GetDataFacilities from "../hooks/GetDataFacilities";

export default function FaciltyManagement() {
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
  const { dataFacilities } = GetDataFacilities(refresh);

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
      name: "queue",
      label: "Queue",
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
            Add Facility
          </button>
        </>
      );
    },
  };

  let newData = [];
  newData = dataFacilities.data?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      capacity: item.capacity,
      location: item.location,
      queue: item.queue,
    };
  });

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-left">Facilty Management</h1>
      </div>
      <div>
        <MUIDataTable
          title={"Facilty List"}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>
      <ModalAddFacility
        open={openModalAdd}
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleAddClose}
      />
      <ModalEditFacility
        open={openModalEdit}
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleEditClose}
        rowData={rowData}
      />
      <ModalDeleteFacility
        open={openModalDelete}
        refresh={refresh}
        setRefresh={setRefresh}
        onClose={handleDeleteClose}
        rowData={rowData}
      />
    </div>
  );
}
