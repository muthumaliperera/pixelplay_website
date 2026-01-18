import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/footer";
import Navbar from "../Components/navbar";

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  category: "uiux" | "graphic" | "presentation";
}

const Services: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "uiux" | "graphic" | "presentation"
  >("uiux");

  // Set active tab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Sample projects data - replace with your actual data
  const projects: Project[] = [
    {
      id: 1,
      title: "EcoCart Mobile App",
      description:
        "Sustainable shopping app designed to reduce carbon footprint through intuitive flows and eco-first visuals.",
      details: "15 screens · Interactive prototype · Design system",
      image: "/project1.png", // Replace with actual image path
      category: "uiux",
    },
    {
      id: 2,
      title: "EcoCart Mobile App",
      description:
        "Sustainable shopping app designed to reduce carbon footprint through intuitive flows and eco-first visuals.",
      details: "15 screens · Interactive prototype · Design system",
      image: "/project2.png",
      category: "graphic",
    },
    {
      id: 3,
      title: "EcoCart Mobile App",
      description:
        "Sustainable shopping app designed to reduce carbon footprint through intuitive flows and eco-first visuals.",
      details: "15 screens · Interactive prototype · Design system",
      image: "/project3.png",
      category: "uiux",
    },
    {
      id: 4,
      title: "EcoCart Mobile App",
      description:
        "Sustainable shopping app designed to reduce carbon footprint through intuitive flows and eco-first visuals.",
      details: "15 screens · Interactive prototype · Design system",
      image: "/project4.png",
      category: "presentation",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === activeTab,
  );

  // Modal state and handlers
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setModalProject(project);
  };

  const closeModal = () => {
    setModalProject(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white">
        <Navbar />
      </div>

      {/* Tabs Section */}
      <section className="container mx-auto px-8 py-8">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab("uiux")}
            className={`px-8 py-4 rounded-full font-medium transition-colors ${
              activeTab === "uiux"
                ? "bg-black text-white"
                : "bg-white text-black border-2 border-black hover:bg-gray-100"
            }`}
          >
            UI/UX Projects
          </button>
          <button
            onClick={() => setActiveTab("graphic")}
            className={`px-8 py-4 rounded-full font-medium transition-colors ${
              activeTab === "graphic"
                ? "bg-black text-white"
                : "bg-white text-black border-2 border-black hover:bg-gray-100"
            }`}
          >
            Graphic Design Work
          </button>
          <button
            onClick={() => setActiveTab("presentation")}
            className={`px-8 py-4 rounded-full font-medium transition-colors ${
              activeTab === "presentation"
                ? "bg-black text-white"
                : "bg-white text-black border-2 border-black hover:bg-gray-100"
            }`}
          >
            Presentations
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Project Image */}
              <div
                className="relative overflow-hidden rounded-3xl bg-gray-100 mb-6 aspect-[4/3] cursor-pointer"
                onClick={() => openModal(project)}
              >
                {/* Replace this with actual image */}
                {/* <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}

                {/* Placeholder - remove when adding images */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                  {project.title}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <p className="text-sm text-gray-500">{project.details}</p>
                </div>

                {/* View Case Study Button */}
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap">
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">
              No projects available in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* Project Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full mx-4 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {modalProject.title}
                </h2>
                <p className="text-gray-600 mb-4">{modalProject.description}</p>
                <p className="text-sm text-gray-500">{modalProject.details}</p>
              </div>
              <button
                onClick={closeModal}
                className="ml-auto rounded-full border-2 border-black px-4 py-2 hover:bg-black hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <div className="text-xl font-semibold text-gray-700">
                {modalProject.title} Preview
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
