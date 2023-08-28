import React from "react";

export default function loading() {
  return (
    <div className="max-w-3xl mx-auto h-screen">
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
}
