"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/useModal";
import ThreadForm from "../createThreads/ThreadForm";
import {  useRef, useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AtSign, Globe2, Users2 } from "lucide-react";
import ImagePreviews from "../ImagePreviews";
import createThreads from "@/actions/createThreads";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MediaUpload from "../MediaUpload";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import { DialogTitle } from "@radix-ui/react-dialog";

const threadSchema = z.object({
  thread: z.string().min(1).max(350),
  media: z.array(z.object({ type: z.string(), url: z.string() })),
  replyStatus: z.string(),
});

const CreateThreadModal = () => {
  const [input, setInput] = useState("");

  const { isOpen, type, onClose, data } = useModalStore();
  const { user } = data;
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

  const isModalOpen = isOpen && type === "create";

  const textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, input);


  const handleInputChange = (e, onChange) => {

    setInput(e.target?.value);
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
    <div className='flex flex-col'>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-black text-white max-w-xl p-2'>
          <DialogHeader>
            <DialogTitle>
              <div className='text-center flex w-full items-center justify-center'>
                New Thread
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className='p-5'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-3'>
                <FormField
                  control={form.control}
                  name='thread'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex flex-col space-y-3 border-b dark:border-gray-100/50 border-gray-400'>
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
                            {/* <Button
                            type='submit'
                            size='sm'
                            disabled={isDisabled || field.value === ""}
                            className='rounded-lg dark:bg-black bg-transparent border dark:border-neutral-500 border-neutral-800 py-2 font-bold dark:text-white text-black'>
                            Post
                          </Button> */}
                          </div>
                          <Textarea
                            ref={textAreaRef}
                            rows={1}
                            className='min-h-[40px] resize-none focus:border-none outline-none border-none bg-transparent p-2 text-base font-medium dark:text-white text-black   focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Start a thread...'
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(e, field.onChange)
                            }
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
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

                <div className='w-96'>
                  <ImagePreviews
                    media={medias}
                    onChange={(media) => form.setValue("media", media)}
                    setMedias={setMedias}
                  />
                </div>
                <DialogFooter className='pt-7'>
                  <div className='flex items-center justify-between  w-full'>
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
                    <Button
                      type='submit'
                      size='sm'
                      disabled={isDisabled || input === ""}
                      className='rounded-lg dark:bg-black bg-transparent border dark:border-neutral-500 border-neutral-800 py-2 font-bold dark:text-white text-black'>
                      Post
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateThreadModal;
