import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Let hash links (e.g. /products#products-section) handle their own scrolling
    if (hash) return;

    window.scrollTo(0, 0);

    // Also reset the document scroll position
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
