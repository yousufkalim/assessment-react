// Init
import React, { useEffect } from "react";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import { UpdateStore } from "./StoreContext";
import api from "./api";

// Component
function App() {
  const updateStore = UpdateStore();

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // login function api call
  let checkLogin = async (data) => {
    let res = await api("get", `admin/auth/check-auth`);
    if (res?.data?.success) {
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
