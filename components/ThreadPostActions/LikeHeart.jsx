import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeHeart = () => {
    return (
      <div className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group'>
        <FaRegHeart className='h-5 w-5 group-hover:fill-rose-500' />
      </div>
    );
};

export default LikeHeart;
