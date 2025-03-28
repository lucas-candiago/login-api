// File for storing types
import { ReactNode } from "react"

export interface LoginData {
    email: string
    password: string
    setErrorMsg: (msg: string | undefined) => void
}

export interface RegisterData {
    name: string
    email: string
    password: string
    setErrorMsg: (msg: string | undefined) => void
}

export interface ChangeData {
    oldPassword: string
    newPassword: string
    setErrorMsg: (msg: string | undefined) => void
}


export interface AuthContextData {
    login: (data: LoginData) => Promise<void>
    logout: () => void
    change: (data: ChangeData) => Promise<void>
    register: (data: RegisterData) => Promise<void>
}

export interface AuthProviderProps {
    children: ReactNode;
}