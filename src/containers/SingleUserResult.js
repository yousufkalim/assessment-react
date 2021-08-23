import React, { useEffect } from "react";

const SingleUserResult = () => {
  useEffect(() => {
    console.log("single user result useeffect call");
  }, []);
  return (
    <div class="content">
      <h1>Single user results</h1>
    </div>
  );
};

export default SingleUserResult;
