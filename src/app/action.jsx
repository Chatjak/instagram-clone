"use server";
import { cookies } from "next/headers";

export async function setTokenToCookie(data) {
  cookies().set({
    name: "token",
    value: data,
    httpOnly: true,
    path: "/",
    secure: true,
  });
}
export const getToken = async () => {
  const token = cookies().get("token");
  return token.value;
};

export const deleteToken = async () => {
  cookies().delete("token");
  return true;
};
export const isHaveToken = () => {
  const token = cookies().get("token");
  if (token !== undefined) {
    return true;
  } else {
    return false;
  }
};

export async function getUser() {
  const token = await cookies().get("token");
  if (!token) {
    return false;
  }
  const response = await fetch(`http://localhost:8080/api/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return false;
  }
  const currentUser = await response.json();
  return currentUser;
}

export async function PostComment(postId, data) {
  const token = cookies().get("token");
  try {
    const response = await fetch(
      `http://localhost:8080/api/comment/${postId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("error comment");
    }
    const comment = await response.json();
    return comment;
  } catch (error) {
    throw new Error(error);
  }
}

export const CreatePost = async (selectedFile, enteredCaption) => {
  const token = cookies().get("token");
  try {
    const formData = new FormData();
    formData.append("caption", enteredCaption);
    const dataUrlParts = selectedFile.split(",");
    const mimeType = dataUrlParts[0].split(":")[1].split(";")[0];
    const imageData = atob(dataUrlParts[1]);
    const buffer = new Uint8Array(imageData.length);

    for (let i = 0; i < imageData.length; i++) {
      buffer[i] = imageData.charCodeAt(i);
    }

    const imageBlob = new Blob([buffer], { type: mimeType });

    formData.append("post_img", imageBlob);

    const response = await fetch(`http://localhost:8080/api/post/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    const responseData = {
      status: response.status,
      statusText: response.statusText,
    };

    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLike = async (post_id) => {
  const token = cookies().get("token");
  try {
    const response = await fetch(`http://localhost:8080/api/like/${post_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!response.ok) {
      throw new Error("fetch like error");
    }
    const like = await response.json();
    return like;
  } catch (error) {
    throw new Error("fetch like error");
  }
};

export const HashLiked = async (post_id) => {
  const token = cookies().get("token");
  try {
    const response = await fetch(`http://localhost:8080/api/like/${post_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!response.ok) {
      throw new Error("fetch like error");
    }
    return true;
  } catch (error) {
    throw new Error("fetch like error");
  }
};

export const Unlike = async (post_id) => {
  const token = cookies().get("token");
  try {
    const response = await fetch(`http://localhost:8080/api/like/${post_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!response.ok) {
      throw new Error("fetch like error");
    }
    return false;
  } catch (error) {
    throw new Error("fetch like error");
  }
};

export const getTotalLike = async (post_id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/like/${post_id}/total`
    );
    if (!response.ok) {
      throw new Error("fetch total like error");
    }
    const total = await response.json();
    return total;
  } catch (error) {
    throw new Error("fetch like error");
  }
};
