//init
import React, { useState } from "react";
import "../css/card.css";
import Grid from "@material-ui/core/Grid";
import selectivity from "../assets/icons/selectivity.png";
import cost from "../assets/icons/cost.png";
import language from "../assets/icons/language.png";
import duration from "../assets/icons/duration.png";
import proximate from "../assets/icons/proximate.png";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Dialog from "./Dialog"


//Component
function DetailofCourses({ courses, open, setOpen }) {

    return (
        <>

            <Dialog open={open} setOpen={setOpen} />
            {courses?.length >= 1 ? (
                courses?.map((course) => (
                    <Grid container spacing={2} className="courseDetail">
                        <Grid item xs={12} sm={5}><p>{course?.courseId?.sub_domains} </p><h2> {course?.courseId?.course_name}</h2></Grid>
                        <Grid item xs={12} sm={7} className="ratingGrid">

                            <div><p><img src={selectivity} /></p><p>Séléctivité</p><div><b style={{ fontSize: "15px" }}>4/5</b></div></div>
                            <div className="costRating"><p><img src={cost} /></p><p>Coût</p><div>

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
                            <div className="languageRating" ><p><img src={language} /></p><p>Langue</p><div>  {course?.courseId?.languagestar ? (<>
                                {[1, 2, 3, 4, 5].map((item) => {
                                    if (course?.courseId?.languagestar[0] >= item) {
                                        return <StarIcon style={{ width: "12px", height: "20px" }} />;
                                    } else
                                        return (
                                            <StarBorderIcon style={{ width: "12px", height: "20px" }} />
                                        )
                                })}</>) : "No"}</div></div>
                            <div><p><img src={duration} /></p><p>Durée</p><div>{[1, 2, 3, 4, 5].map(item => <StarIcon style={{ width: "12px", height: "20px" }} />)}</div></div>
                            <div><p><img src={proximate} /></p><p>Proximité</p><div>{[1, 2, 3, 4, 5].map(item => <StarIcon style={{ width: "12px", height: "20px" }} />)}</div></div>




                        </Grid>
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

export default DetailofCourses;
