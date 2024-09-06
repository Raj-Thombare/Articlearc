import { ReactNode } from "react";
import Footer from "./Footer";

const Aside = ({ children }: { children: ReactNode }) => {
  return (
    <aside className='w-full max-w-full md:max-w-[368px] md:w-[368px] border-0 md:border-l border-slate-200 flex flex-col-reverse md:sticky h-fit top-16 md:pl-8 md:pr-4 md:flex md:flex-1 mx-auto md:mx-0'>
      <div className='relative inline-block w-full h-full px-4'>
        <div className='md:sticky top-70 h-fit md:min-h-[calc(100vh-70px)]'>
          <div className='flex-1'>
            {children}
            <div className='mt-8'>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
