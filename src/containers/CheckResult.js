import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api/index";

function CheckResult() {
  let [auth, setAuth] = useState(false);
  let [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let password = prompt("Enter you secrete password");
    if (password === "falcon@123") {
      let email = prompt("Enter candidate's email address");
      if (email) {
        setAuth(true);
        let data = await api("get", `/results/${email}`);
        setUser(data.user);
      } else {
        history.push("/");
      }
    } else {
      alert("Your password is incorrect");
    }
  };

  return (
    <>
      {auth && (
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
                <th>Technology</th>
                <th>Total Questions</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Percentage</th>
                <th>Rank 0-10</th>
              </tr>
            </thead>
            <tbody>
              {user?.result?.result_by_tech.map((tech) => (
                <tr key={tech.id}>
                  <th>{tech.technology}</th>
                  <th>{tech.total}</th>
                  <td>{tech.correct}</td>
                  <td>{tech.wrong}</td>
                  <td>{tech.percentage}</td>
                  <td>{tech.rank}</td>
                </tr>
              ))}
              <tr>
                <th>Overall</th>
                <th>{user?.result?.total}</th>
                <td>{user?.result?.total_correct}</td>
                <td>{user?.result?.total_wrong}</td>
                <td>{user?.result?.overall_percentage}</td>
                <td>{user?.result?.overall_rank}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default CheckResult;
