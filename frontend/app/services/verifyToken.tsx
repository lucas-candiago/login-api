"use client";

import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { getAxiosInstance } from "./axios";
import { useEffect, useState } from "react";

export const VerifyToken = () => {
    const router = useRouter();
    const axios = getAxiosInstance();
    const [isValid, setIsValid] = useState(true);

    const { 'auth_token': token } = parseCookies(null);

    useEffect(() => {
        if (typeof window === "undefined") return;  // to avoid verification during build

        if (!token) {
            router.push("/login");
            setIsValid(false);
        }

        axios.get("/check").then(res => {
            if (res.data.status === 200) {
                setIsValid(true);
            }
        }).catch(e => {
            console.error("Session expired!", e);
            router.push("/login");
        });
    }, [token]);

    return isValid;
}
