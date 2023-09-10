"use client";

import { useRef, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useModalStore } from "@/hooks/useModal";

const threadSchema = z.object({
  thread: z.string().min(1).max(350),
  media: z.array(z.object({ type: z.string(), url: z.string() })),
  replyStatus: z.string(),
});

const ThreadForm = ({ user }) => {
  const {onOpen} = useModalStore()

  const form = useForm({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: "",
      media: [],
      replyStatus: "anyone",
    },
  });

  async function onSubmit(data) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex flex-col space-y-1 border-b dark:border-gray-100/50 border-gray-400'>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <div className='h-10 w-10 relative'>
                        <Image
                          alt='ovone'
                          src={user?.image || "/avatar.png"}
                          fill
                          className='rounded-full'
                        />
                      </div>
                      <p className='dark:text-white text-sm font-medium text-black'>
                        {user.username}
                      </p>
                    </div>
                    <Button
                      disabled
                      type='submit'
                      size='sm'
                      className='rounded-lg dark:bg-black bg-transparent border disabled:cursor-not-allowed dark:border-neutral-500 border-neutral-800 py-2 font-bold dark:text-white text-black'>
                      Post
                    </Button>
                  </div>
                  <Textarea
                    rows={1}
                    onClick={()=> onOpen("create", {user})}
                    readOnly
                    className='min-h-[20px] resize-none border-none bg-transparent p-0.5 text-base font-medium dark:text-white text-black   focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Start a thread...'
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ThreadForm;
