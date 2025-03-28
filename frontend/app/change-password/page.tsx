"use client"

import { ChangeEvent, useContext, useState } from "react";
import AuthContext from '@/app/contexts/AuthContext'
import { VerifyToken } from "@/app/services/verifyToken";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
    VerifyToken()

    const router = useRouter()

    const { change } = useContext(AuthContext)

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [loginErrorMsg, setLoginErrorMsg] = useState<string | undefined>(undefined)

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
    }

    const handleRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }

    const passwordCriteria = {
        minLength: (password: string) => password.length >= 8,
        hasUppercase: (password: string) => /[A-Z]/.test(password),
        hasLowercase: (password: string) => /[a-z]/.test(password),
        hasSpecialChar: (password: string) => /[\W_]/.test(password), // Includes special characters
    };

    const possibleErrors = [
        {
            condition: repeatPassword != password,
            message: "Passwords do not match"
        },
        {
            condition: oldPassword == password,
            message: "Your new password is the same as the old one"
        },
        {
            condition: !passwordCriteria.minLength(password),
            message: "Password must be at least 8 characters long.",
        },
        {
            condition: !passwordCriteria.hasUppercase(password),
            message: "Password must contain at least one uppercase letter.",
        },
        {
            condition: !passwordCriteria.hasLowercase(password),
            message: "Password must contain at least one lowercase letter.",
        },
        {
            condition: !passwordCriteria.hasSpecialChar(password),
            message: "Password must contain at least one special character.",
        },
    ]

    const handleSubmit = () => {
        for (const error of possibleErrors) {
            if (error.condition) {
                setLoginErrorMsg(error.message)
                return
            }
        }

        const changeData = {
            oldPassword,
            newPassword: password,
            setErrorMsg: setLoginErrorMsg,
        }

        change(changeData)
    }

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 p-7 rounded-md border-gray-700 border-2">
                <h2 className="pb-4 text-2xl font-bold">Change Password</h2>
                <form action={handleSubmit} method="POST" className="space-y-8">

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="oldPassword" className="block font-medium">
                                Current Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="oldPassword"
                                name="oldPassword"
                                type={showPassword ? "text" : "password"}
                                onChange={handleOldPassword}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-gray-700 "
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block font-medium">
                                New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                onChange={handlePassword}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-gray-700 "
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="repeatPassword" className="block font-medium">
                                Repeat New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="repeatPassword"
                                name="repeatPassword"
                                type={showPassword ? "text" : "password"}
                                onChange={handleRepeatPassword}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-gray-700 "
                            />
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <input type="checkbox" name="showPassword" id="showPassword" onChange={handleShowPassword} className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800 mr-1" />
                        <label htmlFor="showPassword">Show passwords</label>
                    </div>

                    {
                        loginErrorMsg && (
                            <div className="rounded-md bg-red-500 p-3">{loginErrorMsg}</div>
                        )
                    }

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Change Password
                        </button>

                        <button
                            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-2"
                            onClick={() => router.push("/menu")}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
