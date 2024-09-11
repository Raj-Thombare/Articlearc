const UsersSkeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='mx-auto border-b border-slate-200 pb-4 cursor-pointer md:w-full max-w-full  break-words'>
        <div className='text-2xl font-bold py-2'>
          <div className='h-8 bg-slate-200 rounded' />
        </div>
        <div className='text-md font-normal'>
          <div className='h-12 bg-slate-200 rounded-full mt-3' />
          <div className='h-12 bg-slate-200 rounded-full mt-3' />
          <div className='h-12 bg-slate-200 rounded-full mt-3' />
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default UsersSkeleton;
