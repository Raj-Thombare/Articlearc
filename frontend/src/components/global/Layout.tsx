import { ReactNode } from "react";
import Appbar from "./Appbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Appbar />
      <div className='max-w-[1336px] mx-auto'>{children}</div>
    </>
  );
};

export default Layout;
