"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CreatePost, getUser } from "../action";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Create() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const InputCaptionRef = useRef();
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        if (!res) {
          redirect("/auth/signin");
        } else {
          const response = await fetch(
            `http://localhost:8080/api/user/userImage/${res._id}`
          );
          if (!response.ok) {
            throw new Error("fetch image user error");
          }
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setUserImage(imageUrl);
        }

        setCurrentUser(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const onSubmitCreate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredCaption = InputCaptionRef.current.value;
    if (selectedFile) {
      const res = await CreatePost(selectedFile, enteredCaption);
      if (res.status === 201) {
        router.push("/");
      }
    } else {
      console.log("No file selected");
    }
    setIsLoading(false);
  };

  function addImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }
  return (
    <form onSubmit={onSubmitCreate} className="max-w-[550px] mx-auto py-8">
      <h1 className="text-center text-xl my-4 font-bold">Create post</h1>
      <div className="flex items-center p-4">
        {currentUser && (
          <Link href={`/${currentUser.username}`}>
            {userImage && (
              <Image
                width={100}
                height={100}
                src={userImage}
                loading="lazy"
                alt="logo_ig"
                className="h-12  w-auto rounded-full object-cover  p-1 mr-3"
                placeholder="blur"
                blurDataURL="/spinner.svg"
              />
            )}
          </Link>
        )}
        <Link href={`/`} className="font-bold flex-1">
          {currentUser && (
            <p className="hover:underline hover:underline-offset-1">
              {currentUser.username}
            </p>
          )}
        </Link>
        {/* <BsThreeDots className="h-5 cursor-pointer" /> */}
      </div>
      <div className="flex justify-center  ">
        <div
          className=" w-[550px] h-auto shadow duration-300 sm:rounded cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {selectedFile ? (
            <Image
              onClick={() => setSelectedFile(null)}
              src={selectedFile}
              alt=""
              width={600}
              height={600}
              className="w-[550px] max-h-[450px] object-cover  sm:rounded"
            />
          ) : (
            <div className="w-full h-[450px] flex items-center justify-center">
              <h1>Select picture</h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center pt-8 flex-col items-center">
        <input
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
          hidden
          onChange={addImageToPost}
          ref={filePickerRef}
          required
        />

        <input
          className="input input-ghost w-full max-w-md mb-8"
          placeholder="Write a caption..."
          ref={InputCaptionRef}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn bg-transparent  rounded-md w-40 text-blue-400 border-blue-400"
        >
          {isLoading ? "Loading..." : "Post"}
        </button>
      </div>
    </form>
  );
}
