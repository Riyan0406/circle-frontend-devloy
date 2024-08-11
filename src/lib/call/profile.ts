import { API } from "../api";

export default async function getProfile() {
    const token = localStorage.getItem("token");

    return await API.get("user/profile/getProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function editProfile(props: any) {
    const token = localStorage.getItem("token");

    return await API.put("user/:userId", props, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}