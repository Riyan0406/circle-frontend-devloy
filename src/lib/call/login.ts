import { API } from "../api";

export interface ILoginForm {
    condition: string;
    password: string;
}

export default async function login(body: ILoginForm) {
    return await API.post("login", body);
}