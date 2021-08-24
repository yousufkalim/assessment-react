//init
import React from "react";
import "../../css/card.css";

//Component
function Cards({ course }) {
  return (
    <div className="">
      <div className="card">
        <h2>Type of Course: {course?.courseId?.type_of_course}</h2>
        <p>
          <b>Sub-Domain : </b> {course?.courseId?.sub_domains}
        </p>
        <p>
          <b>Name of Course : </b> {course?.courseId?.course_name}
        </p>
      </div>
    </div>
  );
}

export default Cards;
