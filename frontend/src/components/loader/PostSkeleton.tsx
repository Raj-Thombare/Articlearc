export const PostSkeleton = () => {
  return (
    <div className='p-4 border-b border-slate-200 mx-auto max-w-[680px] animate-pulse break-words overflow-hidden'>
      {/* Header skeleton */}
      <div className='flex items-center mb-4'>
        {/* Avatar skeleton */}
        <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
        {/* Author Name and Date skeleton */}
        <div className='ml-4 flex flex-col justify-center'>
          <div className='w-24 h-4 bg-gray-300 rounded'></div>
          <div className='mt-1 w-16 h-3 bg-gray-200 rounded'></div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className='flex w-full'>
        {/* Left side (Title & Description) */}
        <div className='flex-1'>
          {/* Title skeleton */}
          <div className='w-3/4 h-6 bg-gray-300 rounded mb-4'></div>

          {/* Short Description skeleton */}
          <div className='w-full h-4 bg-gray-200 rounded mb-2'></div>
          <div className='w-full h-4 bg-gray-200 rounded mb-2'></div>
          <div className='w-2/6 h-4 hidden md:block bg-gray-200 rounded mb-4'></div>

          {/* Reading time skeleton */}
          {/* <div className='w-20 h-4 bg-gray-300 rounded'></div> */}
          <div className='flex justify-between items-center mt-4'>
            {/* Bookmark, Edit, Delete buttons skeleton */}
            {/* <div className='flex space-x-4'>
              <div className='w-24 h-6 bg-gray-300 rounded-full'></div>
            </div>
            <div className='flex space-x-4'>
              <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
            </div> */}
          </div>
        </div>

        {/* Right side (Cover image) */}
        <div className='w-[120px] sm:w-[160px] h-[80px] sm:h-[110px] rounded-sm ml-[26px] sm:ml-[56px] bg-gray-300'></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
