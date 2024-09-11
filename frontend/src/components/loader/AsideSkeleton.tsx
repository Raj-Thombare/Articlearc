const AsideSkeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='mx-auto border-b border-slate-200 pb-4 cursor-pointer md:w-full max-w-full  break-words'>
        <div className='text-2xl font-bold py-2 flex items-center md:items-start justify-center md:justify-start'>
          <div className='h-7 w-80 md:w-full bg-slate-200 rounded' />
        </div>
        <div className='text-md font-normal flex flex-row justify-center md:justify-start flex-wrap md:items-baseline items-center gap-2'>
          <div className='h-10 w-32 bg-slate-200 rounded-full' />
          <div className='h-10 w-32 bg-slate-200 rounded-full mt-2' />
          <div className='h-10 w-32 bg-slate-200 rounded-full mt-2' />
          <div className='h-10 w-32 bg-slate-200 rounded-full mt-2' />
          <div className='h-10 w-32 bg-slate-200 rounded-full mt-2' />
          <div className='h-10 w-32 bg-slate-200 rounded-full mt-2' />
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default AsideSkeleton;
