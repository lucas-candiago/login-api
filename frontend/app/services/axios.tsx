import axios from "axios";
import { parseCookies } from "nookies";

export function getAxiosInstance() {

    // Aqui tem que usar uma variavel do Next, pq é publica e pode ser usada no frontend e backend.
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