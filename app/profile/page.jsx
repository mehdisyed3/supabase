"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@app/utils/supabaseClient";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const [myPosts, setMyPosts] = useState([]);
  const [userInfo, setUserInfo]= useState([])

  useEffect(()=>{
    const user = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    user && setUserInfo(user)
    }

    user()
  },[])

  console.log('>>> userINFO', userInfo)
  useEffect(() => {
    const fetchPosts = async () => {
      console.log('>>> fetch post')
      if (userInfo.id) {
  
        try {
          const { data, error } = await supabase
            .from('prompts')
            .select('*')
          .eq('user_id', userInfo?.id);

          console.log('>>> datass', data)
  
          if (error) {
            console.error('Error fetching prompts:', error.message);
          } else {
            setMyPosts(data)
           
          }
        } catch (e) {
          console.error('Error:', e.message);
        }
      }

    };

    fetchPosts();
  }, [userInfo]);



  const handleEdit =  (post) => {

    router.push(`/update-prompt?id=${post.id}`);
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

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
// changes needed on this file... to fetch seession and provide data to the Profile component
// need to see whyt sig in button doesn;t change withoout refresh
console.log('>>> MY PIST',myPosts)
  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;