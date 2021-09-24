import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DetailofCourses from "../components/DetailofCourses"
import search from "../assets/icons/search.png";
import showhide from "../assets/icons/showhide.png";
import hide from "../assets/icons/hide.png";
import { SettingsPowerRounded } from "@material-ui/icons";


const TypeOfCourse = ({ type, percentage, courses }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [open, setOpen] = useState(false);
    const getPercentageColor = (percentage) => {

        if (percentage > 1 && percentage < 30) {
            // yellow
            return "#FFC328"
        }
        else if (percentage > 90 && percentage < 100) {
            return "#84FF70"

        } else {
            // red
            return "#f44336"
        }
    }

    return (

        <div className="typeOfCourses">
            <Grid container spacing={3} className="coursediv">
                <Grid item xs={3} sm={8} className="courseType"> {type}</Grid>
                <Grid item xs={6} sm={2} style={{ background: `${getPercentageColor(percentage)}` }} className="percentageGrid" ><img src={search} className="searchimg" /><b style={{ marginTop: "5px" }}>Compatible à {percentage}</b></Grid>
                <Grid item xs={2} sm={2} className="showhide" onClick={() => {

                    setShowDetail(!showDetail)
                    !showDetail && setOpen(true)

                }} style={{ textAlign: "center", cursor: "pointer" }}>{showDetail ? <img src={hide} /> : <img src={showhide} />} </Grid>

            </Grid>
            {showDetail && <DetailofCourses courses={courses} open={open} setOpen={setOpen} />}

        </div>
    );
};

export default TypeOfCourse;
