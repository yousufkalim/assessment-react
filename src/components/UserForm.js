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

import api from "../api";

let education = [
  "Quatrième",
  "Troisième",
  "Seconde Générale",
  "Première Générale",
  "Première STL",
  "Première STI2D",
  "Première STD2A",
  "Première STMG",
  "Première ST2S",
  "Première S2TMD",
  "Première STHR",
  "Première STAV",
  "Terminale Générale",
  "Terminale STL",
  "Terminale STI2D",
  "Terminale STD2A",
  "Terminale STMG",
  "Terminale ST2S",
  "Terminale S2TMD",
  "Terminale STHR",
  "Terminale STAV",
];

const UserForm = ({ setStep, setActiveStep }) => {
  const [data,setData] = useState()
  // initialize ContextStore
  const updateStore = UpdateStore();
  const { institutes } = Store();

  let getSchoolData = async () => {
    let res = await api("get", "/institute");
    if (res) {
      updateStore({ institutes: res?.data?.institute });
    }
  };
  // const [data, setData] = React.useState()
  // initialize States
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    education_level: "Classe",
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
    institute,
    address,
    education_level,
    phone,
    email,
    newsletter,
    accept_condition,
  } = formData;

  // Get institutes data from API
  useEffect(() => {
    scrollToTop();
    getSchoolData();
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
      if (e.target.name === "education_level" && e.target.value === "") {
        setFormData({
          ...formData,
          institute: "",
          education_level: "",
        });
      } else
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
  };
  // onChange Function for Select institute
  const handleChangeSchool = (event, value) => {
    setFormData({ ...formData, institute: value?._id });
  };
  // function for Date select
  const onChangeDate = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  // Get All Address in drop down List from API
  const getAllAdress = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    delete axios.defaults.headers.common["x-auth-token"];

    let res = await axios.get(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1",
      {
        withCredentials: false,
      }
    );

    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    }

    var addressToSet = []; // //debugger;
    for (var i = 0; i < res?.data?.features?.length; i++) {
      addressToSet.push({
        id: i,
        label: res?.data?.features[i].properties.label,
        label2: `${
          res?.data?.features[i].properties.label +
          "," +
          res?.data?.features[i].properties.context
        }`,
        city: res?.data?.features[i].properties.city,
        PostalCode: res?.data?.features[i].properties.postcode,
        lat: res?.data?.features[0].geometry.coordinates[1],
        lng: res?.data?.features[0].geometry.coordinates[0],
      });
    }
    if (addressToSet.length === res?.data?.features.length) {
      setValues(addressToSet);
    }
  };
  // Set Address in  setAddressValue State
  const SetAddress = async (item) => {
    if (item.target.textContent) {
      const selectedItem = item.target.textContent;
      for (var i = 0; i < values.length; i++) {
        if (values[i].label2 === selectedItem) {
          var postal_code = values[i].PostalCode;
          var lat = values[i].lat;
          var lng = values[i].lng;
          const city = values[i].city;
          await setAddressValue({
            ...addressValue,
            label: values[i].label,
            label2: values[i].label2,
            postal_code,
            lat,
            lng,
            city,
          });
        }
      }
    } else {
      await setAddressValue({
        ...addressValue,
        address: "",
        zip_code: "",
        lat: "",
        long: "",
        city: "",
      });
    }
  };
  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("state is ",formData)
setFormData({first_name:"",last_name:"",email:"",date_of_birth:"",address:"",phone:"",})
setStep(2)
    // if (institute == "") {
    //   return toast.error("Veuillez entrer votre institut");
    // }
    // if (addressValue?.city == "") {
    //   return toast.error("Veuillez entrer votre adresse");
    // }
    // if (phone.length != 10 || phone[0] != 0) {
    //   return toast.error(
    //     "Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0"
    //   );
    // }
    // if (!accept_condition) {
    //   return toast.error("Veuillez accepter les termes et conditions");
    // }
    // setLoading(true);
    // let res = await api("post", "/users/create", {
    //   ...formData,
    //   address: addressValue,
    // });
    // if (res.status === 200) {
    //   updateStore({
    //     questions: res?.data?.questions,
    //     answers: res?.data?.answers,
    //     user: res?.data?.user,
    //   });
    //   setStep(2);
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
    // setLoading(false);
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
              Contact Us
              </h3>
            </Grid>
            <Grid container spacing={2} className="inputgrid1">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="first_name"
                  placeholder="Name"
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
                  placeholder="Last Name"
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
                  maxlength="10"
                  placeholder="Enter your Phone"
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
                I Accept the terms and condition
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
                  <b> Back</b>
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
                      "Form Submit"
                    )}
                  </b>
                </button>
                <h1>{data}</h1>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default UserForm;
