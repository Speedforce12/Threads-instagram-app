import ThreadForm from "@/components/createThreads/ThreadForm";
import ThreadPost from "@/components/threadCard/ThreadPost";

export default function Home() {
  return (
    <div className='flex flex-col flex-1 mt-14 w-full px-4'>
      <div className='border border-gray-100/20 p-3'>
        <ThreadForm />
      </div>

      <div className='my-5 border-t border-b border-white/30'>
        <ThreadPost />
      </div>
      <div className='my-5 border-t border-b border-white/30'>
        <ThreadPost />
      </div>
      <div className='my-5 border-t border-b border-white/30'>
        <ThreadPost />
      </div>
    </div>
  );
}
