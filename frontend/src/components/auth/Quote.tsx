const Quote = () => {
  return (
    <div className='h-screen flex justify-center flex-col bg-slate-200 '>
      <div className='flex justify-center px-8'>
        <div className='max-w-lg'>
          <div className='text-3xl font-bold text-wrap'>
            "The customer support I received was exceptional. The support team
            went above and beyond to address my concerns"
          </div>
          <div className='max-w-md text-xl font-semibold text-left mt-4'>
            Julies Winfield
          </div>
          <div className='max-w-md text-sm font-medium text-slate-500'>
            CEO | Acme corp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
