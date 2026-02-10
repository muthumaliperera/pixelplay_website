import React, { useEffect } from "react";

type JobModalProps = {
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    closingDate: string;
    image: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
  onClose: () => void;
};

const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  // Freeze background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[4px]"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl h-[75vh] rounded-3xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER (FIXED / STICKY) */}
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="flex items-start gap-4 px-12 py-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                {job.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-gray-600 text-sm">{job.type}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">{job.location}</span>
                <span className="text-gray-400">•</span>
                <span className="text-red-600 text-sm font-medium">
                  Closing: {job.closingDate}
                </span>
              </div>
            </div>

            {/* CLOSE ICON */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-2 bg-black hover:opacity-80 transition"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto ">
          <div className="w-full px-12 py-8 space-y-8">
            {/* Job Description */}
            <div className="">
              <h3 className="text-lg font-semibold text-black mb-4">
                About the Role
              </h3>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="">
              <h3 className="text-lg font-semibold text-black mb-4">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="">
              <h3 className="text-lg font-semibold text-black mb-4">
                Requirements & Qualifications
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="">
              <h3 className="text-lg font-semibold text-black mb-4">
                What We Offer
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div className="bg-black rounded-xl p-6">
              <div className="flex flex-col sm:flex-row gap-0 items-center justify-between">
                <p className="text-white font-medium">Ready to apply?</p>
                <p className="text-gray-200 text-sm">Send your CV to</p>
                <p className="text-[#c8ff00] text-md">
                  pixelplaydesignslab1@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
