import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CustomizedDialogs from "../components/CirclerTimer";

// import validate from 'react-joi-validation';
import Joi from "joi";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Store, UpdateStore } from "../StoreContext";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import arrowleft from "../assets/img/arrow2.png";
import scrollToTop from "../utils/ScrollTop";
import DatePicker from "react-datepicker";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from "@mui/material/styles";
import moment from "moment";
import Moment from "react-moment";

import renderTime from "../components/CirclerTimer";

// import MenuItem from "@material-ui/core/MenuItem";
// import Checkbox from '@mui/material/Checkbox';

const UserForm = ({ setStep, setActiveStep }) => {
  // initialize ContextStore
  const updateStore = UpdateStore();
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    dob: "",
    address: "",
    email: "",
    post: "",
    vacancy_source: "",
    sect: "",
    total_experience: "",
    post_experience: "",
    current_employer: "",
    current_salary: "",
    expected_salary: "",
    joining_time: "",
    marital_status: "",
    skills: "",
    leaving_reason: "",
  });
  // // state for address options list
  const [values, setValues] = useState([]);
  const [open, setOpen] = React.useState(false);
  // // state for address details
  const [addressValue, setAddressValue] = useState({
    lat: "",
    lng: "",
    city: "",
    postal_code: "",
    label: "",
    label2: "",
  });
  const [loading, setLoading] = useState(false);

  // Destructuring of UserForm State
  const {
    name,
    contact_no,
    dob,
    address,
    email,
    marital_status,
    post,
    vacancy_source,
    sect,
    total_experience,
    post_experience,
    joining_time,
    current_employer,
    current_salary,
    expected_salary,
    leaving_reason,
  } = formData;

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
    "React.js",
    "Node.js",
    "Mongodb/Express",
    "React Native",
    ".Net",
    "Django",
  ];

  const [skills, setSkills] = useState(["skills"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };
  //tooltip for
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  const longText = `
Note:There is no discrimination based on sect and religion.
This information is just to know about the specific
holidays/leaves you might require.
`;

  // Get institutes data from API
  useEffect(() => {
    scrollToTop();
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
    if (
      e.target.name === "newsletter" ||
      e.target.name === "accept_condition"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      if (e.target.name === "" && e.target.value === "") {
        setFormData({
          ...formData,
          //  institute: "",
          // expertise: "",
        });
      } else
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
  };
  // function for Date select
  const onChangeDate = (date) => {
    setFormData({ ...formData, dob: date });
  };
  const onChangeeDate = (eDate) => {
    setFormData({ ...formData, joining_time: eDate });
  };

  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //form data on console
    let newformdata = { ...formData, skills };
    console.log("form", newformdata);
    if (name == "") {
      return toast.error("Please enter name");
    }
    if (contact_no.length != 11 || contact_no[0] != 0) {
      return toast.error("Contact no must start from 0 and of 11 digits");
    }
    if (email == "") {
      return toast.error("Please enter email");
    }
    if (vacancy_source == "") {
      return toast.error(
        "Please enter where you have learned about the vacancy"
      );
    }
    if (dob == "") {
      return toast.error("Please enter date of birth");
    }
    if (post == "") {
      return toast.error("Please enter post name");
    }
    if (total_experience == "") {
      return toast.error("Please enter your proffesional experience");
    }
    if (post_experience == "") {
      return toast.error("Please enter your experience related to post");
    }
    if (joining_time == "") {
      return toast.error("Please enter your expected date of joining");
    }
    if (current_employer == "") {
      return toast.error("please enter your current employer");
    }
    if (current_salary == "") {
      return toast.error("Please your current salary");
    }
    if (expected_salary == "") {
      return toast.error("please enter your expected salary");
    }

    if (sect == "") {
      return toast.error("Please enter your religious sect");
    }
    if (skills == "") {
      return toast.error("Please enter your skills");
    }
    if (leaving_reason == "") {
      return toast.error("Please enter reason for leaving previous job");
    }
    setOpen(true);
    // setTimeout(() => {
    //   setStep(2);
    //   setActiveStep(2);
    // }, 10000);

    setFormData({
      name: "",
      contact_no: "",
      email: "",
      dob: "",
      marital_status: "",
      post: "",
      skills: "",
      Religious_sect: "",
      vacancy_source: "",
      total_experience: "",
      post_experience: "",
      joining_time: "",
      current_employer: "",
      current_salary: "",
      expected_salary: "",
      leaving_reason: "",
    });
  };
  return (
    <>
      <Grid container spacing={2} className="mainuserform">
        <Grid item xs={12} sm={4} className="dummyGrid">
          <img src={Dummy} className="dummyimg forweb" />
          <img src={MainMobile} className=" dummyimgforuserform formobile" />
        </Grid>
        <Grid item xs={12} sm={8} className="responsiveform">
          <form autoComplete="off" onSubmit={handleSubmit} className="userForm">
            <Grid container className="userformgrid">
              <Grid item xs={12} sm={12} className="">
                <h3 className="formheading">Performa</h3>
              </Grid>
              <Grid container spacing={2} className="inputgrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    name="name"
                    type="String"
                    placeholder="Full name"
                    className="inputField"
                    value={name}
                    onChange={onChange}
                    // required
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    name="contact_no"
                    type="String"
                    value={contact_no}
                    onChange={onChange}
                    placeholder="Contact no"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="inputgrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="String"
                    name="email"
                    placeholder="Email"
                    className="inputField"
                    value={email}
                    onChange={onChange}
                    // required
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    name="vacancy_source"
                    value={vacancy_source}
                    onChange={onChange}
                    placeholder="How you learned about the vacancy"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="inputGrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <DatePicker
                    selected={dob}
                    // locale={selectedDateLang}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChangeDate}
                    className="inputField"
                    name="dob"
                    value={dob}
                    autoComplete="off"
                    placeholderText="Date of birth"
                    openToDate={new Date("1999/01/01")}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChange}
                    placeholder="Address"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="String"
                    name="post"
                    value={post}
                    onChange={onChange}
                    placeholder="Applying for the post"
                    className="inputField"
                    // required
                  />
                </Grid>

                <Grid item xs={12} sm={6} className="inputGrid">
                  <Tooltip title={longText}>
                    <input
                      type="text"
                      name="sect"
                      value={sect}
                      onChange={onChange}
                      placeholder="Religious sect"
                      className="inputField"
                      // required
                    />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid container spacing={2} className="">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="String"
                    name="total_experience"
                    value={total_experience}
                    onChange={onChange}
                    placeholder="Total professional experience"
                    className="inputField"
                    // required
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="String"
                    name="post_experience"
                    value={post_experience}
                    onChange={onChange}
                    // maxlength="11"
                    placeholder="Experience related to the post"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="inputgrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <DatePicker
                    selected={joining_time}
                    // locale={selectedDateLang}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChangeeDate}
                    className="inputField"
                    name="joining_time"
                    value={joining_time}
                    autoComplete="off"
                    placeholderText="Expected date of joining"
                    minDate={moment().toDate()}
                    openToDate={new Date()}
                    // required
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    name="current_employer"
                    value={current_employer}
                    onChange={onChange}
                    placeholder="Current employer"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="inputgrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="number"
                    name="current_salary"
                    value={current_salary}
                    onChange={onChange}
                    placeholder="Current salary"
                    className="inputField"
                    // required
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <input
                    type="number"
                    name="expected_salary"
                    value={expected_salary}
                    onChange={onChange}
                    // maxlength="11"
                    placeholder="Expected salary"
                    className="inputField"
                    // required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="inputgrid1">
                <Grid item xs={12} sm={6} className="inputGrid">
                  <FormControl
                    className="selectformControl"
                    variant="outlined"
                    name="marital_status"
                    value="marital_status"
                  >
                    <Select
                      className="selectforeducation"
                      defaultValue="marital_status"
                    >
                      <MenuItem value="marital_status" disabled>
                        Marital Status
                      </MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Unmarried">Unmarried</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} className="inputGrid">
                  <FormControl className="selectformControl" variant="outlined">
                    <InputLabel >
                      
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      className="selectforeducation"
                      multiple
                      value={skills}
                      defaultValue={skills[0]}
                      name="skills"
                      onChange={handleChange}
                      // input={<OutlinedInput label="skills" />}
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
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                onChange={onChange}
                value={leaving_reason}
                name="leaving_reason"
                placeholder="Reason for leaving current job"
                style={{
                  width: 537,
                  padding: "15px",
                  color: "#9198a5",
                  background: "#242635",
                  marginLeft: "14px",
                  marginTop: "20px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  marginBottom: "10px",
                }}
              />
              <Grid container spacing={2} className="formbuttonsGrid">
                <Grid xs={12} sm={4}>
                  <div
                    size="large"
                    className="formbackbutton"
                    onClick={() => setStep(0)}
                  >
                    <img src={arrowleft} className="arrowleft" />
                    <b>Previous</b>
                  </div>
                </Grid>

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
                        "Proceed to Assessment"
                      )}
                    </b>
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        setStep={setStep}
        setActiveStep={setActiveStep}
      />
    </>
  );
};
export default UserForm;
