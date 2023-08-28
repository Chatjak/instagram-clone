import React from "react";
import Post from "./Post";
export default async function Posts({ currentUser, posts }) {
  return (
    <div>
      {posts.map((data) => (
        <Post
          key={data._id}
          id={data._id}
          user_id={data.user_id._id}
          username={data.user_id.username}
          caption={data.caption}
          currentUser={currentUser._id}
        />
      ))}
    </div>
  );
}
