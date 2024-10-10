const ProfileSkeleton = ({ isOwner }: { isOwner: boolean }) => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='mx-auto border-gray-200 pb-4 cursor-pointer break-words'>
        <div className='text-2xl w-full font-bold py-2 flex md:justify-start justify-center mb-2'>
          <div
            className={`h-12 ${
              isOwner ? "w-[100%]" : "w-[50%]"
            } md:h-12 bg-gray-200 rounded mr-2`}
          />
          {!isOwner && (
            <div className='h-12 w-[50%] md:h-12 bg-gray-200 rounded' />
          )}
        </div>
        <div className='text-2xl font-bold py-2 flex md:justify-start justify-center mb-2'>
          <div className='h-36 w-36 md:w-28 md:h-28 bg-gray-200 rounded-full' />
        </div>
        <div className='text-md font-normal flex flex-col justify-center items-center md:items-start md:justify-start'>
          <div className='h-5 w-40 bg-gray-200 rounded mt-1.5' />
          <div className='h-5 w-40 bg-gray-200 rounded mt-1.5' />
          {/* <div className='h-10 w-full bg-slate-200 rounded mt-4' /> */}
        </div>
        <div className='h-40 w-full bg-gray-200 rounded mt-2' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default ProfileSkeleton;
