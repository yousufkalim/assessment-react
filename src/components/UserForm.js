import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Checkbox, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Store, UpdateStore } from "../StoreContext";
import Grid from "@material-ui/core/Grid";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import arrowleft from "../assets/img/arrow2.png";
import scrollToTop from "../utils/ScrollTop";
import DatePicker from "react-datepicker";



const UserForm = ({ setStep, setActiveStep }) => {
  // initialize ContextStore
  const updateStore = UpdateStore();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone: "",
    email: "",
    newsletter: false,
    accept_condition: false,
  });
  // state for address options list
  const [values, setValues] = useState([]);

  // state for address details
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
    first_name,
    last_name,
    date_of_birth,
    address,
    phone,
    email,
    accept_condition,
  } = formData;

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
  const classes = useStyles();

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
  // onChange Function for Select institute
  // const handleChangeSchool = (event, value) => {
  //   setFormData({ ...formData, institute: value?._id });
  // };
  // function for Date select
  const onChangeDate = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  
  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //form data on console
    console.log('state is', formData)
    if (phone.length != 11 || phone[0] != 0) {
      return toast.error(
        "The phone number must be 11 digits and start with 0"
      );
    }
    if (!accept_condition) {
      return toast.error("Please accept the terms and conditions");
    }
    setFormData({first_name:"", last_name:"", email:"",date_of_birth:"", address:"", phone:""})
    setStep(2)
   };
  return (
    <Grid container spacing={2} className="mainuserform">
      <Grid item xs={12} sm={4} className="dummyGrid">
        <img src={Dummy} className="dummyimg forweb" />
        <img src={MainMobile} className=" dummyimgforuserform formobile" />
      </Grid>
      <Grid item xs={12} sm={8} className="responsiveform">
        <form autoComplete="off" onSubmit={handleSubmit} className="userForm">
          <Grid container className="userformgrid">
            <Grid item xs={12} sm={12} className="">
              <h3 className="formheading">
                To better advise you, I need <br className="br" />
                to know more about you!
              </h3>
            </Grid>
            <Grid container spacing={2} className="inputgrid1">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="first_name"
                  placeholder="First name"
                  className="inputField"
                  value={first_name}
                  onChange={onChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  placeholder="Last name"
                  className="inputField"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="inputgrid1">
              <Grid item xs={12} sm={6} className="inputGrid">
                <DatePicker
                  selected={date_of_birth}
                  // locale={selectedDateLang}
                  dateFormat="dd/MM/yyyy"
                  onChange={onChangeDate}
                  className="inputField"
                  value={date_of_birth}
                  autoComplete="off"
                  placeholderText="Date of birth"
                  openToDate={new Date("1999/01/01")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="address"
                  value={address}
                  onChange={onChange}
                  placeholder="Address"
                  className="inputField"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="E-mail"
                  className="inputField"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  maxlength="11"
                  placeholder="Contact no"
                  className="inputField"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className="termsandconditionGrid">
              <Checkbox
                inputProps={{ "aria-label": "secondary checkbox" }}
                style={{ color: "white" }}
                name="accept_condition"
                value={accept_condition}
                onChange={onChange}
              />
              <span className="termsandcondition">
                Accept terms and conditions
              </span>
            </Grid>
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
                      "Submit"
                    )}
                  </b>
                </button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default UserForm;
