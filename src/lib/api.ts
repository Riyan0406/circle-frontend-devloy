import axios from "axios";

export const API = axios.create({
    baseURL: "https://circle-backend-devloy-pjw9.vercel.app/"
});

export const setAuthToken = (token?: string) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};