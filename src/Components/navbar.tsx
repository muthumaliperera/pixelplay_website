import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

const Navbar: React.FC = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
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

  // Update active link based on current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/") {
      setActiveLink("home");
    } else if (path === "/services" || path === "/work") {
      setActiveLink("services");
    } else if (path === "/about") {
      setActiveLink("about");
    } else if (path === "/careers") {
      setActiveLink("careers");
    }
  }, [location]);

  // Track scroll position for home page sections
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const sections = ["home", "creativity", "who-we-are"];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              if (section === "creativity") {
                setActiveLink("work");
              } else if (section === "who-we-are") {
                setActiveLink("about");
              } else {
                setActiveLink(section);
              }
              break;
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location]);

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
          className={`transition-colors ${
            activeLink === "home" 
              ? "text-[#c8ff00]" 
              : "text-white hover:text-[#c8ff00]"
          }`}
        >
          Home
        </button>

        {/* Service Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
            className={`flex items-center gap-1 transition-colors ${
              activeLink === "services" 
                ? "text-[#c8ff00]" 
                : "text-white hover:text-[#c8ff00]"
            }`}
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
          className={`transition-colors ${
            activeLink === "work" 
              ? "text-[#c8ff00]" 
              : "text-white hover:text-[#c8ff00]"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => navigate("/", { state: { scrollTo: "who-we-are" } })}
          className={`transition-colors ${
            activeLink === "about" 
              ? "text-[#c8ff00]" 
              : "text-white hover:text-[#c8ff00]"
          }`}
        >
          About
        </button>
        <Link
          to="/careers"
          className={`transition-colors ${
            activeLink === "careers" 
              ? "text-[#c8ff00]" 
              : "text-white hover:text-[#c8ff00]"
          }`}
        >
          Careers
        </Link>
      </div>

      <button
        onClick={() => setIsContactModalOpen(true)}
        className="text-black bg-[#c8ff00] px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:opacity-80 transition-colors"
      >
        Contact
      </button>

      {isContactModalOpen &&
        createPortal(
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />,
          document.body,
        )}
    </nav>
  );
};

export default Navbar;
