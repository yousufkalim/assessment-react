import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Card from "../components/dashboard/Card";

const Result = () => {
  // init
  const updateStore = UpdateStore();
  const { history, user, disc_ans_id, result } = Store();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get Result from api
  let getResult = async () => {
    setLoading(true);
    let lastAnswerId = history?.find((his) => his.next_question === null);
    const userData = {
      disc_answers: disc_ans_id,
      user_id: user?._id,
      last_answer: lastAnswerId?._id,
    };
    let res = await api("post", "/results", userData);
    if (res) {
      updateStore({ result: res?.data?.result });
    }
    setLoading(false);
  };

  return (
    <>
      {" "}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Domain : {result?.domain}</h2>
        <h3>Job-Exapmle : {result?.example_of_job}</h3>
      </div>
      <div>
        {!loading ? (
          <div>
            {result?.courses && result?.courses.length >= 1 ? (
              <div
                className="cardflex"
                style={{ margin: "0px", textAlign: "center" }}
              >
                {" "}
                {result?.courses.map((course) => (
                  <Card course={course} />
                ))}
              </div>
            ) : (
              <div className="cardflex" style={{ margin: "0px" }}>
                {" "}
                <h1>No Course Available</h1>
              </div>
            )}
          </div>
        ) : (
          <div className="cardflex" style={{ margin: "0px" }}>
            {" "}
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
