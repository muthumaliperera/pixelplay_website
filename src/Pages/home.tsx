// src/Pages/home.tsx
import type { Variants } from "framer-motion";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContactModal from "../Components/ContactModal";
import Footer from "../Components/footer";
import ImageSlider from "../Components/ImageSlider";
import Navbar from "../Components/navbar";
import ProjectModal from "../Components/ProjectModal";
import RotatingTagline from "../Components/RotatingTagline";
import { projects as allProjects, Project } from "../data/projects";

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // was 0.15
      delayChildren: 0.1, // was 0.2
    },
  },
};

const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // easeOut-like curve
    },
  },
};

const heroSlider: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      delay: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const sectionFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // 2s is too slow for UX
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const cardItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Home: React.FC = () => {
  const whatWeCreateRef = useRef<HTMLDivElement>(null);
  const isWhatWeCreateInView = useInView(whatWeCreateRef, {
    once: true,
    margin: "-50px",
  });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const location = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Simple horizontal scroll for Creativity section (no drag/chevrons)
  const creativeScrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });
  const [isCreativeDragging, setIsCreativeDragging] = useState(false);
  const creativeDragStateRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });

  // Modal state for project preview
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openModal = (project: Project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    if (e.button !== 0) return; // only respond to primary/left click
    e.preventDefault();
    setIsDragging(true);
    // Use absolute pageX to avoid offset issues during drag
    dragStateRef.current.startX = e.pageX;
    dragStateRef.current.scrollLeft = scrollerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    const walk = e.pageX - dragStateRef.current.startX;
    // Apply a small threshold to avoid unintended scroll on click+hover without drag
    if (Math.abs(walk) < 3) return;
    scrollerRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
  };

  // Creativity section: mouse drag handlers (same pattern as What We Create)
  const onCreativeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!creativeScrollerRef.current) return;
    if (e.button !== 0) return;
    e.preventDefault();
    setIsCreativeDragging(true);
    creativeDragStateRef.current.startX = e.pageX;
    creativeDragStateRef.current.scrollLeft =
      creativeScrollerRef.current.scrollLeft;
  };

  const onCreativeMouseLeave = () => setIsCreativeDragging(false);
  const onCreativeMouseUp = () => setIsCreativeDragging(false);
  const onCreativeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCreativeDragging || !creativeScrollerRef.current) return;
    e.preventDefault();
    const walk = e.pageX - creativeDragStateRef.current.startX;
    if (Math.abs(walk) < 3) return;
    creativeScrollerRef.current.scrollLeft =
      creativeDragStateRef.current.scrollLeft - walk;
  };

  // Chevron scroll: scroll by one card and loop endlessly
  const scrollCreativeByOneCard = (direction: "left" | "right") => {
    const container = creativeScrollerRef.current;
    if (!container) return;
    const firstCard = container.querySelector(
      "[data-creative-card]",
    ) as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const gapPx = 32; // gap-8
    const delta = (cardWidth + gapPx) * (direction === "left" ? -1 : 1);

    const maxScroll = container.scrollWidth - container.clientWidth;
    const threshold = 16;
    const target = container.scrollLeft + delta;

    if (direction === "right" && target > maxScroll - threshold) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction === "left" && target < threshold) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Editable images for each card (update paths as needed)
  const UIUX_IMAGE = "/assets/UIUX Marketing Post.png";
  const GRAPHIC_IMAGE = "/assets/Graphic Marketing Post.png";
  const PRESENTATION_IMAGE = "/assets/PPt Marketing Post.png";

  // Featured projects for Creativity in Action from shared data
  const featuredProjects: Project[] = allProjects.filter((p) => p.featured);
  const categoryBadge: Record<Project["category"], string> = {
    uiux: "UI/UX Design",
    graphic: "Graphic Design",
    presentation: "Presentation Design",
  };

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Scroll to section based on navigation state or URL hash
  useEffect(() => {
    // First check for state-based navigation (from navbar)
    const targetFromState = (location.state as any)?.scrollTo as
      | "home"
      | "creativity"
      | "who-we-are"
      | "footer"
      | undefined;

    // Then check for URL hash
    const targetFromHash = window.location.hash.replace("#", "");

    const target = targetFromState || targetFromHash || "";

    if (!target) return;

    const el = document.getElementById(target);
    if (el) {
      // Small timeout to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Clear the state to prevent scrolling again on re-renders
        if (targetFromState) {
          window.history.replaceState(
            { ...location.state, scrollTo: undefined },
            "",
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.state, location.hash]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-[#141414] overflow-hidden"
        style={{
          backgroundImage: "url('/assets/grid.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top",
        }}
      >
        <Navbar />
        <div className="grid grid-cols-1  min-h-screen lg:items-center ">
          {/* HERO CONTENT */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="px-6 lg:px-16 lg:mt-5 z-20 flex justify-center items-start mt-28  lg:pt-24"
          >
            <div className="w-full  text-center ">
              <motion.div
                variants={heroItem}
                className="flex justify-center mb-6"
              >
                <RotatingTagline />
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-white"
              >
                Where <span className="font-bold">Ideas</span> Become
                <br />
                Unforgettable{" "}
                <span className="font-bold">Digital Experiences</span>.
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="text-base sm:text-xl mb-8 text-gray-200"
              >
                We turn your vision into{" "}
                <span className="font-bold">
                  high-impact UI/UX, brand visuals,
                </span>{" "}
                and <span className="font-bold">presentation</span> designs that
                connect, convert, and stand out.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="flex gap-4 justify-center"
              >
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-black bg-[#B3E234] px-8 py-4 rounded-full hover:bg-[#C4EB5A] transition-colors"
                >
                  Start Your Project
                </button>

                <Link to="/work">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors">
                    View Our Work
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* HERO VISUALS */}
          {/* RIGHT — SLIDER */}
          <motion.div
            variants={heroSlider}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center"
          >
            <ImageSlider />
          </motion.div>
        </div>
      </section>

      {/* What We Create Section */}
      <motion.section
        id="what-we-create"
        ref={whatWeCreateRef}
        className="bg-white pt-28 pb-20 w-full"
        initial="hidden"
        animate={isWhatWeCreateInView ? "visible" : "hidden"}
      >
        <div className="  w-full">
          {/* Section Header */}
          <motion.div
            variants={sectionFadeUp}
            className="text-center mb-6 px-20"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-700">
              Purpose-driven execution. Results you can see and measure
            </p>
          </motion.div>

          {/* Horizontal Scrolling Cards */}
          <div className="w-full ">
            <div
              ref={scrollerRef}
              className="overflow-x-auto no-scrollbar w-full pb-8 px-8 cursor-grab active:cursor-grabbing select-none justify-start lg:justify-center flex"
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              role="region"
              aria-label="What We Create carousel"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `,
                }}
              />
              <motion.div
                variants={cardsContainer}
                className="flex justify-start flex-col sm:flex-row lg:justify-center gap-6 w-max py-5"
              >
                {/* Card 1: UI/UX Design */}
                <motion.div
                  variants={cardItem}
                  className="flex-shrink-0 snap-start overflow-visible"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-3xl border border-slate-300 p-4
      transition-shadow duration-300
      ${expandedCard === 1 ? "w-[500px]" : "w-[360px]"}
      h-[450px] flex flex-col`}
                  >
                    <div className="bg-white rounded-full   inline-flex items-center gap-2 mb-2">
                      <img
                        src="/assets/ui_icon.svg"
                        alt=""
                        className="h-8 w-8"
                      />
                      <h3 className="text-xl font-bold">UI/UX Design</h3>
                      <img
                        src="/assets/verified_badge.svg"
                        alt=""
                        className="h-6 w-6"
                      />
                    </div>

                    <h4 className="text-lg  text-slate-800 mb-4 text-left">
                      Digital Experiences That Feel Effortless
                    </h4>
                    {/* Scrollable content area to keep card height constant */}
                    <div className="flex-1 min-h-0 flex flex-col">
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 1
                            ? "max-h-[450px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-700 mb-4 leading-relaxed text-left">
                          We design intuitive, conversion-focused interfaces
                          users love to interact with. From mobile apps to
                          complex dashboards, every screen is crafted with
                          usability, clarity, and business goals in mind.
                        </p>
                      </div>

                      {/* Card image (hide on read more) */}
                      <div
                        className={`flex-1 min-h-0 rounded-2xl overflow-hidden mb-4 ${expandedCard === 1 ? "hidden" : "block"}`}
                      >
                        <img
                          src={UIUX_IMAGE}
                          alt="UI/UX preview"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 1
                            ? "max-h-[450px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-100 rounded-2xl p-4">
                            <h5 className="font-bold mb-4">What We Deliver</h5>
                            <ul className="space-y-2 text-sm">
                              <li>Mobile App UI Design (iOS & Android)</li>
                              <li>Website & Web App UI/UX</li>
                              <li>Dashboards & Admin Panels</li>
                              <li>Play Store / App Store Visual Assets</li>
                              <li>
                                Interactive Figma Prototypes (Developer-ready)
                              </li>
                            </ul>
                          </div>

                          <div className="text-gray-900 bg-[#B3E234] rounded-2xl p-4">
                            <h5 className="font-bold mb-4">Our Approach</h5>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>User-first design thinking</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Research-backed decisions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>
                                  Rapid prototyping before development
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Fully responsive across devices</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <></>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row justify-between mt-0 w-full">
                      <Link to="/services?tab=uiux">
                        <button className="bg-black w-full sm:w-fit text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                          Explore UI/UX Projects
                        </button>
                      </Link>

                      <button
                        onClick={() => toggleCard(1)}
                        className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2"
                      >
                        {expandedCard === 1 ? (
                          <>
                            Read Less
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            Read More
                            <svg
                              className="w-4 h-4"
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
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Card 2: Graphic Design */}
                <motion.div
                  variants={cardItem}
                  className="flex-shrink-0 snap-start overflow-visible"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-3xl border border-slate-300 p-4
      transition-shadow duration-300
      ${expandedCard === 1 ? "w-[500px]" : "w-[360px]"}
      h-[450px] flex flex-col`}
                  >
                    <div className=" inline-flex items-center gap-2 mb-2">
                      <img
                        src="/assets/graphic_icon.svg"
                        alt=""
                        className="h-8 w-8"
                      />
                      <h3 className="text-xl font-bold">Graphic Design</h3>
                      <img
                        src="/assets/verified_badge.svg"
                        alt=""
                        className="h-6 w-6"
                      />
                    </div>

                    <h4 className="text-lg text-slate-800 mb-4 text-left">
                      Visuals That Capture Attention & Drive Action
                    </h4>

                    {/* Scrollable content area to keep card height constant */}
                    <div className="flex-1 min-h-0 flex flex-col">
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 2
                            ? "max-h-[450px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-700 mb-4 leading-relaxed text-left">
                          From social media posts to full brand identities, we
                          create visuals that stop the scroll and make people
                          remember you. Every graphic is designed with
                          intention, consistency, and your brand story in mind.
                        </p>
                      </div>

                      {/* Card image (hide on read more) */}
                      <div
                        className={`flex-1 min-h-0 rounded-2xl overflow-hidden mb-4 ${expandedCard === 2 ? "hidden" : "block"}`}
                      >
                        <img
                          src={GRAPHIC_IMAGE}
                          alt="Graphic Design preview"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 2
                            ? "max-h-[450px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-100 rounded-2xl p-4">
                            <h5 className="font-bold mb-4">What We Deliver</h5>
                            <ul className="space-y-2 text-sm">
                              <li>Social Media Graphics & Templates</li>
                              <li>Brand Identity Design</li>
                              <li>
                                Marketing Collateral (Posters, Flyers,
                                Brochures)
                              </li>
                              <li>Infographics & Data Visualization</li>
                              <li>Logo Design & Brand Guidelines</li>
                            </ul>
                          </div>

                          <div className="text-gray-900 bg-[#B3E234]  rounded-2xl p-4">
                            <h5 className="font-bold mb-4">Our Approach</h5>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Brand-aligned visual language</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Attention-grabbing compositions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Print & digital optimization</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Consistent, scalable design systems</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <></>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-between mt-0 w-full">
                      <Link to="/services?tab=graphic">
                        <button className="bg-black w-full sm:w-fit text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                          See Our Design Work
                        </button>
                      </Link>

                      <button
                        onClick={() => toggleCard(2)}
                        className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors justify-center flex items-center gap-2"
                      >
                        {expandedCard === 2 ? (
                          <>
                            Read Less
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            Read More
                            <svg
                              className="w-4 h-4"
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
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Card 3: Presentation Design */}
                <motion.div
                  variants={cardItem}
                  className="flex-shrink-0  snap-start overflow-visible"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-3xl border border-slate-300 p-4
      transition-shadow duration-300
      ${expandedCard === 1 ? "w-[500px]" : "w-[360px]"}
      h-[450px] flex flex-col`}
                  >
                    <div className=" inline-flex items-center gap-2 mb-2">
                      <img
                        src="/assets/ppt_icon.svg"
                        alt=""
                        className="h-8 w-8"
                      />
                      <h3 className="text-xl font-bold">Presentation Design</h3>
                      <img
                        src="/assets/verified_badge.svg"
                        alt=""
                        className="h-6 w-6"
                      />
                    </div>

                    <h4 className="text-lg text-slate-800 mb-4 text-left">
                      Slides That Persuade & Impress
                    </h4>

                    {/* Scrollable content area to keep card height constant */}
                    <div className="flex-1 min-h-0 flex flex-col">
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 3
                            ? "max-h-[450px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-700 mb-4 leading-relaxed text-left">
                          Whether it's a pitch deck, sales presentation, or
                          internal report, we transform boring slides into
                          visual stories that keep your audience engaged and
                          help you close deals, win approval, or inspire action.
                        </p>
                      </div>

                      {/* Card image (hide on read more) */}
                      <div
                        className={`flex-1 min-h-0 rounded-2xl overflow-hidden mb-4 ${expandedCard === 3 ? "hidden" : "block"}`}
                      >
                        <img
                          src={PRESENTATION_IMAGE}
                          alt="Presentation preview"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === 3
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-100 rounded-2xl p-4">
                            <h5 className="font-bold mb-4">What We Deliver</h5>
                            <ul className="space-y-2 text-sm">
                              <li>Investor Pitch Decks</li>
                              <li>Sales & Marketing Presentations</li>
                              <li>Corporate & Internal Reports</li>
                              <li>Conference & Event Slides</li>
                              <li>Google Slides / PowerPoint / Keynote</li>
                            </ul>
                          </div>

                          <div className=" text-gray-900 bg-[#B3E234]  rounded-2xl p-4">
                            <h5 className="font-bold mb-4">Our Approach</h5>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Story-driven slide structure</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Data visualization excellence</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Brand-consistent templates</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Optimized for both screen & print</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <></>
                      </div>
                    </div>

                    <div className="flex justify-between flex-col gap-3 sm:flex-row mt-0 w-full">
                      <Link to="/services?tab=presentation">
                        <button className="bg-black text-white w-full sm:w-fit px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                          See Our Presentations
                        </button>
                      </Link>

                      <button
                        onClick={() => toggleCard(3)}
                        className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2"
                      >
                        {expandedCard === 3 ? (
                          <>
                            Read Less
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            Read More
                            <svg
                              className="w-4 h-4"
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
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Creativity In Action Section */}
      <section id="creativity" className="bg-[#1e1e1e] py-20">
        <div className=" mx-auto px-6 sm:px-8">
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,

              margin: "-80px 0px",
            }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl sm:text-5xl text-white font-extrabold tracking-tight mb-3">
              CREATIVITY IN ACTION
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Every project solves a problem, tells a story, and delivers
              impact. Here’s a selection of work we’re proud to share.
            </p>
          </motion.div>

          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,

              margin: "-20px 0px",
            }}
            className="relative"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .no-scrollbar::-webkit-scrollbar { display: none; }
                `,
              }}
            />
            {/* Chevron controls */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollCreativeByOneCard("left")}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full w-10 h-10 items-center justify-center shadow"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollCreativeByOneCard("right")}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full w-10 h-10 items-center justify-center shadow"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div
              ref={creativeScrollerRef}
              className="flex gap-8 overflow-x-auto px-1 py-5 no-scrollbar cursor-grab active:cursor-grabbing select-none"
              onMouseDown={onCreativeMouseDown}
              onMouseLeave={onCreativeMouseLeave}
              onMouseUp={onCreativeMouseUp}
              onMouseMove={onCreativeMouseMove}
              role="region"
              aria-label="Creativity in Action carousel"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Cards: data-driven from shared featured projects */}
              {featuredProjects.map((project) => (
                <motion.div
                  variants={cardItem}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  key={`work-card-${project.id}`}
                  data-creative-card
                  className="min-w-[300px] sm:min-w-[480px] lg:min-w-[560px] bg-white/10 rounded-3xl cursor-pointer"
                  onClick={(e) => {
                    // Only trigger if the click is not on the button or its children
                    if (!(e.target as HTMLElement).closest("button")) {
                      openModal(project);
                    }
                  }}
                >
                  {/* Media 16:9 */}
                  <div className="relative rounded-3xl overflow-hidden ">
                    <div className="pt-[56.25%]"></div>
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-[#B3E234] text-black text-sm font-semibold rounded-full px-3 py-1">
                      {categoryBadge[project.category]}
                    </span>
                  </div>
                  <div className="p-4">
                    {/* Text */}
                    <h3 className="text-xl text-white font-extrabold mt-3">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm mt-2">
                      {project.description}
                    </p>
                    {project.details && (
                      <p className="text-white/60 text-sm mt-2">
                        {project.details}
                      </p>
                    )}
                  </div>

                  {/* Actions row */}
                  <div className="flex justify-start px-4 pb-4 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to the card
                        openModal(project);
                      }}
                      className="border border-white text-white/90 rounded-full px-6 py-3 hover:bg-[#B3E234] hover:text-black hover:border-none transition-colors flex items-center gap-2"
                    >
                      {project.category === "uiux"
                        ? "View Case Study"
                        : project.category === "graphic"
                          ? "View Work"
                          : "View Slides"}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        id="who-we-are"
        className="relative pt-20 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/about_bg_grid.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition: "top",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="relative z-10 w-full flex flex-col justify-center items-center gap-10">
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px 0px" }}
            className="px-12 gap-10 text-center max-w-4xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 ">WHO WE ARE</h2>
            <div className="space-y-4">
              <p className=" text-3xl sm:4xl text-gray-900 ">
                PixelPlay designs experiences that work — not just look good.
              </p>
              <p className=" text-lg sm:xl text-gray-800 ">
                PixelPlay is a creative design studio from Sri Lanka crafting
                UI/UX, visual, and presentation designs that are built to
                perform. We focus on clarity, usability, and purpose — so your
                product, brand, or story connects instantly and works
                effortlessly.
              </p>

              <p className=" text-lg sm:xl text-gray-800 mb-8">
                Every project starts with understanding, not assumptions. We
                design around your users, your goals, and real constraints —
                because effective design isn't about trends, it's about results.
              </p>
            </div>
            <div
              className="w-full flex justify-center gap-4 items-center mt-6"
              style={{ position: "relative", zIndex: 20 }}
            >
              <button
                onClick={() => {
                  console.log("Button clicked");
                  setIsContactModalOpen(true);
                }}
                className="relative z-20 flex items-center gap-2 font-medium text-black bg-[#B3E234]  px-6 py-4 rounded-full hover:bg-[#C4EB5A] transition-colors"
                style={{ position: "relative", zIndex: 20 }}
              >
                Start a Conversation
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <div className="">
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-4 border border-black text-base font-medium rounded-full text-black bg-white hover:bg-black hover:text-white transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px 0px" }}
            className="relative flex justify-center w-full items-center mt-0 sm:-mt-20 lg:-mt-32"
          >
            <motion.img
              src="/assets/about_mob.svg"
              alt="about_vector_mobile"
              className=" w-full  pointer-events-none sm:hidden"
              loading="lazy"
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.img
              src="/assets/about_web.svg"
              alt="about_vector_web"
              className=" w-full  pointer-events-none hidden sm:block "
              loading="lazy"
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      {modalProject && !isContactModalOpen && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}
      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
            // Reset modal project state when contact modal is closed
            if (modalProject) {
              setModalProject(null);
            }
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
