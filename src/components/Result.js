import React, { useState, useEffect } from "react";
import { Store } from "../StoreContext";
import scrollToTop from "../utils/ScrollTop";
import api from "../api";
import Grid from "@material-ui/core/Grid";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import CircularProgress from "@material-ui/core/CircularProgress";

const Result = () => {
  // init
  const { answerIds, user } = Store();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getResult();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get Result from api
  let getResult = async () => {
    setLoading(true);

    await api("post", "/results", {
      userId: user._id,
      answerIds,
    });

    setLoading(false);
  };

  return (
    <>
      <Grid container spacing={2} className="mainresultscreen">
        <Grid item xs={12} sm={4} className="">
          <img src={Dummy} className="dummyimgResult forweb" />
          <img src={MainMobile} className="dummyimgforResult formobile" />
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <div className="resultBox">
            <div className="resultBoxText">
              {loading ? (
                <p className="resultText">
                  <CircularProgress color="inherit" />
                </p>
              ) : (
                <h1 className="resultHeading" style={{ textAlign: "center" }}>
                  Well done! You have completed your Assessment!
                </h1>
              )}
            </div>
          </div>
          <div></div>
        </Grid>
      </Grid>
    </>
  );
};

export default Result;
