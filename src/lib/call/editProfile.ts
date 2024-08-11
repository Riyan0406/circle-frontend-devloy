import { API } from "../api";

export default async function editProfile(userId: string, props: IEditProfile) {
    const token = localStorage.getItem("token");

    return await API.put(`user/${userId}`, props, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}