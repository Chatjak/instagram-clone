import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
export default function Header() {
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
        <input
          type="text"
          placeholder="Type here"
          className="hidden sm:block sm:input sm:input-bordered sm:w-full sm:max-w-xs"
        />
        <div className="flex items-center text-base">
          <Link href="/create" className="mr-4">
            <AiOutlinePlusSquare className="text-2xl font-bold" />
          </Link>
          <Link href="/auth/signin">
            <p>Sign in</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
