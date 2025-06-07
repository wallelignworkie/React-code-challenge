import axios from "axios";
import { API_BASE_URL } from "../config";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

console.log("Axios baseURL:", API_BASE_URL);
