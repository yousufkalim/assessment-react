import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  if (window.location.hostname !== "localhost") {
    axios.defaults.baseURL = "https://assessment.falconit.com.pk/api";
    axios.defaults.withCredentials = true;
  }
  // axios.defaults.baseURL = "http://localhost:5000/api/";

  return new Promise((resolve, reject) => {
    axios[method](uri, body)
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log("API Error --------> ", { ...err });
        return toast.error(
          err?.response?.data ? err.response.data.message : err?.message
        );
        reject(err);
      });
  });
};
export default api;
