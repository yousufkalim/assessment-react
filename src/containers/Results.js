import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";

const Results = () => {
  const updateStore = UpdateStore();
  useEffect(() => {
    getAllResults();
  }, []);
  let getAllResults = async () => {
    let res = await api("get", `/admins/get-results?${1}&${12}`);
    if (res) {
      console.log("res is ", res?.data);
    }
  };
  return (
    <div class="content">
      <h1>results</h1>
    </div>
  );
};

export default Results;
