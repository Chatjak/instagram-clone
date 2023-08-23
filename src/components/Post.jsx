import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Post({ id, username, userImg, Img, caption }) {
  return (
    <div className="">
      <div className="">
        <Link href={`/${username}`}>
          <Image src={userImg} width={100} height={100} alt="logo_ig" className="" />
        </Link>
      </div>
    </div>
  );
}
