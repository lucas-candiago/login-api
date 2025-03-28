"use client"

import { useEffect, useContext } from "react"
import AuthContext from "@/app/contexts/AuthContext"

const Logout = () => {
    const { logout } = useContext(AuthContext)

    useEffect(() => {
        logout()
    })
    return (
        <></>
    )
}

export default Logout