import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const ImagePreviews = ({ media }) => {
  console.log(media);
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
        {media.map((media) => (
          <div
            key={media.url}
            className='aspect-square relative h-full w-full shadow-sm overflow-hidden'>
            {media.type.includes("image/") ? (
              <>
                <SwiperSlide>
                  <div className='aspect-square relative h-full w-full shadow-sm overflow-hidden'>
                    <Image
                      alt={media.url}
                      src={media.url}
                      fill
                      className='object-contain'
                    />
                  </div>
                </SwiperSlide>
              </>
            ) : null}
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagePreviews;
