"use client";

import { createContext } from "react";
import {
    LoginData,
    AuthContextData,
    ChangeData,
    AuthProviderProps
} from "@/types";
import nookies, { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { getAxiosInstance } from "@/app/services/axios";

// To handle cookies
const ONE_HOUR = 1 * 60 * 60;

const AuthContext = createContext({} as AuthContextData);
export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const axios = getAxiosInstance();

    const login = async ({ email, password, setErrorMsg }: LoginData) => {
        await axios.post("/login/", {
            email,
            password
        }).then(res => {
            const token = res.data.token;
            setCookie(null, "auth_token", token, {
                path: "/",
                maxAge: ONE_HOUR
            });
            router.push("/menu");
        }).catch(error => {
            // Check if the error is in the 400 range, if so
            // display the error message and return
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setErrorMsg("Incorrect email or password");
                console.log("Wrong credentials during login");
                return;
            }

            console.log("Unexpected error during login");
            router.push('/login');
        });
    };

    async function change({ oldPassword, newPassword, setErrorMsg }: ChangeData) {
        // This request includes headers because authentication is required to change the password
        await axios.post("/change-password/", {
            oldPassword,
            newPassword
        })
            .then((response) => {
                if (response) router.push('/menu');
            })
            .catch((error) => {
                // Check if the error is in the 400 range
                if (error.response.status >= 400 && error.response.status < 500) {
                    // Check if "old_password" exists in the response key
                    // If so, it means the old password is incorrect
                    if (error.response.data) {
                        setErrorMsg(error.response.data['msg']);
                        return;
                    }

                    console.log("Unexpected error during password change");
                    return;
                }

                console.log("Critical unexpected error during password change");
            });
    }

    const logout = () => {
        nookies.destroy(undefined, "auth_token");
        router.push("/login");
    };

    return <AuthContext.Provider value={{ login, logout, change }}>
        {children}
    </AuthContext.Provider>;
};
