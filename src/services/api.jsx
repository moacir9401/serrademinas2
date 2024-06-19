import axios from "axios";

const api = axios.create({
    baseURL: "https://serra-minas-dois-d856f3dd44e6.herokuapp.com/api/"
});

export default api;