"use client"

import { VerifyToken } from "@/app/services/verifyToken";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { parseCookies } from "nookies";


export default function Menu() {
  VerifyToken()

  const { userName } = parseCookies(null)

  return (
    <div className="container m-auto my-10">
      <h2 className="text-center font-bold text-2xl">Hi, {userName}!</h2>
      <div className="border-2 border-gray-700 rounded-md w-1/3 m-auto mt-5 bg-gray-800">
        <ul className="p-2">
          <Link href="/change-password">
            <li className="p-3 hover:bg-gray-700 rounded-md hover:cursor-pointer flex flex-nowrap items-center justify-between">Change password <FaChevronRight /></li>
          </Link>


          <Link href={""}>
            <li className="p-3 hover:bg-gray-700 rounded-md hover:cursor-pointer flex flex-nowrap items-center justify-between">List all users <FaChevronRight /></li>
          </Link>


          <Link href="/logout">
            <li className="p-3 hover:bg-gray-700 rounded-md hover:cursor-pointer flex flex-nowrap items-center justify-between">Logout <FaChevronRight /></li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
