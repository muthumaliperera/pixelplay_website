import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceClick = (
    category: "uiux" | "graphic" | "presentation",
  ) => {
    setIsServiceDropdownOpen(false);
    navigate("/services", { state: { activeTab: category } });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-black/60 backdrop-blur-3xl shadow-md">
      <Link to="/" className="z-10">
        <img
          src="/assets/pixlogo_white.svg"
          alt="PixelPlay Logo"
          className="h-4 sm:h-6 w-auto object-contain"
        />
      </Link>

      <div className="sm:flex items-center gap-8 md:gap-16 lg:gap-24 bg-stone-800 hover:bg-zinc-800/90 transition-colors rounded-full px-8 py-3 relative hidden backdrop-blur-sm">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "home" } })}
          className="text-white  hover:text-[#c8ff00] transition-colors"
        >
          Home
        </button>

        {/* Service Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
            className="flex items-center gap-1 text-white hover:text-[#c8ff00] transition-colors"
          >
            Service
            <svg
              className={`w-4 h-4 transition-transform ${isServiceDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isServiceDropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-white rounded-2xl shadow-xl py-2 min-w-[200px] z-50">
              <button
                onClick={() => handleServiceClick("uiux")}
                className="w-full text-left px-6 py-3 hover:bg-[#c8ff00] transition-colors text-black"
              >
                UI/UX Design
              </button>
              <button
                onClick={() => handleServiceClick("graphic")}
                className="w-full text-left px-6 py-3 hover:bg-[#c8ff00] transition-colors text-black"
              >
                Graphic Design
              </button>
              <button
                onClick={() => handleServiceClick("presentation")}
                className="w-full text-left px-6 py-3 hover:bg-[#c8ff00] transition-colors text-black"
              >
                Presentation Design
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/", { state: { scrollTo: "creativity" } })}
          className="text-white hover:text-[#c8ff00] transition-colors"
        >
          Work
        </button>
        <button
          onClick={() => navigate("/", { state: { scrollTo: "who-we-are" } })}
          className="text-white hover:text-[#c8ff00] transition-colors"
        >
          About
        </button>
      </div>

      <button
        onClick={() => navigate("/", { state: { scrollTo: "footer" } })}
        className="text-black bg-[#c8ff00] px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:opacity-80 transition-colors"
      >
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
