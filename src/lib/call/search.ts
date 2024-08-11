import { API } from "../api";

export default async function search(condition: string) {
    const token = localStorage.getItem("token");

    return await API.post("user/friend/search", { condition }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}