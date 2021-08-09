// Init
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Body from "./components/Body";

// Component
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
      />
      <h1>Hello World</h1>
      <Switch>
        <Route exact path="/a" component={Body} />
      </Switch>
    </div>
  );
}

// Export
export default App;
