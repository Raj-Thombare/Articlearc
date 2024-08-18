import { ReactNode } from "react";
import Appbar from "./Appbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='block'>
      <Appbar />
      <div className='max-w-[1336px] mx-auto my-6 md:my-12'>{children}</div>
    </div>
  );
};

export default Layout;
