import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Header from "./../Header";
import Footer from "./../Footer";
import { useEffect, useRef } from "react";

const UserLayout = () => {
  const boxRef = useRef(null);
  const { pathname } = useLocation(); // detects route changes

  // When route changes, scroll box to top
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);
  
  return ( 
    <div className="Layout">
      <Header  />
      <div className="Page fixed left-0 top-0  p-2 w-screen h-screen">
        <div className="overflow-y-scroll w-full h-full rounded-[38px]" ref={boxRef}>
          <div>
            <Outlet />
          </div>
           <ScrollToTop />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
