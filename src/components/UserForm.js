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
const UserForm = ({ setStep, setActiveStep }) => {
  const classes = useStyles();
  // initialize ContextStore
  const updateStore = UpdateStore();
  const { institutes } = Store();

  let getSchoolData = async () => {
    let res = await api("get", "/institute");
    if (res) {
      updateStore({ institutes: res?.data?.institute });
    }
  };
  // initialize States
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    institute: "",
    address: "",
    education_level: "Classe",
    phone: "",
    email: "",
    newsletter: false,
    accept_condition: false,
  });

  const [addressValue, setAddressValue] = useState({
    lat: "",
    lng: "",
    city: "",
    postal_code: "",
    label: "",
  });
  const [loading, setLoading] = useState(false);
  const [dateType, setDatetype] = useState("text");
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
  // fordate
  const onChangeDate = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  // Get All Address in drop down List from API
  const [values, setValues] = useState([]);
  const getAllAdress = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    delete axios.defaults.headers.common["x-auth-token"];

    let res = await axios.get(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=street&autocomplete=1",
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
        if (values[i].label === selectedItem) {
          var postal_code = values[i].PostalCode;
          var lat = values[i].lat;
          var lng = values[i].lng;
          const city = values[i].city;
          await setAddressValue({
            ...addressValue,
            label: values[i].label,
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
    if (institute == "") {
      return toast.error("Veuillez entrer votre institut");
    }
    if (addressValue?.city == "") {
      return toast.error("Veuillez entrer votre adresse");
    }
    if (phone.length != 10 || phone[0] != 0) {
      return toast.error(
        "Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0"
      );
    }
    if (!accept_condition) {
      return toast.error("Veuillez accepter les termes et conditions");
    }
    setLoading(true);
    let res = await api("post", "/users/create", {
      ...formData,
      address: addressValue,
    });
    if (res.status === 200) {
      updateStore({
        questions: res?.data?.questions,
        answers: res?.data?.answers,
        user: res?.data?.user,
      });
      setStep(2);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setLoading(false);
  };
  return (
    <Grid container spacing={2} className="mainuserform">
      <Grid item xs={12} sm={4} className="dummyGrid">
        <img src={Dummy} className="dummyimg forweb" />
        <img src={MainMobile} className="dummyimg formobile" />
      </Grid>
      <Grid item xs={12} sm={8} className="responsiveform">
        <form autoComplete="off" onSubmit={handleSubmit} className="userForm">
          <Grid container className="userformgrid">
            <Grid item xs={12} sm={12} className="">
              <h3 className="formheading">
                Pour mieux te conseiller, j’ai besoin <br className="br" />
                d’en savoir davantage sur toi !
              </h3>
            </Grid>
            <Grid container spacing={2} className="inputgrid1">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  name="first_name"
                  placeholder="Prénom"
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
                  placeholder="Nom"
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
                  placeholderText="Date de naissance"
                  openToDate={new Date("1999/01/01")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <Autocomplete
                  options={values}
                  classes={{
                    option: classes.option,
                    noOptions: classes.noOptions,
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: "#242635" }}>{children}</Paper>
                  )}
                  getOptionLabel={(option) => option.label}
                  onChange={SetAddress}
                  hiddenLabel="true"
                  style={{
                    width: "91%",
                    margin: "auto",
                  }}
                  renderInput={(params) => (
                    <TextField
                      classes={{ root: classes.customTextField }}
                      {...params}
                      placeholder="Adresse"
                      style={{ color: "white" }}
                      variant="outlined"
                      onChange={getAllAdress}
                      value={address}
                    />
                  )}
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
                  placeholder="Numéro de téléphone"
                  className="inputField"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <FormControl variant="outlined" className="selectformControl">
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                    {education_level ? "" : " classe "}
                  </InputLabel> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="education_level"
                    value={education_level}
                    defaultValue={education_level}
                    onChange={onChange}
                    className={classes.select}
                    className="selectforeducation"
                  >
                    <MenuItem
                      value="Classe"
                      disabled
                      style={{ textAlign: "left !important" }}
                    >
                      <em>Classe</em>
                    </MenuItem>
                    {education.map((edu) => (
                      <MenuItem value={edu}>{edu}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <Autocomplete
                  classes={{
                    option: classes.option,
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: "#242635" }}>{children}</Paper>
                  )}
                  options={
                    education_level == "Quatrième" ||
                    education_level == "Troisième"
                      ? institutes?.filter(
                          (institute) => institute.type == "College"
                        )
                      : institutes?.filter(
                          (institute) => institute.type == "School"
                        )
                  }
                  freeSolo
                  getOptionLabel={(option) => option.name}
                  onChange={handleChangeSchool}
                  style={{
                    width: "91%",
                    margin: "auto",
                  }}
                  renderInput={(params) => (
                    <TextField
                      classes={{ root: classes.customTextField }}
                      {...params}
                      placeholder="Établissement actuel"
                      variant="outlined"
                      value={institute}
                      name="institute"
                      onChange={onChange}
                    />
                  )}
                  value={!education_level && ""}
                  disabled={!education_level || education_level == "Classe"}
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
                J’accepte les termes et les conditions
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
                  <b> Retour</b>
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
                      "Commencer le test"
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
