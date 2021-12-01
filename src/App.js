// Init
import React, { useEffect } from "react";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import "./css/index.css";
import api from "./api";
import { OnlineStatus } from "./StoreContext";

import SetAuthToken from "./utils/SetAuthToken";

// Component
function App() {
  const isConnected = OnlineStatus();

  // In online mode we have submit the result to backend
  useEffect(() => {
    // Getting pending result from local storage
    const pending_result = JSON.parse(localStorage.getItem("pending_result"));

    if (isConnected && pending_result) {
      // Calling our respected api to evaluate the result
      api("post", "/results", pending_result)
        .then(() => {
          // If all ok then we have to reset pending_result from local storage
          localStorage.setItem("pending_result", JSON.stringify(false));
        })
        .catch(() => {
          // Now we have to create a separate record of all failed tasks
          const failedTasks =
            JSON.parse(localStorage.getItem("failed_tasks")) || []; // Getting all failed tasks from local storage

          // Adding new failed task in existing list
          localStorage.setItem(
            "failed_tasks",
            JSON.stringify([...failedTasks, pending_result])
          );

          // Now we have to clear the pending_result for the next task
          localStorage.setItem("pending_result", JSON.stringify(false));
        });
    }
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
