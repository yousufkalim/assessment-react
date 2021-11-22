import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Table from "../components/dashboard/Table";
import axios from "axios";

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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // Get dashboard data from API
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  let getAllUsers = async () => {
    setLoading(true);
    let res = await api(
      "get",
      `admin/users/all-users?pageNumber=${page}&pageSize=${10}`
    );
    if (res) {
      updateStore({ Users: res?.data?.users });
      setCount(res?.data?.totalUsers);
      setLoading(false);
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
        count={count}
        loading={loading}
      />
    </>
  );
};

export default Users;
