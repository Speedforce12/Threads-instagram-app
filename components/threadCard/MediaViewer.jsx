"use client"

import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const MediaViewer = ({ media }) => {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 35 },
        }}
        navigation>
        { media.map((media, i) => (
          <div
            key={`${media.url}-${Date.now()}`}
          
            >
            {media.type.includes("image") ? (
              <>
                <SwiperSlide>
                  <div className=' shadow-sm '>
                    <Image
                      alt={media.url}
                      src={media.url}
                      width={500}
                      height={500}
                      className='object-contain w-full rounded-md'
                    />
                  </div>
                </SwiperSlide>
              </>
            ) : (
              <div>
                <SwiperSlide>
                  <div className='aspect-square relative w-full shadow-sm overflow-hidden'>
                    <video
                      controls
                      autoPlay
                      muted
                      loop
                      className='rounded-md h-full w-full'>
                      <source src={media.url} type={media.type + "/mp4"} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </SwiperSlide>
              </div>
            )}
          </div>
        ))}
      </Swiper>
    </>
  );
};
export default MediaViewer;
