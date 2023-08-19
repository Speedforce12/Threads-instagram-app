"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const MediaUpload = ({ value, onChange,setMedias }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mounted, setMounted] = useState(false);

  const maxImageSize = 5 * 1024 * 1024;
  const maxVideoSize = 512 * 1024 * 1024;

 const handleMedia = async (e) => {
   e.preventDefault();
   const { files } = e.target;

   if (files.length > 4) {
     toast.error("You can only upload 4 files at a time.");
     return;
   }

   // Use Promise.all to read and process files asynchronously
   const processedMedia = await Promise.all(
     Array.from(files).map(async (file) => {
       // Create a Promise to handle file reading
       return new Promise((resolve, reject) => {
         const reader = new FileReader();

         if (file.type.startsWith("image/") && file.size > maxImageSize) {
           toast.error(`Image ${file.name} exceeds the maximum size limit.`);
           resolve(null); // Resolve with null to skip this file
           return;
         }

         if (file.type.startsWith("video/") && file.size > maxVideoSize) {
           toast.error(`Video ${file.name} exceeds the maximum size limit.`);
           resolve(null); // Resolve with null to skip this file
           return;
         }

         // Define an event listener for when the reader finishes loading
         reader.onload = () => {
           resolve({ type: file.type, url: reader.result });
         };

         // Start reading the file
         reader.readAsDataURL(file);
       });
     })
   );

   // Filter out null values (skipped files) and update the parent component
   const validMedia = processedMedia.filter((media) => media !== null);
   onChange(validMedia);
   setMedias(validMedia);
 };

  const removeMedia = (index) => {
    setMediaFiles((prevMediaFiles) =>
      prevMediaFiles.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='w-full '>
      <label
        htmlFor='media'
        className='flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-800'>
        <Paperclip className='h-5 w-5 cursor-pointer text-white hover:font-bold hover:scale-90 transition-all duration-200 ease-in' />
        <Input
          id='media'
          accept='image/*, video/*'
          type='file'
          className='hidden'
          multiple
          onChange={handleMedia}
        />
      </label>
    </div>
  );
};

export default MediaUpload;
