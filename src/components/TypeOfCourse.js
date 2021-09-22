import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "../components/dashboard/Card"

const TypeOfCourse = ({ type, percentage, courses }) => {
    const [showDetail, setShowDetail] = useState(false);
    return (

        <div className="typeOfCourses">
            <Grid container spacing={3} className="coursediv">
                <Grid item xs={4} sm={8} onClick={() => setShowDetail(!showDetail)}> {type}</Grid>
                <Grid item xs={4} sm={2} onClick={() => setShowDetail(!showDetail)}> {percentage}%</Grid>
                <Grid item xs={4} sm={2} onClick={() => setShowDetail(!showDetail)}> Show</Grid>

            </Grid>
            {showDetail && <Card courses={courses} />}

        </div>
    );
};

export default TypeOfCourse;
