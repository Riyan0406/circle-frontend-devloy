import { API } from "../api";

export default async function getSuggest() {
    const token = localStorage.getItem("token");

    return await API.get("user/findSuggest", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}