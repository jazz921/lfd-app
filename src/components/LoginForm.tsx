"use client"

import React from "react";
import BoxContainer from "./BoxContainer";
import Button from "./Button";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*
    TODO:  Do Correct Authentication
    */
    router.push("/admin/home")
  }

  return (
    <div className="flex justify-center items-center mt-24">
      <BoxContainer>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center px-6 py-10 gap-y-9 w-[400px]">
            <h2 className="font-avenir-regular text-xl">Admin Login</h2>
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="w-full text-sm font-medium font-avenir-regular mb-1">Username</label>
              <input type="text" name="username" className="border border-light-grey outline-light-blue pr-9 pl-3 py-2" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="w-full text-sm font-medium font-avenir-regular mb-1">Password</label>
              <input type="password" name="password" className="border border-light-grey outline-light-blue pr-9 pl-3 py-2" />
            </div>
            <Button variant="outlined" text="Login" type="submit" className="px-4" />
          </div>
        </form>
      </BoxContainer>
    </div>
  );
};

export default LoginForm;
