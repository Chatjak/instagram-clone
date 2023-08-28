"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import {
  HashLiked,
  PostComment,
  Unlike,
  getLike,
  getToken,
  getTotalLike,
  getUser,
} from "@/app/action";

export default function Post({ id, username, user_id, caption, currentUser }) {
  const [userImage, setUserImage] = useState(null);
  const [hasLiked, setIsHashLiked] = useState(null);
  const [imgComment, setImgComment] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [TotalLikes, setTotalLikes] = useState(0);
  const commentInputRef = useRef();
  const [comments, setComments] = useState([]);
  const getUserImageToComment = async (cu_id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/userImage/${cu_id}`
      );
      if (!response.ok) {
        throw new Error("fetch image user error");
      }
      const imageBlob = await response.blob();
      return imageBlob;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchUserImage() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/userImage/${user_id}`
        );
        if (!response.ok) {
          throw new Error("fetch image user error");
        }
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setUserImage(imageUrl);
        const token = await getToken();
        const res = await fetch(`http://localhost:8080/api/user/me/userImage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("fetch image current user");
        }
        const currentBlob = await res.blob();
        const currentURL = URL.createObjectURL(currentBlob);
        setImgComment(currentURL);
      } catch (error) {
        throw new Error(error);
      }
    }
    async function fetchPostImage() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/post/${id}/image`
        );
        if (!response.ok) {
          throw new Error("fetch image post error");
        }
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setPostImage(imageUrl);
      } catch (error) {
        throw new Error(error);
      }
    }
    async function fetchComment() {
      try {
        const response = await fetch(`http://localhost:8080/api/comment/${id}`);
        if (!response.ok) {
          throw new Error("fetch image user error");
        }
        const result = await response.json();
        const ConvertImg = await Promise.all(
          result.map(async (comments) => {
            const user = await comments.user_id;
            const userImageBlob = await getUserImageToComment(user._id);
            const userImageUrl = URL.createObjectURL(userImageBlob);

            return {
              ...comments,
              userImage: userImageUrl,
            };
          })
        );
        setComments(ConvertImg);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchUserImage();
    fetchPostImage();
    fetchComment();
    // Return a cleanup function to revoke the Blob URL when the component unmounts
    return () => {
      if (userImage) {
        URL.revokeObjectURL(userImage);
      }
      if (postImage) {
        URL.revokeObjectURL(postImage);
      }
    };
  }, [id]);
  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await getLike(id);
        if (!res) {
          setIsHashLiked(false);
        } else {
          setIsHashLiked(true);
        }
        const response = await getTotalLike(id);
        if (response) {
          setTotalLikes(response);
        }
      } catch (error) {
        console.log("fetch like something went wrong");
      }
    };
    fetchLike();
  }, []);
  const onClickUnLike = async () => {
    const result = await Unlike(id);
    if (!result) {
      setIsHashLiked(result);
      if (TotalLikes > 0) {
        setTotalLikes((total) => total - 1);
      }
    }
  };
  const onClickHashLiked = async () => {
    const result = await HashLiked(id);
    if (result) {
      setIsHashLiked(result);
      setTotalLikes((total) => total + 1);
    }
  };
  const onSubmitComment = async (event) => {
    event.preventDefault();
    const enteredComment = commentInputRef.current.value;
    const data = { comment: enteredComment };
    const result = await PostComment(id, data);

    setComments((prevComments) => [
      { ...result, userImage: imgComment },
      ...prevComments,
    ]);
    commentInputRef.current.value = "";
  };
  return (
    <div className="max-w-xl mx-auto my-4">
      {/* ... */}
      <div className="">
        <div className="flex items-center p-4">
          <div>
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
          </div>
          <div className="font-bold flex-1">
            <p className="hover:underline hover:underline-offset-1">
              {username}
            </p>
          </div>
          <BsThreeDots className="h-5 cursor-pointer" />
        </div>
        {postImage && (
          <Image
            src={postImage}
            width={600}
            height={600}
            placeholder="blur"
            blurDataURL="/spinner.svg"
            loading="lazy"
            alt={`image by ${username}`}
            className="object-cover w-full max-h-128  sm:rounded"
          />
        )}
      </div>
      <div className="flex justify-between px-4 pt-4 font-bold items-center">
        <div className="flex space-x-4 text-3xl ">
          {hasLiked ? (
            <AiFillHeart
              className="text-red-400 cursor-pointer active:scale-50 duration-500"
              onClick={onClickUnLike}
            />
          ) : (
            <AiOutlineHeart
              className="cursor-pointer active:scale-50 duration-500"
              onClick={onClickHashLiked}
            />
          )}
          <AiOutlineMessage className="cursor-pointer active:scale-50 duration-500" />
        </div>
        <BsBookmark className="text-2xl cursor-pointer active:scale-50 duration-500" />
      </div>
      <div className="p-4 ">
        {TotalLikes ? (
          <p className="font-bold mb-1">{TotalLikes} likes</p>
        ) : (
          <p className="font-bold mb-1">0 likes</p>
        )}
        <p className="line-clamp-2">
          <span className="font-bold mr-2 ">{username}</span>
          <span>{caption}</span>
        </p>
      </div>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll no-scrollbar">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2" key={comment._id}>
              <Image
                width={100}
                height={100}
                src={comment.userImage}
                className="h-7 w-7 rounded-full object-cover"
                alt={`img ${comment.username}`}
              />
              <p className="font-semibold">{comment.user_id.username}</p>
              <p className="flex-1 truncate">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
      {currentUser && (
        <form
          className="flex items-center px-4 py-8"
          onSubmit={onSubmitComment}
        >
          <BsEmojiSmile className="text-2xl mr-2" />
          <input
            type="text"
            className="border-none flex-1 focus:ring-0 focus:outline-none"
            placeholder="Enter your comment"
            ref={commentInputRef}
          />
          <button
            type="submit"
            className="text-blue-400 font-bold disable:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
