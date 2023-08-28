"use client";

import ReplyModal from "@/components/modal/ReplyModal";
import ShareThreadModal from "@/components/modal/ShareThreadModal";
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
      <ReplyModal />
      <ShareThreadModal />
    </>
  );
};

export default ModalProvider;
