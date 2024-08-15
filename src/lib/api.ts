import axios from "axios";

export const API = axios.create({
    baseURL: "https://circle-backend-three.vercel.app/"
});

export const setAuthToken = (token?: string) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};