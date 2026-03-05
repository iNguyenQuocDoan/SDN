import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // client pages: window scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // admin pages: overflow-auto main container
    document.getElementById("main-scroll")?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
