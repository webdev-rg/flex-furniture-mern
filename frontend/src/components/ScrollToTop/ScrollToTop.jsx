import React, { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [isScrollBtn, setIsScrollBtn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const offset = window.scrollY; // Get the current scroll position

    if (offset > 200) {
      setIsScrollBtn(true); // Show button if scrolled down past 500px
    } else if (offset === 0) {
      setIsScrollBtn(false); // Hide button if at the top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`w-20 h-20 flex items-center justify-center bg-flex-furniture-950 fixed bottom-4 right-4 transition-transform duration-300 ${
        isScrollBtn ? "scale-100" : "scale-0"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top" // Accessibility
      style={{ zIndex: 1000 }} // Ensure the button appears above other elements
    >
      <i className="fi fi-rr-arrow-small-up text-4xl text-white"></i>
    </button>
  );
};
