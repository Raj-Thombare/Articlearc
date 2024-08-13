import { ReactNode } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col min-h-[100vh]'>
      <Appbar />
      <div className='flex-1 max-w-[1336px] mx-auto'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
