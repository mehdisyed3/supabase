"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@app/utils/supabaseClient";


import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();


  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    const { data: {user} } = await supabase.auth.getUser()
    setIsSubmitting(true);
    console.log('>>>> supabse', user)
    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert([
          {
            user_id: user?.id,
            prompt: post.prompt,
            tag: post.tag,
          },
        ]);
  
      if (error) {
        throw error;
      }
      setPost({ prompt: "", tag: "" })
  
      console.log('>>>> Inserted data:', data);
      
      // If you want to redirect after successful insertion
      // router.push("/");
  
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
    finally {
        setIsSubmitting(false);
      }
   
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;