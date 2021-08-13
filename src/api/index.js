import axios from "axios";
import { toast } from "react-toastify";

const api = async (method = "get", uri, body) => {
  axios.defaults.baseURL = "https://orientator.falconconsulting.fr";
  // ("http://192.168.0.117:5000/api");

  // process.env.REACT_APP_baseURL;
  return axios[method](uri, body)
    .then((res) => res)
    .catch((err) =>
      toast(err?.response?.data ? err.response.data : err?.message)
    );
};

export default api;
