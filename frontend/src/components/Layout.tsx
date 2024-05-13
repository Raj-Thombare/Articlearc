import { ReactNode } from "react";
import Appbar from "./Appbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Appbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
