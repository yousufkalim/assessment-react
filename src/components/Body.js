import React, { useEffect } from "react";
import { Store } from "../StoreContext";
import api from "../api";

const Body = () => {
  useEffect(() => {
    let res = api("get", "questions", {}, questions);
    console.log("res ", res);
  }, []);
  const { user, questions } = Store();
  return (
    <div>
      <h1>Questions :</h1>
    </div>
  );
};

export default Body;
