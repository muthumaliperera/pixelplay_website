import React, { useState } from "react";
import Footer from "../Components/footer";
import JobModal from "../Components/JobModal";
import Navbar from "../Components/navbar";

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const jobs = [
    {
      id: "1",
      title: "Marketing & Sales Consultant",
      type: "Full-time • Project-based",
      location: "Remote",
      closingDate: "17th Feb 2026",
      image: "/assets/Careers/Marketing.png",
      description:
        "Pixelplay is a growing design studio focused on UI/UX, branding, and digital experiences. We’re looking for a Marketing & Sales Consultant to help us connect with potential clients, manage inquiries, and build our online presence. This role is ideal for someone who enjoys communication, sales, and digital marketing, and wants hands-on experience working with a creative startup.",
      responsibilities: [
        "Handle client calls, messages, and inquiries professionally",
        "Communicate Pixelplay’s services clearly to potential clients",
        "Share posts and updates on social media platforms (Instagram, Facebook, LinkedIn, etc.)",
        "Assist in generating leads and following up with prospects",
        "Coordinate with the designer/founder regarding client requirements and updates",
      ],
      requirements: [
        "Basic understanding of marketing, sales, or social media (beginners are welcome)",
        "Good communication skills (spoken and written English preferred)",
        "Confidence in talking to clients over calls or messages",
        "Familiarity with social media platforms",
        "Self-motivated and able to work independently",
        "Interest in design, startups, or digital services is a plus",
      ],
      benefits: [
        "Project-based salary (paid per project or agreement)",
        "Fully remote work",
        "Flexible working hours",
        "Opportunity to grow with a creative startup",
        "Real-world experience in marketing and sales for a design agency",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative h-[350px] flex items-center justify-center overflow-hidden bg-black pt-12 mt-16"
          style={{
            backgroundImage: "url('/assets/Marketing 1440.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 ">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Be part of something creative, innovative, and extraordinary
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              At PixelPlay, we're looking for talented individuals who are
              passionate about design, technology, and creating amazing
              experiences that make a difference.
            </p>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-20 px-8 ">
          <div className="w-full mx-auto">
            <h2 className="text-2xl font-medium mb-6 text-white/80">
              Open Positions
            </h2>
            <div className=" flex flex-col md:flex-row gap-6 ">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-[#c8ff00] transition-colors w-full md:w-1/2 xl:w-1/3 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold mb-2">
                          {job.title}
                        </h3>
                        <div className="bg-white text-gray-600 px-4 py-2 rounded-full text-center">
                          Closing :{" "}
                          <span className="text-red-600 font-medium">
                            {job.closingDate}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-2">{job.type}</p>

                      <div className="  w-full mt-6">
                        <img
                          src={job.image}
                          alt={job.title}
                          className=" w-full rounded-3xl "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      <Footer />
    </div>
  );
};

export default Careers;
