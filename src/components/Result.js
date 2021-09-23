import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Grid from "@material-ui/core/Grid";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import TypeOfCourse from "./TypeOfCourse";
import userimg from "../assets/icons/user.png";
import share from "../assets/icons/share.png";
import Card from "../components/dashboard/Card";

const Result = () => {
  let typeOfCourses = ["BTS", "BUT", "CPGE", "Ecole Post-Bac", "Licence"];
  // init
  const updateStore = UpdateStore();
  const { history, user, disc_ans_id, result } = Store();
  const [loading, setLoading] = useState(false);
  const [resultStep, setresultStep] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
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
  // get courses arrays base on there types
  const getSingleTypeofCourse = (type) =>
    result.courses.filter(
      (course) => type === course?.courseId?.type_of_course
    );
  console.log("result ", result);
  return (
    <>
      {resultStep == 0 && (
        <Grid container spacing={2} className="mainresultscreen">
          <Grid item xs={12} sm={4} className="">
            <img src={Dummy} className="dummyimg forweb" />
            <img src={MainMobile} className="dummyimg formobile" />
          </Grid>
          <Grid item xs={12} sm={8} className="">
            <div className="resultBox">
              <div className="resultBoxText">
                <h1 className="" style={{ textAlign: "center" }}>

                  Bravo ! Tu as répondu à toutes les questions !{" "}
                </h1>
                {loading ? <p className="resultText">Loading...</p> : <p className="resultText">
                  D'après tes réponses, je pense que ton profil est tourné vers<br />
                  <b> {loading ? "loading" : result?.type_of_job ? result.type_of_job : "Currently no job available"} </b> comme par exemple <b>  {loading ? "loading" : result?.example_of_job ? result.example_of_job : "Currently no example available"}</b>
                </p>}
                <p className="resultText">Je te propose une liste de voeux Parcoursup qui correspondrait à ton profil.</p>
              </div>
              <div className="resultButtondiv">
                <button className="resultButton" onClick={() => setresultStep(1)}>
                  Ma liste Parcoursup
                </button>
              </div>
            </div>
            <div></div>
          </Grid>
        </Grid>
      )}
      {resultStep == 1 && (
        <Grid container spacing={1} className="mainresultscreen">
          <Grid item xs={12} sm={12} className="">

            <div>
              {!loading ? (
                <div>
                  {result?.courses && result?.courses.length >= 1 ? (
                    <div

                    >
                      {typeOfCourses.map((type) => (
                        <>
                          {getSingleTypeofCourse(type)[0]?.courseId?.type_of_course ==
                            type && (

                              <TypeOfCourse type={type} percentage={getSingleTypeofCourse(type)[0]?.percentage} courses={getSingleTypeofCourse(type)} />

                            )}
                        </>
                      ))}
                      <div className="buttonDiv">
                        <button className="sharebutton"><img src={userimg} /><b style={{ margin: "12px" }}>Invite un</b></button>
                        <button className="sharebutton"><img src={share} /><b style={{ margin: "12px" }}> Partager</b></button>
                      </div>
                    </div>
                  ) : (
                    <div className="cardflex" style={{ margin: "0px" }}>
                      <h1>No Course Available</h1>
                    </div>
                  )}
                </div>
              ) : (
                <div className="cardflex" style={{ margin: "0px" }}>
                  <h1>Load!ng...</h1>
                </div>
              )}
            </div>



          </Grid>
        </Grid>
      )
      }
      {/* <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Domain : {result?.domain}</h2>
        <h3>Job-Exapmle : {result?.example_of_job}</h3>
      </div> */}
      {/* <div>
        {!loading ? (
          <div>
            {result?.courses && result?.courses.length >= 1 ? (
              <div
                className="cardflex"
                style={{ margin: "0px", textAlign: "center" }}
              >
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
              </div>
            ) : (
              <div className="cardflex" style={{ margin: "0px" }}>
                <h1>No Course Available</h1>
              </div>
            )}
          </div>
        ) : (
          <div className="cardflex" style={{ margin: "0px" }}>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    */}
    </>
  );
};

export default Result;
