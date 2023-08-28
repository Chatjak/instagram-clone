import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";

export default async function Feed({ currentUser }) {
  const response = await fetch("http://localhost:8080/api/post/getAll");
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const posts = await response.json();

  return (
    <main className="max-w-5xl mx-auto">
      <section className="">
        <Stories />
        <Posts currentUser={currentUser} posts={posts} />
      </section>
    </main>
  );
}
