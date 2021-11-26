import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@mui/material/Checkbox";
import scrollToTop from "../utils/ScrollTop";
import api from "../api/index.js";

const AddCandidate = () => {
  // initialize ContextStore
  const [formData, setFormData] = useState({
    email: "",
  });
  const [auth, setAuth] = useState(false);
  // // state for address options list
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  // Destructuring of UserForm State
  const { email } = formData;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  //Skills dropdown

  const names = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "dotNet",
    "Native",
    "Express",
  ];

  const [skills, setSkills] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(", ") : value);
  };

  // Get institutes data from API
  useEffect(() => {
    scrollToTop();

    let password = prompt("Enter your password");
    if (password === "falcon@123") {
      setAuth(true);
    }
    // getSchoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const useStyles = makeStyles({
    customTextField: {
      "& input::placeholder": {
        color: "white",
      },
    },
    option: {
      background: "#242635 ",
      color: "white",
      "&:hover": {
        backgroundColor: "#9198a5 !important",
      },
    },
    noOptions: {
      display: `${values.length <= 0 ? "none" : "inherit"}`,
      color: "white",
    },
    select: {
      background: "#242635",
      color: "#9198a5",
      "&:before": {
        borderColor: "red",
      },
      "&:after": {
        borderColor: "yellow",
      },
    },
  });

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

    //form data on console
    let newformdata = { ...formData, skills: skills.join(", ") };

    if (email == "") {
      return toast.error("Please enter email");
    }
    if (skills == "") {
      return toast.error("Please enter your skills");
    }

    setLoading(true);

    await api("post", "/users", newformdata);

    setFormData({
      email: "",
    });
    setSkills([]);

    toast.success("Candidate added successfully!");

    setLoading(false);
  };

  return (
    <>
      {auth && (
        <Grid container spacing={2} className="mainuserform">
          <Grid item xs={12} sm={8} className="responsiveform">
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="userForm"
            >
              <Grid container className="userformgrid">
                <Grid item xs={12} sm={12} className="">
                  <h3 className="formheading">Add a candidate</h3>
                </Grid>

                <Grid container spacing={2} className="inputgrid1">
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="inputField"
                      value={email}
                      onChange={onChange}
                      // required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} className="inputGrid">
                    <FormControl
                      className="selectformControl"
                      variant="outlined"
                    >
                      <InputLabel>Skills</InputLabel>
                      <Select
                        id="demo-multiple-checkbox"
                        className="selectforeducation"
                        multiple
                        value={skills}
                        // defaultValue={skills[2]}
                        name="skills"
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {/* <MenuItem
                      value={skills[0]}
                      disabled
                      >
                      </MenuItem> */}
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={skills.indexOf(name) > -1} />
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="formbuttonsGrid">
                  <Grid xs={12} sm={4}></Grid>

                  <Grid xs={12} sm={4}></Grid>

                  <Grid xs={12} sm={4}>
                    <button
                      variant="contained"
                      className="formSubmitButton"
                      size="large"
                      type="submit"
                      disabled={loading}
                      style={{ opacity: `${loading ? "0.5" : "1"}` }}
                    >
                      <b>
                        {" "}
                        {loading ? (
                          <div className="circulardiv">
                            <CircularProgress size={20} className="" />
                          </div>
                        ) : (
                          "Add Now"
                        )}
                      </b>
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default AddCandidate;
