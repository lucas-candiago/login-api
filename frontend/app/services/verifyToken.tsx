"use client"

import { parseCookies } from "nookies"
import { useRouter } from "next/navigation"
import { getAxiosInstance } from "./axios"
import { useEffect, useState } from "react"

export const VerifyToken = () => {
    const router = useRouter()
    const axios = getAxiosInstance()
    const [isValid, setIsValid] = useState(true)

    const { 'auth_token': token } = parseCookies(null)

    useEffect(() => {
        if (typeof window === "undefined") return  // Caso não tenha window significa que está sendo renderizado no server, logo não deve ser verificado o token (erro de eslint)

        if (!token) {
            router.push("/login")
            setIsValid(false)
        }

        axios.get("/check").then(res => {
            if (res.data.status === 200) {
                setIsValid(true)
            }
        }).catch(e => {
            console.error("Login expirado!", e);
            router.push("/login")
        })
    }, [token])



    return isValid
}