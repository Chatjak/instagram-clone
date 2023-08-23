import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";

export default function Feed() {
  return (
    <main className="max-w-5xl mx-auto">
      <section className="">
        <Stories />
        <Posts />
      </section>
    </main>
  );
}
