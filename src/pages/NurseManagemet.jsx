import React from 'react'
import MUIDataTable from "mui-datatables";

export default function NurseManagemet() {
    const columns = [
        { name: "id", label: "ID", options: { sort: true } },
        {
          name: "name",
          label: "Name Doctor",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "username",
          label: "Username",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "password",
          label: "Password",
          options: {
            filter: false,
            sort: false,
            display: false,
          },
        },
        {
          name: "gender",
          label: "gender",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "address",
          label: "Address",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "phone",
          label: "Phone",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "dob",
          label: "Date of Birth",
          options: {
            filter: true,
            sort: false,
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
                    onClick={() => {
                        console.log(tableMeta.rowData[0]);
                    }}
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
              <a href={`#add-modal-doctor`} className="btn-main btn-green">
                Add Nurses
              </a>
            </>
          );
        },
      };

      const data = [
        {
            id: "1",
            name: "Nurse 1",
            username: "nurse1",
            password: "nurse1",
            gender: "male",
            address: "jakarta",
            phone: "08635335434",
            dob: "12-08-1978",
        },
        {
            id: "2",
            name: "Nurse 2",
            username: "nurse2",
            password: "nurse2",
            gender: "male",
            address: "jakarta",
            phone: "08635335434",
            dob: "12-08-1978",
        }
      ]
    return (
        <div className="min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-left">Nurse Management</h1>
        </div>
        <div>
          <MUIDataTable
            title={"Nurse List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    )
}
