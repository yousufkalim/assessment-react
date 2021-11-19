import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Grid from "@material-ui/core/Grid";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import TypeOfCourse from "./TypeOfCourse";
import userimg from "../assets/icons/user.png";
import share from "../assets/icons/share.png";
import Dialog from "./Dialog";

const Result = () => {
  let typeOfCourses = ["BTS", "BUT", "CPGE", "Ecole Post-Bac", "Licence"];
  // init
  const updateStore = UpdateStore();
  const { history, user, disc_ans_id, result } = Store();
  const [loading, setLoading] = useState(false);
  const [resultStep, setresultStep] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("result page render")
    // if (resultStep == 1) {
    //   setTimeout(() => {
    //     setOpen(true);
    //   }, 30000);
    // }
    // getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultStep]);
  // get Result from api
  let getResult = async () => {
    setLoading(true);
    // let lastAnswerId = history?.find((his) => his.next_question === null);
    let lastAnswerId = history?.find(
      (his) => his.next_question == "61111167760c9840b8d2c9d2"
    );
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
  // get courses arrays base on there types
  const getSingleTypeofCourse = (type) =>
    result.courses.filter(
      (course) => type === course?.courseId?.type_of_course
    );

  return (
    <>
      {resultStep == 0 && (
        <Grid container spacing={2} className="mainresultscreen">
          <Grid item xs={12} sm={4} className="">
            <img src={Dummy} className="dummyimgResult forweb" />
            <img src={MainMobile} className="dummyimgforResult formobile" />
          </Grid>
          <Grid item xs={12} sm={8} className="">
            <div className="resultBox">
              <div className="resultBoxText">
                <h1 className="resultHeading" style={{ textAlign: "center" }}>
                  Well done ! You have completed your Assessment!
                </h1>
                {loading ? (
                  <p className="resultText">
                    <CircularProgress color="inherit" />
                  </p>
                ) : (
                  <p className="resultText">
                    <span style={{ color: "#9198A5" }}>
                      {" "}
                     From your answers I think your profile is turned
                      toward
                    </span>
                    <br />
                    <b>
                      {" "}
                      <span style={{ color: "#BCC3CF", fontWeight: "900" }}>
                        {loading ? (
                          <div>
                            <CircularProgress color="inherit" />
                          </div>
                        ) : result?.type_of_job ? (
                          result.type_of_job
                        ) : (
                          "Currently no job available"
                        )}{" "}
                      </span>
                    </b>{" "}
                    <span style={{ color: "#9198A5" }}>comme par exemple</span>{" "}
                    <span style={{ color: "#BCC3CF", fontWeight: "900" }}>
                      {" "}
                      {loading
                        ? "loading"
                        : result?.example_of_job
                        ? result.example_of_job
                        : "Currently no example available"}
                    </span>
                  </p>
                )}
              </div>
              {/* <div className="resultButtondiv">
                <button
                  className="resultButton"
                  onClick={() => setresultStep(1)}
                >
                  <b> My Answers list</b>
                </button>
              </div> */}
            </div>
            <div></div>
          </Grid>
        </Grid>
      )}
      {resultStep == 1 && (
        <>
          <Dialog open={open} setOpen={setOpen} />
          <Grid container spacing={1} className="mainresultscreen">
            <Grid item xs={12} sm={12} className="">
              <div>
                {!loading ? (
                  <div>
                    {result?.courses && result?.courses.length >= 1 ? (
                      <div>
                        {typeOfCourses.map((type) => (
                          <>
                            {getSingleTypeofCourse(type)[0]?.courseId
                              ?.type_of_course == type && (
                              <TypeOfCourse
                                type={type}
                                percentage={
                                  getSingleTypeofCourse(type)[0]?.percentage
                                }
                                courses={getSingleTypeofCourse(type)}
                              />
                            )}
                          </>
                        ))}
                        <div className="buttonDiv">
                          <button className="sharebutton">
                            <img src={userimg} />
                            <b style={{ margin: "12px" }}>Invite a friend</b>
                          </button>
                          <button className="sharebutton">
                            <img src={share} />
                            <b style={{ margin: "12px" }}>To share </b>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className=""
                        style={{ margin: "10px", textAlign: "center" }}
                      >
                        <h1> Sorry no classes available</h1>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className=""
                    style={{ margin: "10%", textAlign: "center" }}
                  >
                    <h1>Loading...</h1>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Result;
