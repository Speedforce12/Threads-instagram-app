"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AtSign, Globe2, Loader, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { useModalStore } from "@/hooks/useModal";
import createComment from "@/actions/createComment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const replySchema = z.object({
  content: z.string().min(1).max(350),
  replyStatus: z.string(),
});

const ReplyModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [selected, setSelected] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
      replyStatus: "anyone",
    },
  });

  const { thread, currentUser } = data;
  const isModalOpen = isOpen && type === "reply";
  const isSubmitting = form.formState.isSubmitting;

  const handleReplyType = (value) => {
    form.setValue("replyStatus", value);
    setSelected(value);
  };

  async function onSubmit(data) {
    await createComment(data, thread.id);
    form.reset();
    router.refresh();
    onClose();
    // router.push("/");
    toast.success("Post");
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-black text-white'>
        <DialogHeader>
          <DialogDescription>
            <div className='flex flex-col'>
              <div className='flex'>
                <div className='flex items-center flex-col'>
                  <Link
                    href={`/profile/${thread?.creatorId}`}
                    className='relative h-10 w-10'>
                    <Image
                      alt=''
                      src={thread?.creator.image}
                      fill
                      className='object-cover rounded-full'
                    />
                  </Link>
                  <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
                </div>
                <div className='flex flex-col w-full pr-3'>
                  <div>
                    <div className='flex w-full justify-between items-center'>
                      <p className='text-sm text-white'>
                        {thread?.creator.username}
                      </p>
                    </div>
                    <div className='flex flex-col mt-2'>
                      <p className='text-white whitespace-pre-wrap text-sm text-start'>
                        {thread?.thread}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full  mt-3 flex items-center space-x-3'>
                <div className='flex w-full'>
                  <Image
                    alt={currentUser?.username}
                    src={currentUser?.image}
                    width={80}
                    height={80}
                    className='h-12 w-12 border border-gray-300 object-cover rounded-full'
                  />

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='w-full'>
                      <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                rows={5}
                                className='min-h-[40px] resize-none border-none bg-transparent p-2 text-base font-medium text-white   focus-visible:ring-0 focus-visible:ring-offset-0'
                                placeholder={`reply to @${thread.creator.username}`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <DialogFooter className='flex items-center w-full justify-between flex-row'>
                        <div className='flex justify-start w-full'>
                          <DropdownMenu>
                            <DropdownMenuTrigger className='gap-x-8 flex items-center rounded-md hover:bg-neutral-800 px-2 py-1 hover:border hover:border-neutral-700 duration-200 transition-all'>
                              {selected ? (
                                selected
                              ) : (
                                <>
                                  Anyone
                                  <Globe2 className='ml-auto h-5 w-5 text-sky-500' />
                                </>
                              )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-black text-white border border-neutral-600'>
                              <DropdownMenuItem
                                className='focus:bg-neutral-800 focus:text-white cursor-pointer w-full gap-x-8'
                                onClick={() => handleReplyType("anyone")}>
                                Anyone
                                <Globe2 className='ml-auto h-5 w-5 text-sky-500' />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className='bg-neutral-700' />

                              <DropdownMenuItem
                                className='focus:bg-neutral-800 focus:text-white cursor-pointer w-full gap-x-8'
                                onClick={() => handleReplyType("followers")}>
                                Profiles you follow
                                <Users2 className='h-5 w-5 text-sky-500 ml-auto' />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className='bg-neutral-700' />

                              <DropdownMenuItem
                                className='focus:bg-neutral-800 focus:text-white cursor-pointer w-full gap-x-8'
                                onClick={() => handleReplyType("mentioned")}>
                                Mentioned Only
                                <AtSign className='h-5 w-5 text-sky-500 ml-auto' />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <Button
                          disabled={isSubmitting}
                          type='submit'
                          size='sm'
                          className='text-white bg-black border border-neutral-700 disabled:cursor-not-allowed'>
                          {isSubmitting ? (
                            <Loader className='h-5 w-5 animate-spin' />
                          ) : (
                            "Post"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
