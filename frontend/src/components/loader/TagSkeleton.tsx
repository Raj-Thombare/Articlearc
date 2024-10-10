const TagSkeleton = () => {
  return (
    <div className='mt-8 md:mt-0 px-4 md:px-0 mb-5'>
      <h3 className='font-bold mb-4 text-base bg-gray-200 h-6 w-44 rounded'></h3>
      <div className='flex gap-2 flex-wrap mb-4'>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className='bg-gray-200 h-8 w-20 md:w-32 rounded-full'></div>
        ))}
      </div>
      <div className='px-4 bg-gray-200 h-4 w-24 rounded'></div>
    </div>
  );
};

export default TagSkeleton;
