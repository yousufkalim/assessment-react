import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  if (window.location.hostname !== "localhost") {
    axios.defaults.baseURL = "https://orientator.falconconsulting.fr/api";
    axios.defaults.withCredentials = true;
  }

  // ("https://orientator.falconconsulting.fr/api");
  // process.env.REACT_APP_baseURL;
  return axios[method](uri, body)
    .then((res) => res)
    .catch((err) => {
      if (err.status === 403) {
        window.location = "/login";
      }
      console.log("API Error --------> ", err.response.status);
      return toast.error(
        err?.response?.data ? err.response.data : err?.message
      );
    });
};

export default api;
