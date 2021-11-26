import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api/index";
import SingleUserResult from "./SingleUserResult";

function CheckResult() {
  const history = useHistory();
  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let password = prompt("Enter you secrete password");
    if (password === "falcon@123") {
      let email = prompt("Enter candidate's email address");
      if (email) {
        await api("get", `/result/${email}`);
      } else {
        history.push("/");
      }
    } else {
      alert("Your password is incorrect");
    }
  };
  const { singleUserResult } = Store();

  return (
    <>
      <div style={{ height: "100vh" }}>
        <table
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            borderCollapse: "collapse",
            textAlign: "center",
            width: "50%",
            margin: "auto",
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th>Total Questions</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Percentage</th>
              <th>Rank 0-10</th>
            </tr>
          </thead>
          <tbody>
            {SingleUserResult.map((r) => (
              <tr key={r.id}>
                <th>{r.technolgy}</th>
                <td>{r.correct}</td>
                <td>{r.wrong}</td>
                <td>{r.percentage}</td>
                <td>{r.rank}</td>
              </tr>
            ))}
          </tbody>
          {/* <tr>
            <th>CSS</th>
            <td>40</td>
            <td>25</td>
            <td>15</td>
            <td>75%</td>
            <td>7.5</td>
          </tr>
          <tr>
            <th>JavaScript</th>
            <td>40</td>
            <td>25</td>
            <td>15</td>
            <td>75%</td>
            <td>7.5</td>
          </tr>
          <tr>
            <th>React</th>
            <td>40</td>
            <td>25</td>
            <td>15</td>
            <td>75%</td>
            <td>7.5</td>
          </tr>
          <tr>
            <th>Node</th>
            <td>40</td>
            <td>25</td>
            <td>15</td>
            <td>75%</td>
            <td>7.5</td>
          </tr>
          <tr>
            <th>Overall</th>
            <td>40</td>
            <td>25</td>
            <td>15</td>
            <td>75%</td>
            <td>7.5</td>
          </tr> */}
        </table>
      </div>
    </>
  );
}

export default CheckResult;
