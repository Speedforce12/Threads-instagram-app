"use client";

import CreateThreadModal from "@/components/modal/CreateThreadModal";
import ReplyModal from "@/components/modal/ReplyModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateThreadModal />
      <ReplyModal />
    </>
  );
};

export default ModalProvider;
