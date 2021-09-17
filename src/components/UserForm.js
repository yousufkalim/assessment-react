import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Checkbox } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Store, UpdateStore } from "../StoreContext";
import Grid from "@material-ui/core/Grid";
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
    education_level: "",
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

  // Get All Address in drop down List from API
  const [values, setValues] = useState([]);
  const getAllAdress = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    let res = await axios.get(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=street&autocomplete=1",
      {
        withCredentials: false,
      }
    );
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
      return toast.error("Please Enter Your institute");
    }
    if (addressValue?.city == "") {
      return toast.error("Please Enter Your Address");
    }
    if (phone.length != 10 || phone[0] != 0) {
      return toast.error("Phone number must be 10 digits and start with 0");
    }
    if (!accept_condition) {
      return toast.error("Please Accept the Terms and Condtions");
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
      <Grid item xs={12} sm={4} className="">
        <h1>Dummy</h1>
      </Grid>
      <Grid item xs={12} sm={8} className="">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container className="userformgrid">
            <Grid item xs={12} sm={12} className="">
              <h3 className="formheading">
                Pour mieux te conseiller, j’ai besoin
                <br className="br" /> d’en savoir davantage sur toi !
              </h3>
            </Grid>
            <Grid container spacing={2} className="">
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
            <Grid container spacing={2} className="">
              <Grid item xs={12} sm={6} className="inputGrid">
                <input
                  type={dateType}
                  placeholder="Date of Birth"
                  onFocus={() => setDatetype("date")}
                  onBlur={() => setDatetype("text")}
                  name="date_of_birth"
                  value={date_of_birth}
                  onChange={onChange}
                  placeholder="Date de naissance"
                  className="inputField"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <Autocomplete
                  options={values}
                  getOptionLabel={(option) => option.label}
                  onChange={SetAddress}
                  hiddenLabel="true"
                  style={{
                    width: "89%",
                    margin: "auto",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Address"
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
                  type="number"
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
                  <InputLabel id="demo-simple-select-outlined-label">
                    {education_level ? "" : "  Classe"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="education_level"
                    value={education_level}
                    onChange={onChange}
                    placeholder=" Class"
                    className="selectforeducation"
                  >
                    {education.map((edu) => (
                      <MenuItem value={edu}>{edu}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className="inputGrid">
                <Autocomplete
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
                    width: "89%",
                    margin: "auto",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Schools"
                      variant="outlined"
                      value={institute}
                      name="institute"
                      onChange={onChange}
                    />
                  )}
                  value={!education_level && ""}
                  disabled={!education_level}
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
                  Retour
                </div>
              </Grid>
              <Grid xs={12} sm={4}></Grid>
              <Grid xs={12} sm={4}>
                <button
                  variant="contained"
                  className="formSubmitButton"
                  size="large"
                  type="submit"
                >
                  {loading ? "Loading..." : "Commencer le test"}
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
