import { useEffect, useRef, useState } from "react";

const slides: string[] = [
  "/assets/slide1.svg",
  "/assets/slide2.svg",
  "/assets/slide3.svg",
];

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    // If we're on the cloned slide
    if (index === slides.length) {
      setIsTransitioning(false);
      setIndex(0);

      // Force reflow to remove animation glitch
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 700ms ease-in-out" : "none",
        }}
      >
        {/* REAL SLIDES */}
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-full flex-shrink-0"
            alt=""
            draggable={false}
          />
        ))}

        {/* CLONE OF FIRST SLIDE */}
        <img
          src={slides[0]}
          className="w-full flex-shrink-0"
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
