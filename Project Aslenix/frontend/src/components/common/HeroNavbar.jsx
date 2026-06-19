import { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar";

const HeroNavbar = ({
  as: Component = "section",
  children,
  className = "",
  ...props
}) => {
  const heroRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let animationFrameId = null;

    const updateNavbarVisibility = () => {
      if (!heroRef.current) return;

      const heroBounds = heroRef.current.getBoundingClientRect();
      setShowNavbar(heroBounds.bottom > 0);
    };

    const requestVisibilityUpdate = () => {
      if (animationFrameId) return;

      animationFrameId = window.requestAnimationFrame(() => {
        updateNavbarVisibility();
        animationFrameId = null;
      });
    };

    updateNavbarVisibility();

    window.addEventListener("scroll", requestVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
    };
  }, []);

  return (
    <Component ref={heroRef} className={className} {...props}>
      <Navbar />
      {children}
    </Component>
  );
};

export default HeroNavbar;
