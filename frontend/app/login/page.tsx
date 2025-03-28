"use client";

import { ChangeEvent, useContext, useState } from "react";
import AuthContext from '@/app/contexts/AuthContext';
import Link from "next/link";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginErrorMsg, setLoginErrorMsg] = useState<string | undefined>(undefined);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const loginData = {
      email: email,
      password: password,
      setErrorMsg: setLoginErrorMsg,
    };

    login(loginData);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="w-full">
        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight">
          Login System
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 p-7 rounded-md border-gray-700 border-2">
        <h2 className="pb-4 text-2xl font-bold">Sign in</h2>
        <form action={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleEmail}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-gray-700"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handlePassword}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 text-gray-700 "
              />
            </div>
            <div className="pt-5 flex items-center ">
              <input type="checkbox" name="showPassword" id="showPassword" onChange={handleShowPassword} className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800 mr-1" />
              <label htmlFor="showPassword">Show password</label>
            </div>
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
              Sign in
            </button>
            <Link href="register" className="flex w-full mt-3 justify-center rounded-md bg-cyan-500 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
