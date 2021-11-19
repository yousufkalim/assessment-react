import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api";

const Login = () => {
  useEffect(() => {
    if (localStorage.token) {
      window.location = "/users";
    }
  }, []);
  // initialize States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // Destructuring of UserForm State
  const { email, password } = formData;

  // Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
    main: {
      width: "50%",
      margin: "auto",
      marginTop: "5%",
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  //

  // Login Function api call
  let getLogin = async (data) => {
    setLoading(true);
    let res = await api("post", `admin/auth/login`, data);

    if (res?.status === 200) {
      localStorage.setItem("token", res?.data?.token);
      window.location = "/users";
    }
  };

  // onChange Function for Input Field
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    getLogin(formData);
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className="loginMain">
        <h1> Login Form</h1>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="E-mail"
            className="inputField"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="inputField"
            required
          />

          <br />
          <Button size="" className="loginButton" type="submit">
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
