"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useState } from "react";

const onboardingSchema = z.object({
  username: z.string().min(1).max(50),
  bio: z.string().min(1).max(350),
  image: z.string(),
});

const OnboardingPage = () => {
  const { user } = useUser();
  const [preview, setPreview] = useState("")

  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: user?.username || "",
      bio: "",
      image: "",
    },
  });

  const isDisabled = form.formState.isSubmitting;

  const handleImage = (e, onChange) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
      setPreview(reader.result)
    };

    reader.readAsDataURL(file);
  };

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className='flex flex-col items-center  max-w-md w-full px-5 md:px-0'>
      <div className='flex items-start space-y-0.5 justify-start w-full mb-6  flex-col'>
        <h1 className='font-semibold md:text-2xl text-xl'>
          {user?.fullName} / Onboarding
        </h1>
        <p
          className='text-xs italic font-light
        '>
          Personalize your account for the world to know who you are
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-full'>
          <div className='flex items-center justify-between gap-x-2'>
            <div className='relative h-28 w-28 rounded-full'>
              <Image
                src={preview || user?.imageUrl}
                alt={user?.fullName}
                fill
                className='object-contain'
              />

              <div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 w-10 rounded-full flex items-center justify-center  h-10'>
                <Camera
                  htmlFor='avatar'
                  className='hover:scale-110 cursor-pointer duration-200 transition-all'
                  onClick={() => {
                    const fileInput = document.getElementById("avatar");
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      id='avatar'
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='cool kid'
                    className='text-black'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder='Tell us a little bit about yourself'
                    className='resize-none text-black'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              className='bg-white text-black hover:bg-gray-200'
              disabled={isDisabled}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingPage;
