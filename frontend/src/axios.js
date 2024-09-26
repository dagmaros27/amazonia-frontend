import axios from "axios";

const instance = new axios.create({
  baseURL: "https://amazonia-backend-dax.onrender.com",
});

export default instance;
