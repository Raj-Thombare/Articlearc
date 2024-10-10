const UserCardSkeleton = () => {
  return (
    <div className='mt-8 px-4 md:px-0 animate-pulse'>
      {/* Skeleton for Header */}
      <h3 className='font-bold mb-4 text-base bg-gray-200 h-6 w-48 rounded'></h3>

      {/* Skeleton for User Profile Cards */}
      <div className='flex flex-col gap-1 flex-wrap flex-shrink mb-4'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='flex justify-between items-center my-2'>
              <div className='flex items-center flex-1 mr-1 md:mr-2'>
                {/* Skeleton Avatar */}
                <div className='bg-gray-200 rounded-full min-w-14 min-h-14 md:w-12 md:h-12'></div>
                <div className='ms-3'>
                  {/* Skeleton for Name */}
                  <div className='bg-gray-200 h-5 w-36 md:w-24 rounded mb-1'></div>
                  {/* Skeleton for Username */}
                  <div className='bg-gray-200 h-4 w-20 md:w-16 rounded'></div>
                </div>
              </div>
              {/* Skeleton for Follow Button */}
              <div className='bg-gray-200 h-10 w-32 md:w-24 rounded-full'></div>
            </div>
          ))}
      </div>

      {/* Skeleton for See more suggestions */}
      <div className='bg-gray-200 h-5 w-40 rounded'></div>
    </div>
  );
};

export default UserCardSkeleton;
