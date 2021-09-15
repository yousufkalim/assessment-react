// Init
import React, { useEffect } from "react";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import "./css/index.css";

import SetAuthToken from "./utils/SetAuthToken";

// Component
function App() {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
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
