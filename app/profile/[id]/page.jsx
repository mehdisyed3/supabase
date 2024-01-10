"use client";

import { useSession,  } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const OtherProfile = ({params}) => {
  const { data: session } = useSession();

  const urlParams = useSearchParams()
  const name = urlParams.get('name')

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);


  return (
    <Profile
      name={name}
      desc=''
      data={posts}
    />
  );
};

export default OtherProfile;