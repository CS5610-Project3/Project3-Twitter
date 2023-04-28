import axios from "axios";
import cookie from "react-cookies";
import { TOKEN_COOKIE_NAME } from "../constant";

const token = cookie.load(TOKEN_COOKIE_NAME);

export default axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
