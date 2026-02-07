import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../Components/footer";
import Navbar from "../Components/navbar";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      {/* Full-width Cover Image 
      <div className="w-full absolute top-16 z-0 md:hidden">
        <img
          src="/assets/about_cover_mob.png"
          alt="About Us Cover"
          className="w-full  h-auto  object-left-top "
        />
      </div>*/}

      {/* Full-height Cover Image
      <div className=" h-full  w-auto absolute top-16 z-0 hidden ">
        <img
          src="/assets/about_cover_ver.png"
          alt="About Us Cover"
          className="h-full w-auto  object-cover  object-left "
        />
      </div> */}

      {/* Back Button */}
      <div className=" absolute flex items-center z-50  mx-8 rounded-3xl  w-16 h-6  mt-24 ">
        <Link
          to="/"
          state={{ scrollTo: "who-we-are" }}
          className="inline-flex items-center text-white   text-sm hover:text-gray-900 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row sm:gap-4 md:gap-0  justify-items-center md:justify-items-start w-full justify-center  mb-12">
        {/* Hero Section */}
        <section className="relative pt-28 lg:pt-40 pb-12 md:pb-18 px-10 ">
          <div className=" mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center z-20 relative"
            >
              <div className="flex flex-col items-center -space-y-2 text-white">
                <p className="text-4xl md:text-5xl font-thin italic ">
                  Meet the
                </p>
                <p className="text-4xl md:text-7xl font-bold ">DESIGNER</p>
              </div>
            </motion.div>

            <div className="flex justify-center flex-col -mt-6 md:-mt-8 relative z-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center relative z-0"
              >
                <img
                  src="/assets/founder.png"
                  alt="Founder"
                  className=" w-64"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className=" text-center  mt-4"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Wasana Muthumali
                </h2>
                <p className="text-md text-gray-300 mt-0">
                  Founder & Creative Designer
                </p>
                <p className="text-md text-gray-300 mt-0">
                  Bsc.Hons Software Engineering
                </p>
                {/* contact info*/}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-3 justify-center ">
                    <img
                      src="/assets/ic_baseline-email.png"
                      alt="Email"
                      className=" w-4 "
                    />
                    <span className="text-gray-300">
                      udwasanamuthumaliperera@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-center ">
                    <img
                      src="/assets/mdi_linkedin.png"
                      alt="LinkedIn"
                      className=" w-4 "
                    />
                    <span className="text-gray-300">+94 77 123 4567</span>
                  </div>
                </div>
                <div className="mt-4 flex   justify-center w-full">
                  <blockquote className="border-dashed border-2 border-white p-4 italic text-gray-300 max-w-sm">
                    "Design is not just what it looks like and feels like.
                    Design is how it works."
                  </blockquote>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative px-10 pb-24 pt-12 lg:pt-36 ">
          <div className="w-full flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="z-10 flex flex-col md:flex-row gap-8 justify-center"
            >
              {/* Vision */}
              <div className="grid w-full md:w-1/3 border-2 border-white/80 rounded-3xl overflow-hidden">
                <img
                  src="/assets/Tofu design studio on Behance.jfif"
                  alt="Vision"
                  className="w-full h-[100px] object-cover"
                />
                <div className="px-4 pb-4 -mt-5 space-y-4">
                  <h2 className="text-xl font-medium text-white px-5 py-2 bg-black w-fit h-fit rounded-full">
                    Vision
                  </h2>
                  <p className="text-md text-white">
                    To build Pixelplay into a design agency where creativity and
                    usability come together — creating digital products and
                    brands that feel human, intuitive, and impactful, while
                    growing a community of skilled designers who shape
                    meaningful experiences worldwide.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="grid w-full md:w-2/3 border-2 border-white/80 rounded-3xl overflow-hidden">
                <img
                  src="/assets/mission.jfif"
                  alt="Mission"
                  className="w-full h-[100px] object-cover"
                />
                <div className="px-4 pb-4 -mt-5 space-y-4">
                  <h2 className="text-xl font-medium text-white px-5 py-2 bg-black w-fit h-fit rounded-full">
                    Mission
                  </h2>
                  <p className="text-md text-white">
                    At Pixelplay Design Agency, our mission is to help startups
                    and businesses transform ideas into purposeful digital
                    experiences. We deliver user-centered UI/UX design,
                    branding, and creative solutions that are thoughtful,
                    scalable, and results-driven. Starting as a solo-led studio,
                    we are committed to quality, clarity, and close
                    collaboration — with a long-term goal of growing into a
                    diverse team of experienced designers who share the same
                    passion for design excellence and innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* About Us Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className=" space-y-8 relative z-10 h-full "
            >
              <div className="grid content-end h-fit">
                <h2 className="text-2xl mb-2 font-medium text-white">
                  About PixelPlay
                </h2>
                <p className="text-md text-white">
                  I started Pixelplay with a simple belief: design should do
                  more than look good — it should work beautifully, feel
                  intuitive, and help businesses grow. At Pixelplay, we focus on
                  crafting thoughtful digital experiences. Our core strength is
                  UI/UX design — designing products that are clear,
                  user-centered, and built with real people in mind. From
                  product interfaces and dashboards to websites and mobile apps,
                  we design experiences that are easy to use and hard to forget.
                </p>
                <br />

                <p className="text-md text-white">
                  But Pixelplay is not limited to UI/UX alone. We also offer a
                  wide range of design services — brand identity, visual design,
                  marketing creatives, and digital assets that help brands stay
                  consistent, recognizable, and confident across every
                  touchpoint.
                </p>
                <br />

                <p className="text-md text-white">
                  Today, Pixelplay begins as a solo-led design agency. Every
                  project reflects my personal attention, creativity, and
                  commitment to quality. But this is not a one-person vision.
                  Tomorrow, Pixelplay will grow into a collaborative studio —
                  bringing together designers with diverse skills, strong
                  experience, and a shared passion for meaningful design. The
                  goal is to build a team that values clarity, creativity, and
                  impact just as much as I do.
                </p>
                <br />
                <p className="text-md text-white">
                  Pixelplay is about building products and brands with intention
                  — playful in creativity, precise in execution, and focused on
                  delivering real value. This is the foundation we’re starting
                  with, and this is the future we’re building toward.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
