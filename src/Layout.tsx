import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="relative">{children}</main>
      <div className="absolute left-0 w-full bottom-0 ">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
