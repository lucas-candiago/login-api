"use client"

import { createContext } from "react";
import {
    LoginData,
    AuthContextData,
    ChangeData,
    AuthProviderProps
} from "@/types"
import nookies, { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { getAxiosInstance } from "@/app/services/axios";

// Pra lidar com cookies
const ONE_HOUR = 1 * 60 * 60

const AuthContext = createContext({} as AuthContextData)
export default AuthContext

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const axios = getAxiosInstance()

    const login = async ({ email, password, setErrorMsg }: LoginData) => {
        await axios.post("/login/", {
            email,
            password
        }).then(res => {
            const token = res.data.token
            setCookie(null, "auth_token", token, {
                path: "/",
                maxAge: ONE_HOUR
            })
            router.push("/menu")
        }).catch(error => {
            // Confiro se o erro ta no range 400, caso sim
            // escrevo a mensagem de erro e return
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setErrorMsg("Email ou senha incorretos")
                console.log("Credenciais erradas no login")
                return
            }

            console.log("Erro inesperado no login")
            router.push('/login')
        })
    }

    async function change({ oldPassword, newPassword, setErrorMsg }: ChangeData) {
        // Esse aqui passa COM headers, pq precisa estar autenticado pra mudar a senha
        await axios.post("/change-password/", {
            oldPassword,
            newPassword
        })
            .then((response) => {
                if (response) router.push('/menu')
            })
            .catch((error) => {
                // Confiro se o erro é no range 400
                if (error.response.status >= 400 && error.response.status < 500) {
                    // Confiro se tem "old_password" na key
                    // Caso sim, é erro de senha antiga errada
                    if (error.response.data) {
                        setErrorMsg(error.response.data['msg'])
                        return
                    }

                    console.log("Erro inesperado no change")
                    return
                }

                console.log("Erro grave inesperado no change")
            })
    }

    const logout = () => {
        nookies.destroy(undefined, "auth_token");
        router.push("/login")
    }

    return <AuthContext.Provider value={{ login, logout, change }}>
        {children}
    </AuthContext.Provider>;
}