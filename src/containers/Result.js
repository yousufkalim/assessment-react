import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import Card from "../components/dashboard/Card";
import api from "../api";

const Result = () => {
  let typeOfCourses = ["BTS", "BUT", "CPGE", "Ecole Post-Bac", "Licence"];
  const updateStore = UpdateStore();
  const { singleUserResult } = Store();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  //   Single Result of User
  useEffect(() => {
    getUserResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let getUserResult = async () => {
    setLoading(true);
    let res = await api("get", `/admin/results/single-result/${id}`);
    if (res) {
      updateStore({ singleUserResult: res?.data?.result });
      setLoading(false);
    }
  };

  // get courses arrays base on there types
  const getSingleTypeofCourse = (type) => {
    return singleUserResult?.courses.filter(
      (course) => type === course?.courseId?.type_of_course
    );
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
        <h2>Domain:{singleUserResult?.domain}</h2>
        <h3>Job-Exapmle:{singleUserResult?.example_of_job}</h3>
      </div>
      <div>
        {!loading ? (
          <div style={{ padding: "5px" }}>
            {singleUserResult?.courses &&
              singleUserResult?.courses.length >= 1 ? (
              <div className="cardflex">
                {typeOfCourses.map((type) => (
                  <>
                    {getSingleTypeofCourse(type)[0]?.courseId?.type_of_course ==
                      type && (
                        <div>
                          <h3>Type of Course : {type}</h3>
                          <Card courses={getSingleTypeofCourse(type)} />
                        </div>
                      )}
                  </>
                ))}
                {/* {singleUserResult?.courses.map((course) => (
                  <Card course={course} /> 
                ))} */}
              </div>
            ) : (
              <div className="cardflex">
                {" "}
                <h1>No Course Available</h1>
              </div>
            )}
          </div>
        ) : (
          <div className="cardflex">
            {" "}
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
