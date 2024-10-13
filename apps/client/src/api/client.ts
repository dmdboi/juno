import axios from "axios";
import type { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

export default client;
