import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const ImagePreviews = ({ media }) => {
  return (
    <div className='mx-auto container mt-3 sm:mt-0'>
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
            key={i}
            className='aspect-square relative h-full w-full shadow-sm overflow-hidden'>
            {media.type.includes("image/") ? (
              <>
                <SwiperSlide>
                  <div className='aspect-square relative h-full w-full shadow-sm overflow-hidden'>
                    <Image
                      alt={media.url}
                      src={media.url}
                      fill
                      className='object-contain rounded-md'
                    />
                  </div>
                </SwiperSlide>
              </>
            ) : (
              <>
                <SwiperSlide>
                  <div className='aspect-square relative h-full w-full shadow-sm overflow-hidden'>
                    <video
                      controls
                      autoPlay
                      muted
                      loop
                      className='rounded-md h-full w-full'>
                      <source src={media.url} type={media.type} />
                      Your browser does not support the video tag.
                    </video>
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
