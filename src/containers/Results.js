import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import Table from "../components/dashboard/Table";
import api from "../api";

const Results = () => {
  const updateStore = UpdateStore();
  const { results } = Store();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Heading = [
    { id: "user", label: "User_id", minWidth: 170 },

    {
      id: "domain",
      label: "Domain ",
      minWidth: 170,
      align: "right",
    },
    {
      id: "example_of_job",
      label: "Example of Job",
      minWidth: 170,
      align: "right",
    },
    {
      id: "last_answer",
      label: "Last Answer",
      minWidth: 170,
      align: "right",
    },
  ];
  useEffect(() => {
    getAllResults();
  }, []);
  let getAllResults = async () => {
    let res = await api("get", `/admins/get-results?${1}&${12}`);
    if (res) {
      console.log("res i s ", res?.data?.results);
      updateStore({ results: res?.data?.results });
    }
  };
  return (
    <Table
      Heading={Heading}
      Users={results}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
    />
  );
};

export default Results;
