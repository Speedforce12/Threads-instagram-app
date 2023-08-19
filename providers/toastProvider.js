"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Toaster theme='system' richColors />
    </>
  );
};

export default ToastProvider;
