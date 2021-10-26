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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserForm = ({ setStep, setActiveStep }) => {
  // initialize ContextStore
  const updateStore = UpdateStore();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    // address: "",
    // phone: "",
    // email: "",
    martial: "",
    post: "",
    skills: "",
    learned: "",
    Religious_sect: "",
    experience: "",
    related_experience: "",
    expected_date: "",
    current_employeer: "",
    current_salary: "",
    expected_salary: "",
    optionsState: "",
    text_area:"",
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
    // address,
    // phone,
    // email,
    martial,
    post,
    skills,
    learned,
    Religious_sect,
    experience,
    accept_condition,
    related_experience,
    expected_date,
    current_employeer,
    current_salary,
    expected_salary,
    text_area,
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
  const onChangeeDate = (eDate) => {
    setFormData({ ...formData, expected_date: eDate });
  };

  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //form data on console
    console.log("state is", formData);
    // if (phone.length != 11 || phone[0] != 0) {
    //   return toast.error(
    //     "The phone number must be 11 digits and start with 0"
    //   );
    // }
    if (first_name == "") {
      return toast.error("Please enter first name");
    }
    if (last_name == "") {
      return toast.error("Please enter last name");
    }
     if(date_of_birth==""){
      return toast.error("Please enter date of birth")
    }
    if(martial==""){
      return toast.error("Please enter martial status")
    }
    if(post==""){
      return toast.error("Please enter post name")
    }
    if(skills==""){
      return toast.error("Please enter your skills")
    }
    if(Religious_sect==""){
      return toast.error("Please enter your religious sect")
    }
    if(learned==""){
      return toast.error("Please enter where you have learned about the vacancy")
    }
    if(experience==""){
      return toast.error("Please enter your proffesional experience")
    }
    if(related_experience==""){
      return toast.error("Please enter your experience related to post")
    }
    if(expected_date==""){
      return toast.error("Please enter your expected date of joining")
    }
    if(current_employeer==""){
      return toast.error("please enter your current employer")
    }
    if(current_salary==""){
      return toast.error("Please your current salary")
    }
    if(expected_salary==""){
      return toast.error("please enter your expected salary")
    }
    if(text_area==""){
      return toast.error("Please specify reason")
    }
    if (!accept_condition) {
      return toast.error("Please accept the terms and conditions");
    }
     setFormData({first_name:"", last_name:"", email:"",date_of_birth:"", martial:"", post:"", skills:"",Religious_sect:"",learned:"", experience:"", related_experience:"", expected_date:"", current_employeer:"", current_salary:"", expected_salary:"", text_area:"",})
    setStep(2);
    setActiveStep(2);
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
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  placeholder="Last name"
                  className="inputField"
                  // required
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
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="martial"
                  value={martial}
                  onChange={onChange}
                  placeholder="Martial status"
                  className="inputField"
                  // required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="post"
                  value={post}
                  onChange={onChange}
                  placeholder="Applying for the post"
                  className="inputField"
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="skills"
                  value={skills}
                  onChange={onChange}
                  placeholder="Skills"
                  className="inputField"
                  // required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="Religious_sect"
                  value={Religious_sect}
                  onChange={onChange}
                  placeholder="Religious sect"
                  className="inputField"
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="learned"
                  value={learned}
                  onChange={onChange}
                  // maxlength="11"
                  placeholder="How you learned about the vacancy"
                  className="inputField"
                  // required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="experience"
                  value={experience}
                  onChange={onChange}
                  placeholder="Total professional experience"
                  className="inputField"
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
                  name="related_experience"
                  value={related_experience}
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
                  selected={expected_date}
                  // locale={selectedDateLang}
                  dateFormat="dd/MM/yyyy"
                  onChange={onChangeeDate}
                  className="inputField"
                  value={expected_date}
                  autoComplete="off"
                  placeholderText="Expected date of joining"
                  openToDate={new Date("2021/01/01")}
                  // required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="current_employeer"
                  value={current_employeer}
                  onChange={onChange}
                  placeholder="Current employer"
                  className="inputField"
                  // required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type="text"
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
                  type="text"
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
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              onChange={onChange}
              value={text_area}
              name="text_area"
              placeholder="Reason for leaving current job"
              style={{ width: 648,padding:"15px",color: "#9198a5", background:"#242635", marginLeft:"20px", marginTop:"20px", borderRadius:"10px", border:"none", outline:"none", marginBottom:"10px"} }
            />
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
                      "Proceed To Assessment"
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
