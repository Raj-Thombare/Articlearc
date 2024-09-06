import { ReactNode } from "react";
import Appbar from "./Appbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Appbar />
      <div className='max-w-[1336px] mx-auto py-6 md:py-12'>{children}</div>
    </>
  );
};

export default Layout;
