"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // STATE MANAGEMENT :
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPersonalPrompts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      console.log("hello");
      const data = await response.json();

      if (Object.keys(data).length === 0) {
        throw new Error("Empty JSON response");
      }

      setPosts(data);
    };

    if (session?.user.id) fetchPersonalPrompts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((post) => post._id !== post._id);

        setPosts(filteredPosts);

        return true;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personlized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
