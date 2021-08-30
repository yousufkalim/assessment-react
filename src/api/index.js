import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  if (window.location.hostname !== "localhost") {
    axios.defaults.baseURL = "https://orientator.falconconsulting.fr/api";
    axios.defaults.withCredentials = true;
  }

  return axios[method](uri, body)
    .then((res) => res)
    .catch((err) => {
      if (err?.response?.status === 403) {
        if (
          window.location.pathname === "/users" ||
          window.location.pathname === "/dashboard" ||
          window.location.pathname === "/results"
        ) {
          window.location = "/login";
        }
      } else {
        console.log("API Error --------> ", err.response.status);
        return toast.error(
          err?.response?.data ? err.response.data : err?.message
        );
      }
    });
};

export default api;
