import { API } from "../api";

export default async function getThreads() {
    return await API.get("threads");
}