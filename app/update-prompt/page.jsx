"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { supabase } from "@app/utils/supabaseClient";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");


  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {

      const { data, error } = await supabase
          .from('prompts')
          .select('*')
          .eq('id', promptId)
          

      setPost({
        prompt: data[0].prompt,
        tag: data[0].tag,
      });
    };

    if (promptId){

       getPromptDetails()};
  }, [promptId]);

console.log('>>> post UPDATE', post)

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {

        const { data, error } = await supabase
          .from('prompts')
          .update({ prompt: post.prompt, tag: post.tag })
          .eq('id', promptId);

          router.push('/profile')
      
        if (error) {
          throw new Error(error.message);
        }
      
        return data;

      // const response = await fetch(`/api/prompt/${promptId}`, {
      //   method: "PATCH",
      //   body: JSON.stringify({
      //     prompt: post.prompt,
      //     tag: post.tag,
      //   }),
      // });

      // if (response.ok) {
      //   router.push("/");
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;