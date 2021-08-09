import axios from "axios";
import { toast } from "react-toastify";
import { UpdateStore } from "../StoreContext";

const api = async (method = "get", uri, body, destination) => {
  //   const updateStore = UpdateStore();
  axios.defaults.baseURL = process.env.baseURL;

  return axios[method](uri, body)
    .then((res) => {
      //   updateStore({ [destination]: res.data });
      return res;
    })
    .catch((err) => toast.error(err?.message));
};

export default api;
