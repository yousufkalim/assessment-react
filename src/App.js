// Init
import React, { useEffect } from "react";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import "./css/index.css";
import { OnlineStatus } from "./StoreContext";

import SetAuthToken from "./utils/SetAuthToken";

// Component
function App() {
  const isConnected = OnlineStatus();

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  return (
    <div className="App">
      <td onClick={() => window.open("someLink", "_blank")}>text</td>
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
