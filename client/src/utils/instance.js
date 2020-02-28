import axios from "axios";

const instance = axios.create({
  baseURL: "https://lambda-treasure-hunt.herokuapp.com/",
  headers: { Authorization: `Token ${process.env.REACT_APP_API_KEY}` }
});

export default instance;
