"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/useModal";

const ShareThreadModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "share";

    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

};

export default ShareThreadModal;
