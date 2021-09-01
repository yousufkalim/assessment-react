//init
import React from "react";
import "../../css/card.css";

//Component
function Cards({ courses }) {
  return (
    <>
      <div className="card">
        {courses.length >= 1 ? (
          courses?.map((course) => (
            <>
              <p>
                <b>Sub-Domain : </b> {course?.courseId?.sub_domains}
              </p>
              <p>
                <b>Name of Course : </b> {course?.courseId?.course_name}
              </p>
              <hr />
            </>
          ))
        ) : (
          <>
            <h4>No Course Available for</h4>
            <h4>this type of Course</h4>
          </>
        )}
      </div>
    </>
  );
}

export default Cards;
