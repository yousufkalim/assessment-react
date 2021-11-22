import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  if (window.location.hostname !== "localhost") {
    axios.defaults.baseURL = "https://api.falconconsulting.fr/api";
    axios.defaults.withCredentials = true;
  }
  // axios.defaults.baseURL = "http://localhost:5000/api/";

  return axios[method](uri, body)
    .then((res) => res.data)
    .catch((err) => {
      console.log("API Error --------> ", { ...err });
      if (err.response?.status === 403) {
        window.location = "/login";
      }
      return toast.error(
        err?.response?.data ? err.response.data.message : err?.message
      );
    });
};
export default api;
