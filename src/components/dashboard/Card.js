//init
import React from "react";
import "../../css/card.css";
import Grid from "@material-ui/core/Grid";
import selectivity from "../../assets/icons/selectivity.png";
import cost from "../../assets/icons/cost.png";
import language from "../../assets/icons/language.png";
import duration from "../../assets/icons/duration.png";
import proximate from "../../assets/icons/proximate.png";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';


//Component
function Cards({ courses }) {

  return (
    <>

      {courses?.length >= 1 ? (
        courses?.map((course) => (
          <Grid container spacing={2} className="courseDetail">
            <Grid item xs={12} sm={5}><p>{course?.courseId?.sub_domains} </p><h2> {course?.courseId?.course_name}</h2></Grid>
            <Grid item xs={12} sm={7} className="ratingGrid">

              <div><p><img src={selectivity} /></p><p>Séléctivité</p><div><b style={{ fontSize: "15px" }}>4/5</b></div></div>
              <div style={{ marginTop: "4px" }}><p><img src={cost} /></p><p>Coût</p><div>

                {course?.courseId?.cost ? (<>
                  {[1, 2, 3, 4, 5].map((item) => {
                    if (course?.courseId?.cost[0] >= item) {
                      return <StarIcon style={{ width: "12px", height: "20px" }} />;
                    } else
                      return (
                        <StarBorderIcon style={{ width: "12px", height: "20px" }} />
                      );
                  })}</>) : "No"}
              </div></div>
              <div style={{ marginTop: "9px" }}><p><img src={language} /></p><p>Langue</p><div>rating</div></div>
              <div><p><img src={duration} /></p><p>Durée</p><div>rating</div></div>
              <div><p><img src={proximate} /></p><p>Proximité</p><div>rating</div></div>




            </Grid>

            {/* <p>
                <b>Sub-Domain : </b> {course?.courseId?.sub_domains}
              </p>
              <p>
                <b>Name of Course : </b> {course?.courseId?.course_name}
              </p>
              <p>
                <b>Selectivity Rating : </b>{" "}
                {course?.selectivityrating
                  ? course.selectivityrating + " " + "Star"
                  : "N/A"}
              </p>
              <p>
                <b>Language Rating : </b>{" "}
                {course?.courseId?.languagestar
                  ? course?.courseId?.languagestar
                  : "No"}
              </p>
              <p>
                <b>Cost Rating : </b>{" "}
                {course?.courseId?.cost ? course?.courseId?.cost : "No"}
              </p> */}
          </Grid>
        ))
      ) : (
        <>
          <h4>No Course Available for</h4>
          <h4>this type of Course</h4>
        </>
      )}

    </>
  );
}

export default Cards;
