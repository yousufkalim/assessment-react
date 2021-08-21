import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Table from "../components/dashboard/Table";
import Dialog from "../components/dashboard/Dialog";

const Heading = [
  { id: "email", label: "Email", minWidth: 170 },

  {
    id: "first_name",
    label: "First Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "last_name",
    label: "Last Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
  },
];

const Users = () => {
  const updateStore = UpdateStore();
  const { Users } = Store();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  // Get dashboard data from API
  useEffect(() => {
    getAllUsers();
  }, [page]);
  let getAllUsers = async () => {
    let res = await api("get", `/users/all-users?${page + 1}&${rowsPerPage}`);
    if (res) {
      console.log("user response", res?.data?.users);
      updateStore({ Users: res?.data?.users });
    }
  };

  return (
    <>
      <Table
        Heading={Heading}
        Users={Users}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default Users;
