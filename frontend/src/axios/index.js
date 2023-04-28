import axios from "axios";
import cookie from "react-cookies";
import { TOKEN_COOKIE_NAME } from "../constant";

const token = cookie.load(TOKEN_COOKIE_NAME);

export default axios.create({
  baseURL: "https://xiaorui-shen-yuchen-cao-jiayi-lu.onrender.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
