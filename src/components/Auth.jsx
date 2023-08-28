"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { setTokenToCookie } from "../app/action";
import { useRouter } from "next/navigation";
export default function Auth({ state }) {
  const [IsError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let data = { username: enteredUsername, password: enteredPassword };
    let api = `http://localhost:8080/api/user/`;
    if (state === "signin") {
      api = `http://localhost:8080/api/user/signin`;
    } else {
      api = `http://localhost:8080/api/user/signup`;
    }
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setIsError(true);
    } else {
      const result = await response.json();
      setTokenToCookie(result.token);
      router.push("/");
    }
    setIsLoading(false);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <form
        className="flex flex-col items-center space-x-7 mt-20"
        onSubmit={onSubmitHandler}
      >
        <Image
          width={300}
          height={300}
          src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
          alt="logo_instagram"
          className="w-32 object-cover"
        />
        <p className="text-sm italic my-10 text-center">
          This app is create for portfolio chatjak
        </p>
        {state !== "signin" && (
          <input
            type="email"
            placeholder="Email"
            className="border w-2/3 sm:w-1/2 p-4 focus:outline-none mb-4 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Username"
          ref={usernameInputRef}
          className="border w-2/3 sm:w-1/2 p-4 focus:outline-none mb-4 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
          className="border w-2/3 sm:w-1/2 p-4 focus:outline-none mb-4 rounded-lg"
        />
        {state !== "signin" && (
          <input
            type="password"
            placeholder="Confirm password"
            className="border w-2/3 sm:w-1/2 p-4 focus:outline-none mb-4 rounded-lg"
          />
        )}
        <button
          type="submit"
          className={`btn ${
            isLoading
              ? "btn-disabled"
              : state === "signin"
              ? "btn-info"
              : "btn-success"
          } text-white w-2/3 sm:w-1/2`}
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : state === "signin"
            ? "Sign in"
            : "Sign up"}
        </button>
        {state === "signin" ? (
          <p className="mt-4 text-sm">
            <span className="">{`Don't have an account? `}</span>
            <span className="text-info font-semibold">
              <Link href={"/auth/signup"}>Sign up</Link>
            </span>
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
