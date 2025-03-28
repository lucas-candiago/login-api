import axios from "axios";
import { parseCookies } from "nookies";

// function to create a axios instance with the auth token
export function getAxiosInstance() {
    const baseURL = process.env.NEXT_PUBLIC_CLIENT_API_URL

    const instance = axios.create({
        baseURL: baseURL
    });

    const { 'auth_token': token } = parseCookies(null)

    if (token) {
        instance.defaults.headers.common["x-auth-token"] = token;
    }

    return instance;
}