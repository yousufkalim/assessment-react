import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api";

const Login = () => {
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
    if (res?.data?.success) {
      window.location = "/users";
      // updateStore({ login: res?.data });
    }
    setLoading(false);
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
    <div className={classes.main}>
      <h1> Login form</h1>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="email"
          variant="outlined"
          size="small"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          size="small"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <br />
        <Button variant="contained" color="primary" size="large" type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
