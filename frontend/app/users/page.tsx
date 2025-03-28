"use client"

import { VerifyToken } from "@/app/services/verifyToken";
import { getAxiosInstance } from "../services/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

interface User {
    id: string
    name: string
    email: string
}

export default function Menu() {
    VerifyToken()
    const axios = getAxiosInstance()
    const router = useRouter()

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/all-users").then(res => {
            setUsers(res.data.users);
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-1/2 m-auto my-10">
            {loading && (
                <div className="flex justify-center items-center">
                    <p className="ml-4 text-gray-900 text-white">Loading data...</p>
                    <FaSpinner className="animate-spin text-3xl text-gray-900 text-white ml-2" />
                </div>
            )}

            {!loading && (
                <>
                    <h2 className="text-center font-bold text-2xl">Users</h2>
                    <div className="border-2 border-gray-700 rounded-md m-auto mt-5 bg-gray-800">
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-700 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {users.map((user, key) => (
                                        <tr className="border-t hover:bg-gray-100" key={key}>
                                            <td className="px-4 py-2">{user.id}</td>
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button
                        className="flex w-1/7 mt-2 justify-center rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => router.back()}
                    >
                        Return
                    </button>
                </>
            )}
        </div>
    );
}
