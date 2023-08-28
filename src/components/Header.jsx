"use client";
import { deleteToken, isHaveToken } from "@/app/action";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
export default function Header() {
  const router = useRouter();
  const [HaveToken, setHaveToken] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = isHaveToken();
      setHaveToken(res);
    };
    fetch();
  }, []);
  const logoutAuth = async () => {
    const res = deleteToken();
    if (res) {
      router.push("/auth/signin");
    }
  };
  return (
    <div className="p-4  border-b shadow-sm bg-white sticky top-0 z-30">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="">
          <Link href="/">
            <Image
              src={"/logo_ig.png"}
              width={100}
              height={100}
              alt="logo_ig"
            />
          </Link>
        </div>
        <div className="flex items-center text-base">
          <Link href="/create" className="mr-4">
            <AiOutlinePlusSquare className="text-2xl font-bold hover:text-amber-500 hover:scale-105 " />
          </Link>
          {!HaveToken ? (
            <Link href="/auth/signin">
              <p>Sign in</p>
            </Link>
          ) : (
            <div className="hover:text-amber-500" onClick={logoutAuth}>
              <p>Sign out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
