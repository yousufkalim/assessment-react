import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Button, Checkbox } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";

const UserForm = ({ setStep }) => {
  // initialize ContextStore
  const updateStore = UpdateStore();
  const { schools } = Store();

  // Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    main: {
      width: "50%",
      margin: "auto",
      textAlign: "center",
    },
    chekbox: {
      margin: "auto",
    },
  }));
  const classes = useStyles();
  //

  // Get schools data from API
  useEffect(() => {
    getSchoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let getSchoolData = async () => {
    let res = await api("get", "/schools");
    if (res) {
      updateStore({ schools: res?.data?.schools });
    }
  };
  // initialize States
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    school: "",
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

  // Destructuring of UserForm State
  const {
    first_name,
    last_name,
    date_of_birth,
    school,
    address,
    education_level,
    phone,
    email,
    newsletter,
    accept_condition,
  } = formData;

  // onChange Function for Input Field
  const onChange = (e) => {
    if (
      e.target.name === "newsletter" ||
      e.target.name === "accept_condition"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // onChange Function for Select School
  const handleChangeSchool = (event, value) => {
    setFormData({ ...formData, school: value?._id });
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
    if (school == "") {
      return toast.error("Please Enter Your school");
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
    }
    setLoading(false);
  };
  return (
    <div className={classes.main}>
      <h1>Profile form</h1>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="First_name"
          variant="outlined"
          size="small"
          name="first_name"
          value={first_name}
          onChange={onChange}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          size="small"
          name="last_name"
          value={last_name}
          onChange={onChange}
          required
        />
        <TextField
          label="Education Level"
          variant="outlined"
          size="small"
          name="education_level"
          value={education_level}
          onChange={onChange}
          required
        />
        <TextField
          label="Phone"
          type="number"
          variant="outlined"
          min={10}
          max={10}
          size="small"
          name="phone"
          value={phone}
          onChange={onChange}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <TextField
          type="date"
          variant="outlined"
          size="small"
          name="date_of_birth"
          value={date_of_birth}
          onChange={onChange}
          required
        />
        <Autocomplete
          options={schools}
          freeSolo
          getOptionLabel={(option) => option.name}
          onChange={handleChangeSchool}
          style={{ width: "50%", margin: "auto", marginBottom: "10px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Schools"
              variant="outlined"
              value={school}
              name="school"
              onChange={onChange}
            />
          )}
        />
        <Autocomplete
          options={values}
          getOptionLabel={(option) => option.label}
          onChange={SetAddress}
          style={{ width: "50%", margin: "auto" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              variant="outlined"
              onChange={getAllAdress}
              value={address}
            />
          )}
        />
        <div style={{ margin: "auto" }}>
          {/* <Checkbox
            label="aaaa"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="newsletter"
            value={newsletter}
            onChange={onChange}
          />
          NewSletter */}
          <br />
          <Checkbox
            label="aaaa"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="accept_condition"
            value={accept_condition}
            onChange={onChange}
          />
          Accept Terms And Conditions
        </div>
        <br />
        <Button variant="contained" color="primary" size="large" type="submit">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
export default UserForm;
