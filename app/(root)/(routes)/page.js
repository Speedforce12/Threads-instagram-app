import ThreadForm from '@/components/ThreadForm';
import ThreadPost from '@/components/createThreads/ThreadPost';


export default function Home() {
  return (
    <div className='flex flex-col flex-1 mt-14 w-full px-4'>
      <div className='border border-gray-100/20 p-3'>
        <ThreadForm />
      </div>

      <div className='my-5 border-t border-b border-white/30'>
        <ThreadPost />
      </div>
    </div>
  );
}
