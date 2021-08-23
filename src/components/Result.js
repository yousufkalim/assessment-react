import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";

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
    <div>
      {loading ? (
        <h2> Result Loading...</h2>
      ) : (
        <div>
          <h1>Result</h1>
          <hr />
          <p>
            <p>
              example of job:{" "}
              {result?.example_of_job ? result?.example_of_job : "N/A"}
            </p>
            <p>Domain: {result?.domain ? result?.domain : "N/A"}</p>
            <hr />
            {result?.courses && result?.courses.length >= 1 ? (
              result?.courses?.map((course) => (
                <div>
                  <p>
                    Type of Course :{" "}
                    {course?.courseId?.type_of_course
                      ? course?.courseId?.type_of_course +
                        " " +
                        course?.percentage +
                        "%"
                      : "N/a"}
                  </p>
                  <p>
                    Sub Domain :{" "}
                    {course?.courseId?.sub_domains
                      ? course?.courseId?.sub_domains[0]
                      : "N/a"}{" "}
                  </p>
                  <p>
                    Course Name :{" "}
                    {course?.courseId?.course_name
                      ? course?.courseId?.course_name
                      : "N/a"}{" "}
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <h1>No Course Available</h1>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
