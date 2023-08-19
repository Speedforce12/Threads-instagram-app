import ThreadForm from '@/components/ThreadForm';


export default function Home() {
  return (
    <div className='flex flex-col flex-1 mt-14 w-full px-4'>
      <div className='border border-gray-100/20 p-3'>
        <ThreadForm />
      </div>
    </div>
  );
}
