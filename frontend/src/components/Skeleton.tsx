const Skeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='p-4 border-b border-slate-200 pb-4 cursor-pointer w-screen max-w-screen-md break-words'>
        <div className='flex'>
          <div className='flex items-center'>
            <div className='h-6 w-6 rounded-full bg-slate-200' />
            <div className='font-normal pl-2 text-sm flex justify-center flex-col'>
              <div className='h-4 w-24 bg-slate-200 rounded' />
            </div>
          </div>
          {/* <div className='flex justify-center flex-col pl-2'>
            <div className='h-4 w-4 rounded-full bg-slate-200 ' />
          </div> */}
          <div className='font-normal pl-2 text-sm flex justify-center flex-col'>
            <div className='h-4 w-24 bg-slate-200 rounded' />
          </div>
        </div>
        <div className='text-2xl font-bold py-2'>
          <div className='h-6 w-96 bg-slate-200 rounded' />
        </div>
        <div className='text-md font-normal'>
          <div className='h-4 w-full bg-slate-200 rounded' />
          <div className='h-4 w-full bg-slate-200 rounded  mt-2' />
          <div className='h-4 w-3/4 bg-slate-200 rounded  mt-2' />
        </div>
        <div className='text-slate-500 text-sm font-normal pt-4'>
          <div className='h-4 w-20 bg-slate-200 rounded' />
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Skeleton;
