// src/Pages/home.tsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/footer";
import Navbar from "../Components/navbar";

const Home: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const creativeRef = useRef<HTMLDivElement>(null);
  const [isCreativeDragging, setIsCreativeDragging] = useState(false);
  const creativeDragRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });
  const [creativeIndex, setCreativeIndex] = useState(0);
  const creativeCardCount = 3;
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });

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

  // Creativity carousel drag handlers
  const onCreativeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!creativeRef.current) return;
    if (e.button !== 0) return;
    e.preventDefault();
    setIsCreativeDragging(true);
    creativeDragRef.current.startX = e.pageX;
    creativeDragRef.current.scrollLeft = creativeRef.current.scrollLeft;
  };

  const onCreativeMouseUp = () => setIsCreativeDragging(false);
  const onCreativeMouseLeave = () => setIsCreativeDragging(false);
  const onCreativeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCreativeDragging || !creativeRef.current) return;
    e.preventDefault();
    const walk = e.pageX - creativeDragRef.current.startX;
    if (Math.abs(walk) < 3) return;
    creativeRef.current.scrollLeft = creativeDragRef.current.scrollLeft - walk;
  };

  // Creativity in Action: chevron scroll handlers
  const scrollCreativeByOneCard = (direction: "left" | "right") => {
    const container = creativeRef.current;
    if (!container) return;
    const firstCard = container.querySelector(
      "[data-creative-card]",
    ) as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const gapPx = 32; // gap-8
    const delta = (cardWidth + gapPx) * (direction === "left" ? -1 : 1);
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scrollCreativeToIndex = (index: number) => {
    const container = creativeRef.current;
    if (!container) return;
    const firstCard = container.querySelector(
      "[data-creative-card]",
    ) as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const gapPx = 32;
    container.scrollTo({
      left: index * (cardWidth + gapPx),
      behavior: "smooth",
    });
  };

  const onCreativeScroll = () => {
    const container = creativeRef.current;
    if (!container) return;
    const firstCard = container.querySelector(
      "[data-creative-card]",
    ) as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const gapPx = 32;
    if (cardWidth === 0) return;
    const idx = Math.round(container.scrollLeft / (cardWidth + gapPx));
    if (idx !== creativeIndex)
      setCreativeIndex(Math.max(0, Math.min(creativeCardCount - 1, idx)));
  };

  // Editable images for each card (update paths as needed)
  const UIUX_IMAGE = "/assets/image.png";
  const GRAPHIC_IMAGE = "/assets/image.png";
  const PRESENTATION_IMAGE = "/assets/image.png";

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-[#c8ff00] overflow-hidden rounded-br-[120px]"
      >
        <Navbar />

        {/* Hero Content */}
        <div className="container z-10 max-h-full inset-x-0 bottom-24  absolute sm:static sm:px-8 sm:py-16">
          <div className="max-w-4xl ">
            <h1 className="text-5xl sm:text-7xl leading-tight sm:leading-tight mb-4 sm:mb-6 text-center sm:text-left">
              Where <span className="font-bold">Ideas</span> Become
              <br />
              Unforgettable{" "}
              <span className="font-bold">
                Digital
                <br />
                Experiences
              </span>
              .
            </h1>

            <p className="text-base sm:text-xl mb-6 sm:mb-8 text-gray-800 text-center sm:text-left">
              We turn your vision into{" "}
              <span className="font-bold">
                high-impact UI/UX, brand visuals,{" "}
              </span>
              and
              <span className="font-bold"> presentation</span>
              <br />
              designs that connect, convert, and stand out.
            </p>

            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <button className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-gray-800 transition-colors text-base sm:text-lg">
                Start Your Project
              </button>
              <Link to="/work">
                <button className="border-2 border-black text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-black hover:text-white transition-colors text-base sm:text-lg">
                  View Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visuals: Cards & Ribbon Container */}
        <div className="absolute top-24 left-0 right-0 h-full pointer-events-none">
          {/* Ribbon Image - mobile and desktop variants */}
          <img
            src="/assets/ribbon_hero_mobile.svg"
            alt="Hero ribbon mobile"
            className="absolute top-0 w-full z-30 select-none block sm:hidden"
            loading="eager"
          />
          <img
            src="/assets/ribbon_hero.png"
            alt="Hero ribbon"
            className="absolute bottom-40 md:bottom-20 w-full  select-none hidden sm:block"
            loading="eager"
          />
        </div>
      </section>

      {/* What We Create Section */}
      <section className="bg-white py-20 w-full">
        <div className="  w-full">
          {/* Section Header */}
          <div className="text-center mb-8 px-20">
            <h2 className="text-4xl font-bold mb-4">WHAT WE CREATE</h2>
            <p className="text-lg text-gray-700">
              Three core design services. Purpose-driven execution. Results you
              can see and measure
            </p>
          </div>

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
              <div className="flex  justify-start lg:justify-center gap-6 w-max ">
                {/* Card 1: UI/UX Design */}
                <div
                  className={`bg-white rounded-3xl border border-slate-300 p-4 transition-all duration-500 ease-in-out flex-shrink-0 snap-start ${
                    expandedCard === 1 ? "w-[500px]" : "w-[360px]"
                  } h-[450px] flex flex-col overflow-hidden`}
                >
                  <div className="bg-white rounded-full   inline-flex items-center gap-2 mb-2">
                    <img src="/assets/ui_icon.svg" alt="" className="h-8 w-8" />
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
                        We design intuitive, conversion-focused interfaces users
                        love to interact with. From mobile apps to complex
                        dashboards, every screen is crafted with usability,
                        clarity, and business goals in mind.
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
                              <span>Rapid prototyping before development</span>
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

                  <div className="flex justify-between mt-0 w-full">
                    <Link to="/services?tab=uiux">
                      <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                        Explore UI/UX Projects
                      </button>
                    </Link>

                    <button
                      onClick={() => toggleCard(1)}
                      className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors flex items-center gap-2"
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
                </div>

                {/* Card 2: Graphic Design */}
                <div
                  className={`bg-white rounded-3xl p-4 border border-slate-300 transition-all duration-500 ease-in-out flex-shrink-0 snap-start ${
                    expandedCard === 2 ? "w-[500px]" : "w-[360px]"
                  } h-[450px] flex flex-col overflow-hidden`}
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
                        remember you. Every graphic is designed with intention,
                        consistency, and your brand story in mind.
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
                              Marketing Collateral (Posters, Flyers, Brochures)
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

                  <div className="flex justify-between mt-0 w-full">
                    <Link to="/services?tab=graphic">
                      <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                        See Our Design Work
                      </button>
                    </Link>

                    <button
                      onClick={() => toggleCard(2)}
                      className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors flex items-center gap-2"
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
                </div>

                {/* Card 3: Presentation Design */}
                <div
                  className={`bg-white rounded-3xl p-4 border border-slate-300 transition-all duration-500 ease-in-out flex-shrink-0 snap-start ${
                    expandedCard === 3 ? "w-[500px]" : "w-[360px]"
                  } h-[450px] flex flex-col overflow-hidden`}
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
                        internal report, we transform boring slides into visual
                        stories that keep your audience engaged and help you
                        close deals, win approval, or inspire action.
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

                  <div className="flex justify-between mt-0 w-full">
                    <Link to="/services?tab=presentation">
                      <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                        See Our Presentations
                      </button>
                    </Link>

                    <button
                      onClick={() => toggleCard(3)}
                      className="border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors flex items-center gap-2"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creativity In Action Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
              CREATIVITY IN ACTION
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Every project solves a problem, tells a story, and delivers
              impact. Here’s a selection of work we’re proud to share.
            </p>
          </div>

          <div className="relative">
            {/* Chevron controls */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollCreativeByOneCard("left")}
              className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full w-10 h-10 items-center justify-center shadow"
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
              className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-300 rounded-full w-10 h-10 items-center justify-center shadow"
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
              ref={creativeRef}
              className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1"
              onScroll={onCreativeScroll}
            >
              {/* Card */}
              {[1, 2, 3].map((i) => (
                <div
                  key={`work-card-${i}`}
                  data-creative-card
                  className="min-w-[300px] sm:min-w-[480px] lg:min-w-[560px] bg-white border border-slate-300 rounded-3xl p-4 snap-start"
                >
                  {/* Media 16:9 */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-300">
                    <div className="pt-[56.25%]"></div>
                    <img
                      src="/assets/image.png"
                      alt="Project preview"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-[#B3E234] text-black text-sm font-semibold rounded-full px-3 py-1">
                      UI/UX Design
                    </span>
                  </div>

                  {/* Actions row */}
                  <div className="flex justify-end mt-3">
                    <button className="border border-slate-400 rounded-full px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                      View Case Study
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

                  {/* Text */}
                  <h3 className="text-xl font-extrabold mt-3">
                    EcoCart Mobile App
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Sustainable shopping app designed to reduce carbon footprint
                    through intuitive flows and eco-first visuals.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    15 screens · Interactive prototype · Design system
                  </p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => scrollCreativeToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`${creativeIndex === i ? "w-6 bg-gray-800" : "w-2 bg-gray-300"} h-2 rounded-full transition-all`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        id="who-we-are"
        className="relative bg-[#e8f5d5] pt-20 pb-[650px]  sm:pb-[200px] md:pb-[300px] lg:pb-[350px] xl:pb-[450px] overflow-hidden"
      >
        <div className=" px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-3 gap-10 w-full">
            {/* Left: Copy */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                WHO WE ARE
              </h2>
              <div className="space-y-4 text-gray-800 w-full">
                <p>
                  PixelPlay was built on a simple belief — great design should
                  be purposeful, accessible, and impactful.
                </p>
                <p>
                  We’re a creative design studio based in Sri Lanka,
                  specializing in UI/UX design, visual design, and presentation
                  design that doesn’t just look good, but actually works. Every
                  project we take on is an opportunity to solve real problems,
                  tell meaningful stories, and create experiences people enjoy.
                </p>
                <p>
                  We don’t believe in templates or one-size-fits-all solutions.
                  Every brand is different — and every design we create is
                  thoughtfully crafted to match your goals, audience, and
                  vision. That’s why we collaborate closely with our clients,
                  from the first brief to final delivery, ensuring clarity,
                  alignment, and quality at every step.
                </p>
                <p>
                  Whether you’re a startup founder preparing to pitch, a
                  business growing its brand, or an educator creating engaging
                  materials — PixelPlay is here to turn your ideas into designs
                  that make an impact.
                </p>
              </div>
            </div>

            {/* Right: Decorative thumbnails (desktop only) */}
            <div className="relative hidden lg:block lg:col-span-1 ">
              <img
                src="/assets/who_we_are_img.svg"
                alt="Who we are showcase"
                className="absolute right-0 top-6 w-[520px] pointer-events-none select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="px-12 relative z-10 mt-10 pb-12">
          <h3 className="font-bold text-lg  mb-6">What Sets Us Apart</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Collaborative Process",
                desc: "You're involved at every stage",
              },
              {
                title: "Modern Design Thinking",
                desc: "Strategy-led, trend-aware execution",
              },
              {
                title: "Speed with Quality",
                desc: "Fast turnaround without cutting corners",
              },
              {
                title: "Fair & Transparent Pricing",
                desc: "Global quality at Sri Lankan rates",
              },
              {
                title: "Client-Centered Approach",
                desc: "Your success defines ours",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#234C2E] mx-auto mb-3" />
                <p className="font-semibold leading-snug">{item.title}</p>
                <p className="text-xs text-gray-700 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy ribbon and text */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none">
          {/* Mobile philosophy image */}
          <img
            src="/assets/philosophy_img_mobile.svg"
            alt="Our Philosophy mobile"
            className="block sm:hidden w-full"
            loading="lazy"
          />

          {/* Desktop philosophy image */}
          <img
            src="/assets/philosophy_img.svg"
            alt="Our Philosophy"
            className="hidden sm:block w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
