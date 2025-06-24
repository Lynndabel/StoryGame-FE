import axios from "axios";
const BASE_URL = process.env.SERVER_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});