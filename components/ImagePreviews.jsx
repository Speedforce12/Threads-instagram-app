"use client";

import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { X } from "lucide-react";

const ImagePreviews = ({ media, onChange, setMedias }) => {
  const removeMedia = (index) => {
    // Use the functional update approach for setMedias
    setMedias((prevMediaFiles) => prevMediaFiles.filter((_, i) => i !== index));

    // Update the form's media value using onChange
    onChange(media.filter((_, i) => i !== index));
  };

  return (
    <div className='mx-auto mt-3 w-full'>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 40 },
          640: { slidesPerView: 1, spaceBetween: 32 },
          // 1260: { slidesPerView: 3, spaceBetween: 32 },
        }}
        navigation>
        {media.map((media, i) => (
          <div
            key={`${media.url}-${Date.now()}`}
            className='shadow-sm overflow-hidden'>
            {media.type.includes("image/") ? (
              <>
                <SwiperSlide>
                  <div className='relative h-72 w-auto shadow-sm overflow-hidden'>
                    <Image
                      alt={media.url}
                      src={media.url}
                      fill
                      className='object-contain rounded-md h-full w-full'
                    />
                    <div
                      className='absolute md:top-5 md:right-4 top-1/2  rounded-full h-8 w-8 flex items-center justify-center hover:bg-black cursor-pointer bg-black/70'
                      onClick={() => removeMedia(i)}>
                      <X className='text-white h-5 w-5' />
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ) : (
              <>
                <SwiperSlide>
                  <div className='h-72 w-auto shadow-sm overflow-hidden'>
                    <video
                      controls
                      autoPlay
                      muted
                      loop
                      className='rounded-md h-full w-full'>
                      <source src={media.url} type={media.type} />
                      Your browser does not support the video tag.
                    </video>
                    <div
                      className='absolute top-1 right-2 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-700 cursor-pointer bg-gray-800'
                      onClick={() => removeMedia(i)}>
                      <X className='text-white h-5 w-5' />
                    </div>
                  </div>
                </SwiperSlide>
              </>
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagePreviews;
