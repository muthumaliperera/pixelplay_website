import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/footer";
import Navbar from "../Components/navbar";
import ProjectModal from "../Components/ProjectModal";
import { projects as allProjects, Project } from "../data/projects";

const Services: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "uiux" | "graphic" | "presentation"
  >("uiux");

  // Set active tab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      return;
    }

    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (
      tabParam === "uiux" ||
      tabParam === "graphic" ||
      tabParam === "presentation"
    ) {
      setActiveTab(tabParam);
    }
  }, [location.state, location.search]);

  // Use shared projects data
  const projects: Project[] = allProjects;

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
    <div className="min-h-screen bg-white mt-24">
      {/* Navigation */}
      <div className="bg-white">
        <Navbar />
      </div>

      {/* Tabs Section */}
      <section className="w-full  px-8 py-2">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab("uiux")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "uiux"
                ? "bg-black text-white"
                : "bg-white text-black border-2 border-black hover:bg-gray-100"
            }`}
          >
            UI/UX Projects
          </button>
          <button
            onClick={() => setActiveTab("graphic")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "graphic"
                ? "bg-black text-white"
                : "bg-white text-black border-2 border-black hover:bg-gray-100"
            }`}
          >
            Graphic Design
          </button>
          <button
            onClick={() => setActiveTab("presentation")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
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
      <section className="w-full  px-8 pt-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Project Image */}
              <div
                className="relative overflow-hidden rounded-3xl bg-gray-100 mb-2 aspect-[4/3] cursor-pointer"
                onClick={() => openModal(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Info */}
              <div className=" gap-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <p className="text-sm text-gray-500">{project.details}</p>
                </div>

                {/* View Case Study Button */}
                <button
                  onClick={() => openModal(project)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap"
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
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
