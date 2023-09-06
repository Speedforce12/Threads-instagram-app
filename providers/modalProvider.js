"use client";

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
      <ReplyModal />
    </>
  );
};

export default ModalProvider;
