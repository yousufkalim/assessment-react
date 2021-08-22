// Init
import React, { useState, useEffect } from "react";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import { Store, UpdateStore } from "./StoreContext";
import api from "./api";

// Component
function App() {
  const updateStore = UpdateStore();

  useEffect(() => {
    checkLogin();
  }, []);
  // login function api call
  let checkLogin = async (data) => {
    let res = await api("get", `/auth/check-auth`);
    if (res?.data?.success) {
      console.log("app.js");
      updateStore({ login: res?.data });
    }
  };
  return (
    <div className="App">
      {/* tostify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
      />
      {/* Routes */}
      <Index />
    </div>
  );
}

// Export
export default App;
