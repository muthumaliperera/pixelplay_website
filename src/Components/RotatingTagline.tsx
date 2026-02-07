import { motion } from "framer-motion";

export default function RotatingTagline() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Rotating Circular Text */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="
                M 100,100
                m -80,0
                a 80,80 0 1,1 160,0
                a 80,80 0 1,1 -160,0
              "
            />
          </defs>

          <text
            fill="white"
            fontSize="16"
            letterSpacing="1"
            className="uppercase"
          >
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
              • Built for Performance • Design • Impact • Growth
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Logo (Static) */}
      <img
        src="/assets/figma.png"
        alt="Design Tool"
        className="w-16 h-16 z-10"
        loading="lazy"
      />
    </div>
  );
}
