"use client";

import { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MediaUpload from "../mediaUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AtSign, Globe2, Users2 } from "lucide-react";
import ImagePreviews from "../ImagePreviews";
import { useUser } from "@clerk/nextjs";
import createThreads from "@/actions/createThreads";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const threadSchema = z.object({
  thread: z.string().min(1).max(350),
  media: z.array(z.object({ type: z.string(), url: z.string() })),
  replyStatus: z.string(),
});

const ThreadForm = ({ user }) => {
  const [input, setInput] = useState("");
  const textbox = useRef(null);
  const [medias, setMedias] = useState([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: "",
      media: [],
      replyStatus: "anyone",
    },
  });

  const isDisabled = form.formState.isSubmitting;

  const adjustHeight = () => {
    textbox.current.style.height = "auto";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  };

  useEffect(adjustHeight, [input]);

  const handleInputChange = (e, onChange) => {
    adjustHeight();

    setInput(e.target.value);
    onChange(e.target.value);
  };

  async function onSubmit(data) {
    console.log(data);
    await createThreads(data);
    form.reset();
    setMedias([]);
    router.push("/");
    router.refresh();
    toast.success("your post was added");
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
                <div className='flex flex-col space-y-3 border-b border-gray-100/50'>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='h-10 w-10 relative'>
                        <Image
                          alt='ovone'
                          src={user?.image || "/avatar.png"}
                          fill
                          className=''
                        />
                      </div>
                      <p className='text-white text-sm font-medium'>
                        {user.username}
                      </p>
                    </div>
                    <Button
                      type='submit'
                      size='sm'
                      disabled={isDisabled || field.value === ""}
                      className='rounded-lg bg-black border border-neutral-500 py-2 font-bold text-white'>
                      Post
                    </Button>
                  </div>
                  <Textarea
                    ref={textbox}
                    rows={1}
                    className='min-h-[40px] resize-none border-none bg-transparent p-2 text-base font-medium text-white   focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Start a thread...'
                    value={field.value}
                    onChange={(e) => handleInputChange(e, field.onChange)}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between flex-1'>
          <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MediaUpload
                    value={field.value}
                    onChange={(media) => form.setValue("media", media)}
                    setMedias={setMedias}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='replyStatus'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-7 gap-1 border-none   bg-transparent text-white ring-offset-gray-100/20 hover:bg-neutral-900  focus:ring-ring focus:ring-offset-0'>
                      <SelectValue placeholder='Anyone can reply' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-black text-white'>
                    <SelectItem
                      value='anyone'
                      className='cursor-pointer px-6  font-medium focus:bg-neutral-800  focus:text-white'>
                      <div className='flex w-40 items-center justify-between'>
                        Anyone
                        <Globe2 className='ml-auto h-5 w-5 text-sky-500' />
                      </div>
                    </SelectItem>
                    <SelectItem
                      value='followers'
                      className='cursor-pointer px-6 font-medium focus:bg-neutral-800  focus:text-white'>
                      <div className='flex w-40 items-center justify-between '>
                        Profiles you follow
                        <Users2 className='h-5 w-5 text-sky-500' />
                      </div>
                    </SelectItem>
                    <SelectItem
                      value='mentioned'
                      className='cursor-pointer px-6 font-medium focus:bg-neutral-800  focus:text-white'>
                      <div className='flex w-40 items-center justify-between'>
                        Mentioned Only
                        <AtSign className='h-5 w-5 text-sky-500' />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <ImagePreviews
        media={medias}
        onChange={(media) => form.setValue("media", media)}
        setMedias={setMedias}
      />
    </Form>
  );
};

export default ThreadForm;
