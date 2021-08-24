import React, { useState, useEffect } from "react";
import Card from "../components/dashboard/Card";
import SingleUserTable from "../components/dashboard/SingleUserTable";
import api from "../api";
import { useParams } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";

// Single User Results Table headings
const Heading = [
  { id: "user", label: "Email", minWidth: 170 },

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
  // {
  //   id: "last_answer",
  //   label: "Last Answer",
  //   minWidth: 170,
  //   align: "right",
  // },
];

const SingleUserResult = ({}) => {
  const updateStore = UpdateStore();
  const { singleUserResults } = Store();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  // Get All Results of a User
  useEffect(() => {
    getUserResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getUserResults = async () => {
    setLoading(true);
    let res = await api("get", `/admin/results/user-results/${id}`);
    if (res) {
      updateStore({ singleUserResults: res?.data?.result });
      setLoading(false);
    }
  };
  return (
    <>
      <div
        style={{
          marginTop: "80px",
          marginLeft: "275px",
          width: "80%",
          textAlign: "center",
        }}
      >
        {!loading ? (
          singleUserResults?.length >= 1 ? (
            <SingleUserTable
              Heading={Heading}
              singleUserResults={singleUserResults}
            />
          ) : (
            <div style={{ padding: "5px" }}>
              {" "}
              <h1>No User Result Available</h1>
            </div>
          )
        ) : (
          <div style={{ padding: "5px" }}>
            {" "}
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleUserResult;
