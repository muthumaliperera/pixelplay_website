import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

const Navbar: React.FC = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceDropdownOpen(false);
      }

      // Close mobile menu when clicking outside
      const target = event.target as Element;
      if (
        !target.closest(".mobile-menu-container") &&
        !target.closest(".hamburger-button")
      ) {
        setIsMobileMenuOpen(false);
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
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
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
    setIsMobileMenuOpen(false);
    navigate("/services", { state: { activeTab: category } });
  };

  const handleMobileNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    if (target === "home") {
      navigate("/", { state: { scrollTo: "home" } });
    } else if (target === "creativity") {
      navigate("/", { state: { scrollTo: "creativity" } });
    } else if (target === "who-we-are") {
      navigate("/", { state: { scrollTo: "who-we-are" } });
    } else if (target === "careers") {
      navigate("/careers");
    }
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

      {/* Desktop Navigation */}
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

      {/* Hamburger Menu - Mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="hamburger-button sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Desktop Contact Button */}
      <button
        onClick={() => setIsContactModalOpen(true)}
        className="text-black bg-[#c8ff00] px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:opacity-80 transition-colors hidden sm:block"
      >
        Contact
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-container fixed top-0 right-0 h-100vh w-full bg-black/95 backdrop-blur-xl shadow-2xl z-40 sm:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-white text-xl font-semibold">Menu</h2>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <button
                  onClick={() => handleMobileNavClick("home")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeLink === "home"
                      ? "bg-[#c8ff00] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Home
                </button>

                {/* Mobile Service Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsServiceDropdownOpen(!isServiceDropdownOpen)
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeLink === "services"
                        ? "bg-[#c8ff00] text-black"
                        : "text-white hover:bg-white/10"
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

                  {isServiceDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <button
                        onClick={() => handleServiceClick("uiux")}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        UI/UX Design
                      </button>
                      <button
                        onClick={() => handleServiceClick("graphic")}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        Graphic Design
                      </button>
                      <button
                        onClick={() => handleServiceClick("presentation")}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        Presentation Design
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleMobileNavClick("creativity")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeLink === "work"
                      ? "bg-[#c8ff00] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Work
                </button>

                <button
                  onClick={() => handleMobileNavClick("who-we-are")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeLink === "about"
                      ? "bg-[#c8ff00] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => handleMobileNavClick("careers")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeLink === "careers"
                      ? "bg-[#c8ff00] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Careers
                </button>
              </div>

              {/* Mobile Contact Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full text-black bg-[#c8ff00] px-6 py-3 rounded-full hover:opacity-80 transition-colors font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
