"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Paperclip } from "lucide-react";

const MediaUpload = ({ value, onChange }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const maxImageSize = 5 * 1024 * 1024;
  const maxVideoSize = 512 * 1024 * 1024;

  // const [mounted, setMounted] = useState(false)

  const handleMedia = (e) => {
    
   const { files } = e.target;
    const reader = new FileReader();

    // Loop through the selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith('image/') && file.size > maxImageSize) {
        console.log(`Image ${file.name} exceeds the maximum size limit.`);
        continue; // Skip this file and move to the next
      }

      if (file.type.startsWith('video/') && file.size > maxVideoSize) {
        console.log(`Video ${file.name} exceeds the maximum size limit.`);
        continue; // Skip this file and move to the next
      }

      reader.readAsDataURL(file);

      // Define an event listener for when the reader finishes loading
      reader.onload = () => {
        setMediaFiles((prevMediaFiles) => [...prevMediaFiles, { type: file.type, dataUrl: reader.result }]);
      };
    }

    onChange(mediaFiles)
  };

    const removeMedia = (index) => {
      setMediaFiles((prevMediaFiles) =>
        prevMediaFiles.filter((_, i) => i !== index),
      );
    };

  // useEffect(() => {
  //   setMounted(true);
  // }, [])

  // if (!mounted) {
  //   return null
  // }

  return (
    <div
      htmlFor="media"
      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-800"
    >
      <Paperclip className="h-5 w-5 cursor-pointer text-white  hover:font-bold hover:scale-90 transition-all duration-200 ease-in" />
      <Input
        id="media"
        accept="file"
        className="hidden"
        type="file"
        multiple
        value={value}
        onChange={handleMedia}
      />
    </div>
  );
};

export default MediaUpload;
